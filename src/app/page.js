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
      <img src="https://media.tenor.com/t9pwGPO3TpoAAAAM/apt.gif" />
        <input 
          id="prompt" 
          className="form-control p-3"
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Buatlah kata-kata untuk..." 
        />
        <input 
          id="name" 
          className="form-control p-3"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="M.Fathin Halim" 
        />
      <button onClick={copyLink} disabled={!prompt} className="btn btn-primary btn-lg">Copy Link</button>
    </>
  );
}
