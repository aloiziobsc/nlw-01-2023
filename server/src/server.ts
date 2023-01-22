import fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";

const app = fastify();

const port: number = 3333;

// app.register(cors, {
//   origin: ["http://localhost:3000"]
// });

app.register(cors);
app.register(appRoutes)

// Métodos HTTP: GET, POST, PUT, PATCH, DELETE



app.listen({
  port,
  host: '0.0.0.0'
}).then(() => {
  console.log(`HTTP Server runnning port:${port}!`)
})