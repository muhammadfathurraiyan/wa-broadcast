import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Client, Contact, LocalAuth } from "whatsapp-web.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  let client: Client;
  socket.on("id", (id) => {
    client = new Client({
      authStrategy: new LocalAuth({ clientId: id }),
    });

    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      socket.emit("qr", qr);
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      socket.emit("status", "ready");
    });
    client.initialize();
  });

  socket.on("chat", (chat) => {
    client.on("ready", () => {
      const number = "+6282361564525";
      const text = chat;
      const chatId = number.substring(1) + "@c.us";
      client.sendMessage(chatId, text);
    });
    client.initialize();
  });
});

httpServer.listen(3000);
