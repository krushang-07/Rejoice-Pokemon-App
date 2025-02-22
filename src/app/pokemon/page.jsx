"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ClipboardIcon } from "@heroicons/react/outline";

export default function PokemonPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [thinking, setThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("chatHistory");
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  const handleFetch = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");
    setThinking(true);

    try {
      const res = await fetch("/api/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.response);
      setImageUrl(data.imageUrl);
      const newChatHistory = [...chatHistory, { prompt }];
      setChatHistory(newChatHistory);
      localStorage.setItem("chatHistory", JSON.stringify(newChatHistory));
    } catch (error) {
      setResponse(
        "Error: Failed to fetch Pokémon information. Please try again."
      );
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
        if (index === response.length) {
          clearInterval(interval);
        }
      }, 10);
    } else {
      setDisplayedResponse("");
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-gray-600">
      <div className="container mx-auto px-4 py-8 flex">
        <div className="w-1/4 bg-white rounded-2xl shadow-2xl p-6 space-y-6 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800">Chat History</h2>
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <p className="text-gray-800 font-semibold">{chat.prompt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4 pl-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Pokémon AI Chat
              </h1>
              <p className="text-white/90 text-lg">
                Your AI-powered Pokémon encyclopedia
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
              <div className="space-y-4">
                <textarea
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl
                            focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                            transition-all duration-200 resize-none text-gray-800
                            placeholder:text-gray-400"
                  rows={4}
                  placeholder="Ask about any Pokémon..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600
                            text-white font-semibold rounded-xl shadow-lg
                            hover:from-gray-600 hover:to-gray-700
                            transition-all duration-200
                            disabled:from-gray-400 disabled:to-gray-500
                            disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  onClick={handleFetch}
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Catching Information...
                    </span>
                  ) : (
                    "Get Pokémon Info"
                  )}
                </button>
              </div>

              {thinking && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-500">
                    Thinking...
                  </span>
                </div>
              )}
              {response && (
                <button onClick={handleCopy} className="ml-4">
                  <ClipboardIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </button>
              )}

              {response && (
                <div className="mt-6 animate-fade-in">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="space-y-4">
                      {imageUrl && (
                        <div className="flex justify-center mb-4">
                          <Image
                            src={imageUrl}
                            alt="Pokémon"
                            width={400}
                            height={400}
                            className="w-32 h-32"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {displayedResponse}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
