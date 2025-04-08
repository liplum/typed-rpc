import { defineRpc, rpcClient } from "../src"

const rpc = defineRpc()
  .route("/user", defineRpc()
    .get(() => { })
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
}
{
  const res = await client.user.$post({

  })
}
{
  const res = await client.chat["send-message"].$post({

  })
}