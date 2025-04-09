# @typed-rpc/zod

A library that seamlessly integrates Zod schema validation with [@typed-rpc/rpc](https://www.npmjs.com/package/@typed-rpc/rpc) definitions, ensuring type-safe communication.

```ts
import { rpc } from "@typed-rpc/rpc"
import { zValidator } from "@typed-rpc/rpc-zod"
import { z } from "zod"

const def = rpc()
.post("/login",
  zValidator("json", z.object({
    username: z.string()
    password: z.string(),
  })),
  r => r.json<{
    success: true,
  }>())
```
