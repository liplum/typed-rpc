import { rpc, rpcClient } from "@liplum/rpc"
import express, { Router } from "express"
import { zValidator } from "@liplum/rpc-zod"
import { z } from "zod"
import validate from "express-zod-safe"

const sendMessageZod = z.object({
  content: z.string(),
})

const rpcDef = rpc()
  .get("/ping", r => r.text())
  .route("/chat", rpc()
    .post("/send-message",
      zValidator("json", sendMessageZod),
      r => r.union(
        r.json<{
          success: true,
          data: {
            content: string
          }
        }>(),
        r.json<{
          success: false,
          error: {
            reason: string,
          }
        }>(),
      ))
  )

type RpcType = typeof rpcDef
const client = rpcClient<RpcType>('http://localhost:12888')

const createApp = () => {
  const app = express()
  app.get("/ping", async (req, res) => {
    res.status(200).send("pong").end()
  })
  const chat = Router()
  app.use("/chat", chat)
  chat.post("/send-message", validate({
    body: sendMessageZod,
  }), (req, res) => {
    const success = Math.random() < 0.5
    res.status(200).send(success ? {
      success: true,
      data: {
        content: req.body.content,
      }
    } : {
      success: false,
      error: {
        reason: "randomlyFailed",
      }
    })
  })
  return app
}
createApp().listen(12888)


{
  const res = await client.ping.$get()
  console.log(await res.text())
}

{
  const res = await client.chat["send-message"].$post({
    json: {
      content: "Hello, world!"
    }
  })
  const data = await res.json()
  if (data.success) {
    console.log(`Succeed to send message "${data.data.content}."`)
  } else {
    console.log(`Failed to send message due to "${data.error.reason}"`)
  }
}