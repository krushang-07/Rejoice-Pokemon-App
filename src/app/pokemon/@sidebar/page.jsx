"use client";

import { useEffect, useState } from "react";

export default function Sidebar() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("chatHistory");
      setChatHistory(savedHistory ? JSON.parse(savedHistory) : []);
    }
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg  shadow-2xl p-6 space-y-6 h-screen overflow-y-auto border border-gray-700/30">
      <h2 className="text-2xl font-bold text-gray-100 text-center">
        Chat History
      </h2>
      <div className="space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:bg-gray-800/50 cursor-pointer"
          >
            <p className="text-gray-200 font-medium">{chat.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
