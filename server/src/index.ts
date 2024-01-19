import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

const sendMessageWithDelay = async (
  client: Client,
  array: string[],
  message: string,
  link: string
) => {
  const foto = await MessageMedia.fromUrl(link);
  for (const formattedNumber of array) {
    const isRegistered = await client.isRegisteredUser(formattedNumber);
    if (isRegistered) {
      client.sendMessage(formattedNumber, foto + message);
    }
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
};

io.on("connection", (socket) => {
  socket.on("params", (id, number, message, link, callback) => {
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: id }),
    });

    client.on("qr", (qr: string) => {
      console.log("QR RECEIVED", qr);
      socket.emit("qr", qr);
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      callback({
        status: "ready",
      });

      const arrayOfNumber: string[] = number.split(",");
      const newArray: string[] = arrayOfNumber.map(
        (index: string) => index + "@c.us"
      );

      sendMessageWithDelay(client, newArray, message, link);
    });

    client.initialize();
  });
});

httpServer.listen(3000);
