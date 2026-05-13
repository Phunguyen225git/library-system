// src/app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Khởi tạo các phương thức GET, POST cho API route
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
