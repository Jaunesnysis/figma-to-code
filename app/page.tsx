"use client";

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import CodeDisplay from "./components/CodeDisplay";
import PreviewFrame from "./components/PreviewFrame";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"code" | "preview">("code");

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
      setTab("code");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-8">
      <h1 className="text-3xl font-bold mb-2">Figma to Code</h1>
      <p className="text-gray-400 mb-8">
        Upload a screenshot and get clean React + Tailwind code
      </p>

      <ImageUpload
        onImageSelect={(base64) => {
          setImage(base64);
          setCode(null);
        }}
      />

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
        <div className="w-full max-w-4xl mt-8">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-gray-900 p-1 rounded-lg w-fit">
            <button
              onClick={() => setTab("code")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "code"
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setTab("preview")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "preview"
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Content */}
          {tab === "code" && <CodeDisplay code={code} />}
          {tab === "preview" && (
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-800 bg-white">
              <PreviewFrame code={code} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
