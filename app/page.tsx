import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Núcleo de IA da sua consultoria</h1>
      <form onSubmit={handleSend} className="flex gap-2 mb-4">
        <input
          className="px-3 py-2 rounded bg-gray-900 border border-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Converse com a IA..."
        />
        <button className="px-4 py-2 bg-blue-600 rounded" type="submit">
          Enviar
        </button>
      </form>

      {loading && <div className="animate-pulse">IA está pensando…</div>}
      {reply && (
        <div className="mt-4 max-w-xl text-center">
          <p className="text-sm text-gray-400">Resposta da IA:</p>
          <p className="mt-2">{reply}</p>
        </div>
      )}
    </main>
  );
}
