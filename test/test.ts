import { defineRpc, rpcClient } from "../src"

const rpc = defineRpc()
  .get(()=>{})

type RpcType = typeof rpc

const client = rpcClient<RpcType>('http://localhost:3000')

const res = await  client.index.$get({
  
})
