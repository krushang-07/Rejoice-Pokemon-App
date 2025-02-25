"use client";
import Sidebar from "./@sidebar/page";
import Chat from "./@chat/page";
export default function PokemonPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <Chat />
        </div>
      </div>
    </>
  );
}
