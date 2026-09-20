"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-20 text-center">
      <motion.div
        animate={{ opacity: loading ? 1 : 0.4, scale: loading ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        className="mx-auto mb-6 w-24 h-24 rounded-full bg-blue-600 blur-xl"
      />

      <form onSubmit={sendMessage} className="flex gap-2 justify-center">
        <input
          className="px-4 py-2 w-64 rounded bg-gray-900 border border-gray-700"
          placeholder="Fale com a IA..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 rounded" type="submit">
          Enviar
        </button>
      </form>

      {loading && <p className="mt-4 animate-pulse">IA pensando…</p>}

      {reply && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-900 p-4 rounded border border-gray-700"
        >
          {reply}
        </motion.div>
      )}
    </div>
  );
}
