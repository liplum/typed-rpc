# typed-rpc

Define a strongly-typed RPC client in TypeScript to streamline communication between front-end and back-end systems with ease and reliability.

## Features

- **Type-Safe API Integration**: Simplify access to back-end APIs for front-end applications with full TypeScript support.
- **Seamless Microservice Communication**: Enable clear and efficient communication between back-end microservices with strong typing.
- **Cross-Platform Compatibility**: Built on Web Standards, ensuring compatibility with any JavaScript runtime, including Node.js, Deno, Bun, Vercel, and other cloud platforms.
- **Developer-Friendly**: Enhance productivity by reducing boilerplate code and minimizing runtime errors through compile-time type checking.
- **Flexible and Extensible**: Easily adapt to various back-end frameworks and extend functionality as your application grows.

## Get Started

First, create a sever in any programming language and framework you want.
The following example is built with express.js in TypeScript.

```ts
import express, { Router } from "express"
import { z } from "zod"
import validate from "express-zod-safe"

const app = express()
app.use(express.json())
app.get("/ping", async (req, res) => {
  res.status(200).send("pong").end()
})
const chat = Router()
app.use("/chat", chat)
chat.post("/send-message", validate({
  body: z.object({
    content: z.string(),
  }),
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
```

Then, define the RPC of server-side API
and export its type to share with the clients
-- you may publish it on a package registry like npm.

```ts
import { rpc } from "@typed-rpc/rpc"
import { zValidator } from "@typed-rpc/rpc-zod"
import { z } from "zod"

const rpcDef = rpc()
  .get("/ping", r => r.text())
  .route("/chat", rpc()
    .post("/send-message",
      zValidator("json", z.object({
        content: z.string(),
      })),
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

export type RpcDefinition = typeof rpcDef
```

Finally, create a RPC client with the definition type and config the endpoint.

Let's send requests!

```ts
import { rpcClient } from "@typed-rpc/rpc"
import { type RpcDefinition } from "./def.js"

const client = rpcClient<RpcDefinition>('http://localhost:12888')

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
```

## Acknowledgement

The package was inspired by [Hono's RPC feature](https://hono.dev/docs/guides/rpc).
