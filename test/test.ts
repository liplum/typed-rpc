import { defineRpc, rpcClient } from "../src"

const rpc = defineRpc()
  .route("/user", defineRpc()
    .get(res => res.union(
      res.json({
        success: true,
      }, 206),
      res.json({
        result: "name",
      }, 200))
    )
    .post(() => { })
  )
  .route("/chat", defineRpc()
    .post("/send-message", () => { }
    )
  )

type RpcType = typeof rpc

const client = rpcClient<RpcType>('http://localhost:3000')

{
  const res = await client.user.$get({

  })
  const data = await res.json()

}
{
  const res = await client.user.$post({

  })
}
{
  const res = await client.chat["send-message"].$post({

  })
}