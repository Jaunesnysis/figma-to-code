"use client";

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setCode(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setCode(data.code);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">Figma to Code</h1>
      <p className="text-gray-400 mb-8">
        Upload a screenshot and get clean React + Tailwind code
      </p>

      <ImageUpload onImageSelect={(base64) => setImage(base64)} />

      {image && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          {loading ? "Generating..." : "Generate Code"}
        </button>
      )}

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

      {code && (
        <div className="mt-8 w-full max-w-2xl">
          <pre className="bg-gray-900 rounded-xl p-6 overflow-x-auto text-sm text-gray-300">
            {code}
          </pre>
        </div>
      )}
    </main>
  );
}
