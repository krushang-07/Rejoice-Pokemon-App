"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ClipboardIcon } from "lucide-react";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [thinking, setThinking] = useState(false);

  const handleFetch = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setThinking(true);
    setAdditionalInfo("");

    try {
      const res = await fetch("/api/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setResponse(data.response);
      setImageUrl(data.imageUrl);
      setAdditionalInfo(data.additionalData);

      const newChatHistory = JSON.parse(
        localStorage.getItem("chatHistory") || "[]"
      );
      newChatHistory.push({ prompt });
      localStorage.setItem("chatHistory", JSON.stringify(newChatHistory));
    } catch (error) {
      setResponse("Error: Failed to fetch Pokémon information.");
    } finally {
      setLoading(false);
      setThinking(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    if (response) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + response[index]);
        index++;
        if (index === response.length) clearInterval(interval);
      }, 10);
    } else {
      setDisplayedResponse("");
    }
  }, [response]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-gray-300 mb-4">
          PokéAI
        </h1>
        <p className="text-gray-300 text-xl font-medium">
          Your AI-powered Pokémon encyclopedia
        </p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-700/30">
        <textarea
          className="w-full p-6 bg-gray-800/30 border border-gray-700/30 rounded-2xl
              focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none text-gray-200"
          rows={4}
          placeholder="Ask about any Pokémon..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-2xl
              hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
          onClick={handleFetch}
          disabled={loading || !prompt.trim()}
        >
          {loading ? "Fetching..." : "Get Pokémon Info"}
        </button>

        {thinking && <p className="text-gray-400 mt-4">Thinking...</p>}

        {response && (
          <div className="mt-8">
            <div className="bg-gray-800/30 rounded-2xl p-8">
              {imageUrl && (
                <div className="flex justify-center mb-6">
                  <Image
                    src={imageUrl}
                    alt="Pokémon"
                    width={200}
                    height={200}
                  />
                </div>
              )}
              <p className="text-gray-200 whitespace-pre-wrap">
                {displayedResponse}
              </p>
              <button
                onClick={handleCopy}
                className="mt-4 text-gray-400 hover:text-gray-200"
              >
                <ClipboardIcon className="h-6 w-6" />
              </button>
              {additionalInfo && (
                <div className="bg-gray-800/40 p-4 rounded-2xl mt-6">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">
                    Additional Information:
                  </h3>
                  <table className="table-auto w-full text-gray-200">
                    <tbody>
                      <tr>
                        <td className="font-bold">Type:</td>
                        <td>{additionalInfo.type.join(", ")}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Abilities:</td>
                        <td>{additionalInfo.abilities.join(", ")}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Height:</td>
                        <td>{additionalInfo.height}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Weight:</td>
                        <td>{additionalInfo.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
