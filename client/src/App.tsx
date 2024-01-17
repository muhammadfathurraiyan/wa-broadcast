import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
function App() {
  const [result, setResult] = useState("");

  const apiCall = async (id: string) => {
    const response = await axios.post(`http://localhost/api/${id}`);
    const data = response.data;
    setResult(data);
  };
  
  return (
    <main className="max-w-2xl mx-auto gap-4 flex flex-col mt-16">
      <h1 className="text-center text-neutral-900 uppercase font-bold text-3xl">
        Whatsapp Broadcast
      </h1>
      <div className="flex flex-col items-center justify-center">
        <form action="" className="flex w-[400px] gap-4">
          <input
            type="text"
            placeholder="masukan id"
            className="p-2 w-full border border-neutral-700 outline-none"
          />
          <button className="bg-neutral-900 py-2 px-4 w-fit text-neutral-200">
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        <QRCode fgColor="rgb(23 23 23)" value={result} />
      </div>
    </main>
  );
}

export default App;
