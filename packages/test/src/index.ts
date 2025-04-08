import { rpc, rpcClient } from "@liplum/rpc"
import express, { Router } from "express"

const rpcDef = rpc()
  .get("/ping", res => res.text())
  .route("/user", rpc()
    .get(r => r.union(
      r.json<{
        success: true,
      }, 206>(),
      r.json<{
        result: string,
      }, 200>())
    )
    .post(() => { })
  )
  .route("/chat", rpc()
    .post("/send-message", r => r.union(
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

const createApp = () => {
  const app = express()
  app.get("/ping", async (req, res) => {
    res.status(200).send("pong").end()
  })
  const chat = Router()
  app.use("/chat", chat)
  chat.post("/send-message", (req, res) => {
    const success = Math.random() < 0.5
    res.status(200).send(success ? {
      success: true,
      data: {
        content: "Hello, world!"
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

const client = rpcClient<RpcType>('http://localhost:12888')

{
  const res = await client.ping.$get()
  console.log(await res.text())
}

{
  const res = await client.chat["send-message"].$post({

  })
  const data = await res.json()
  if (data.success) {
    console.log(`Succeed to send message "${data.data.content}."`)
  } else {
    console.log(`Failed to send message due to "${data.error.reason}"`)
  }
}