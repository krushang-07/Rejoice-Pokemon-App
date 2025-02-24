"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ClipboardIcon } from "lucide-react";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export default function PokemonPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
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
        if (index === response.length) clearInterval(interval);
      }, 10);
    } else {
      setDisplayedResponse("");
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="container mx-auto px-4 py-8 flex gap-8">
        <div className="w-1/4 bg-gray-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 space-y-6 h-screen overflow-y-auto border border-gray-700/30">
          <h2 className="text-2xl font-bold text-gray-100 text-center">
            Chat History
          </h2>
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 cursor-pointer"
                style={{
                  animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <p className="text-gray-200 font-medium mb-2">{chat.prompt}</p>
                {chat.imageUrl && (
                  <div className="flex justify-center mb-2">
                    <Image
                      src={chat.imageUrl}
                      alt="Pokémon"
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <p className="text-gray-400 text-sm">{chat.response}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-gray-300 mb-4">
                PokéAI
              </h1>
              <p className="text-gray-300 text-xl font-medium">
                Your AI-powered Pokémon encyclopedia
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-700/30">
              <div className="space-y-6">
                <textarea
                  className="w-full p-6 bg-gray-800/30 border border-gray-700/30 rounded-2xl
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition-all duration-300 resize-none text-gray-200
                            placeholder:text-gray-500 backdrop-blur-sm"
                  rows={4}
                  placeholder="Ask about any Pokémon..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800
                            text-white font-semibold rounded-2xl shadow-lg
                            hover:from-blue-700 hover:to-blue-900
                            transition-all duration-300 transform hover:scale-[1.02]
                            disabled:from-gray-600 disabled:to-gray-700
                            disabled:cursor-not-allowed"
                  onClick={handleFetch}
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-200" />
                </div>
              )}

              {response && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm">
                    <div className="space-y-6">
                      {imageUrl && (
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <Image
                              src={imageUrl}
                              alt="Pokémon"
                              width={200}
                              height={200}
                              className="transform hover:scale-110 transition-transform duration-300"
                              style={{
                                animation: `${float} 3s ease-in-out infinite`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start gap-4">
                        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed flex-grow">
                          {displayedResponse}
                        </p>
                        <button
                          onClick={handleCopy}
                          className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                        >
                          <ClipboardIcon className="h-6 w-6" />
                        </button>
                      </div>
                      {additionalInfo && (
                        <div className="bg-gray-800/40 p-4 rounded-2xl border border-gray-700/30">
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
                              <tr>
                                <td className="font-bold">Base Stats:</td>
                                <td>
                                  <ul>
                                    {additionalInfo.baseStats.map(
                                      (stat, index) => (
                                        <li key={index}>
                                          {stat.name}: {stat.value}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
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
