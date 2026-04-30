"use client";

import { useState, useRef } from "react";

interface Props {
  onImageSelect: (base64: string) => void;
}

export default function ImageUpload({ onImageSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full max-w-2xl border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
        ${dragging ? "border-violet-400 bg-violet-950/20" : "border-gray-700 hover:border-violet-500 hover:bg-gray-900"}`}
    >
      {preview ? (
        <img
          src={preview}
          alt="Uploaded design"
          className="rounded-lg max-h-80 mx-auto object-contain"
        />
      ) : (
        <>
          <p className="text-gray-400 text-lg mb-2">
            Drop your screenshot here
          </p>
          <p className="text-gray-600 text-sm">or click to browse</p>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
