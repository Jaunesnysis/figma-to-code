"use client";

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">Figma to Code</h1>
      <p className="text-gray-400 mb-8">
        Upload a screenshot and get clean React + Tailwind code
      </p>

      <ImageUpload onImageSelect={(base64) => setImage(base64)} />

      {image && (
        <p className="mt-4 text-violet-400 text-sm">
          Image ready — generation coming next
        </p>
      )}
    </main>
  );
}
