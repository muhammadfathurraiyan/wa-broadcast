import express, { Express, Request, Response } from "express";
import { Client, LocalAuth } from "whatsapp-web.js";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.post("/api/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: "ID" }),
      puppeteer: { headless: false },
    });

    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      res.json(qr);
    });

    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.initialize();
  } catch (error) {
    console.log(error);
  }
});
