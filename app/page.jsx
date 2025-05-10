'use client';

import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NovaMind – Generador de Contenido</h1>
      <textarea
        className="w-full p-4 border border-gray-300 rounded mb-4"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribí tu idea o prompt..."
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar con IA'}
      </button>
      {output && (
        <div className="mt-6 p-4 border border-gray-200 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Resultado:</h2>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}