import { rpc, rpcClient } from "@typed-rpc/rpc"
import express, { Router } from "express"
import { zValidator } from "@typed-rpc/zod"
import { z } from "zod"
import validate from "express-zod-safe"
import { install as installSourceMap } from "source-map-support"
installSourceMap()

const sendMessageZod = z.object({
  content: z.string(),
})

const rpcDef = rpc()
  .get("/ping", r => r.text())
  .route("/chat", rpc()
    .post("/send-message",
      zValidator("json", sendMessageZod),
      r => r.json<{
        success: true,
        data: {
          content: string
        }
      } | {
        success: false,
        error: {
          reason: string,
        }
      }>())
  )
const createApp = () => {
  const app = express()
  app.use(express.json())
  app.get("/ping", async (req, res) => {
    res.status(200).send("pong").end()
  })
  const chat = Router()
  app.use("/chat", chat)
  chat.post("/send-message", validate({
    body: sendMessageZod,
  }), (req, res) => {
    const { content } = req.body
    const success = Math.random() < 0.8
    res.status(200).send(success ? {
      success: true,
      data: {
        content: content,
      }
    } : {
      success: false,
      error: {
        reason: "randomlyFailed",
      }
    })
  })
  app.listen(12888)
}

export type RpcDefinition = typeof rpcDef
const client = rpcClient<RpcDefinition>('http://localhost:12888')

createApp()
const pingTest = async () => {
  const res = await client.ping.$get()
  if (res.ok) {
    console.log(await res.text())
  } else {
    console.error(`${res.status} ${res.statusText}`)
  }
}

const sendMessageTest = async () => {
  const res = await client.chat["send-message"].$post({
    json: {
      content: "Hello, world!",
    }
  })
  if (res.ok) {
    const data = await res.json()
    if (data.success) {
      console.log(`Succeed to send message "${data.data.content}."`)
    } else {
      console.log(`Failed to send message due to "${data.error.reason}"`)
    }
  } else {
    console.error(`${res.status} ${res.statusText}: ${await res.text()}`)
  }
}

await pingTest()
await sendMessageTest()
