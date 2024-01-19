import { useState } from "react";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

function App() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState("");
  const socket = io("http://localhost:3000");

  const apiCall = async () => {
    const response = await socket
      .timeout(5000)
      .emitWithAck("params", id, number, message, link);
    if (response.status === "ready") {
      setStatus(response.status);
    }
  };

  socket.on("qr", (qr) => {
    setResult(qr);
  });

  if (status === "ready") {
    return (
      <main className="max-w-2xl mx-auto gap-4 flex flex-col mt-16">
        <h1 className="text-center text-neutral-900 uppercase font-bold text-3xl">
          Whatsapp Broadcast
        </h1>
        <p>Ready</p>
      </main>
    );
  } else {
    return (
      <main className="max-w-2xl mx-auto gap-4 flex flex-col mt-16">
        <h1 className="text-center text-neutral-900 uppercase font-bold text-3xl">
          Whatsapp Broadcast
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-[400px] gap-4">
            <input
              type="text"
              placeholder="masukan id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="p-2 w-full border border-neutral-700 outline-none"
            />
            <input
              type="text"
              placeholder="masukan link foto"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="p-2 w-full border border-neutral-700 outline-none"
            />
            <input
              type="text"
              placeholder="masukan pesan"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 w-full border border-neutral-700 outline-none"
            />
            <textarea
              rows={10}
              placeholder="masukan nomor hp eg. 62823677,789836782,49900"
              name="nomor"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="p-2 w-full border border-neutral-700 outline-none"
            />
            <button
              onClick={apiCall}
              className="bg-neutral-900 py-2 px-4 w-fit text-neutral-200"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {result !== "" && <QRCode fgColor="rgb(23 23 23)" value={result} />}
        </div>
      </main>
      // Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure beatae alias, molestiae voluptates harum, fuga id expedita, assumenda ea culpa quia nisi magnam dolorem veritatis reprehenderit quaerat architecto eaque perferendis?
    );
  }
}

export default App;
