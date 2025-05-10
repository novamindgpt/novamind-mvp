import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { input } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      }),
    });

    const text = await response.text(); // usamos .text() primero

    // Intentamos parsear manualmente
    const data = JSON.parse(text);

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Error desconocido' }, { status: 500 });
  }
}
