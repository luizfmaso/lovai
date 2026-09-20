"use client";

import ChatUI from "./components/ChatUI";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        IA Consultiva da Sua Empresa
      </h1>
      <p className="text-gray-400 mb-10">
        Interaja com uma inteligência artificial que reage em tempo real.
      </p>

      <ChatUI />
    </main>
  );
}
