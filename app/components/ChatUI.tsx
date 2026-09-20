"use client";

import React, { useState } from "react";
import MotionDiv from "./MotionDiv";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        setReply(`Erro do servidor: ${res.status} ${text || ""}`);
        setLoading(false);
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch {
        setReply("Erro: resposta inválida do servidor.");
        setLoading(false);
        return;
      }

      setReply(data?.reply ?? "Resposta vazia da IA.");
    } catch (err) {
      console.error("Fetch error:", err);
      setReply("Erro de conexão ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-20 text-center">
      <MotionDiv
        className="mx-auto mb-6 w-24 h-24 rounded-full bg-blue-600 blur-xl"
        animate={{ opacity: loading ? 1 : 0.4, scale: loading ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
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
        <MotionDiv
          className="mt-6 bg-gray-900 p-4 rounded border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {reply}
        </MotionDiv>
      )}
    </div>
  );
}
