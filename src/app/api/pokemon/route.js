import { OpenAI } from "openai";

import {
  extractPokemonName,
  fetchPokemonDetails,
  fetchPokemonImage,
} from "../../../helper/chatHelper";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable Pokémon expert. Provide clear, accurate, and engaging information about Pokémon. Your responses should include details such as type, abilities, evolution chains, notable moves, game appearances, and interesting facts. Present all details concisely in a structured tabular format without using markdown or extra formatting and also if you can support multiple languages like Hindi, English, etc., and additionally support Pikachu language also.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.6,
    });

    const pokemonName = extractPokemonName(
      response.choices[0]?.message?.content
    );

    const imageUrl = await fetchPokemonImage(pokemonName);
    const pokemonData = await fetchPokemonDetails(pokemonName);

    return new Response(
      JSON.stringify({
        response:
          response.choices[0]?.message?.content || "No response from OpenAI.",
        imageUrl,
        additionalData: pokemonData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching response:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
