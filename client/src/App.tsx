import { useState } from "react";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

function App() {
  const [result, setResult] = useState("");
  const [id, setId] = useState("");

  const apiCall = async () => {
    const socket = io("http://localhost:3000");
    socket.emit(id);
  };

  return (
    <main className="max-w-2xl mx-auto gap-4 flex flex-col mt-16">
      <h1 className="text-center text-neutral-900 uppercase font-bold text-3xl">
        Whatsapp Broadcast
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-[400px] gap-4">
          <input
            type="text"
            placeholder="masukan id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
  );
}

export default App;
