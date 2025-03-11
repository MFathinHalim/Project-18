"use client"
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");

  function copyLink() {
    return navigator.clipboard.writeText(`${window.location.href}${encodeURIComponent(prompt)}?name=${encodeURIComponent(name)}`)
  }

  return (
    <>
      <input 
        id="prompt" 
        type="text" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Set Prompt" 
      />
      <input 
        id="name" 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <button onClick={copyLink}>Copy Link</button>
    </>
  );
}
