"use client";

import { useEffect, useRef } from "react";

interface Props {
  code: string;
}

const buildHTML = (code: string) => {
  const sanitized = code
    .replace(/export\s+default\s+function\s+(\w+)/, "function Component")
    .replace(/export\s+default\s+(\w+)/, "")
    .replace(/import\s+\{([^}]+)\}\s+from\s+['"]react['"]/g, (_, hooks) => {
      return `const { ${hooks.trim()} } = React`;
    })
    .replace(/import\s+.*?\n/g, "");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>body { margin: 0; }</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react">
    ${sanitized}

    ReactDOM.createRoot(document.getElementById('root')).render(<Component />);
  </script>
</body>
</html>`;
};

export default function PreviewFrame({ code }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const html = buildHTML(code);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
      title="Component Preview"
    />
  );
}
