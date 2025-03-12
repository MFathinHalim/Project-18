"use client"
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");

  async function copyLink() {
    const currentUrl = `${window.location.href}${encodeURIComponent(prompt)}?name=${encodeURIComponent(name)}`
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Project 18",
                text: ":3",
                url: currentUrl,
            });
        } catch (error) {
            console.error("Error sharing", error);
        }
    } else if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert("Link copied to clipboard. Share it with your friends!");
        } catch (error) {
            console.error("Clipboard write error", error);
            alert("Failed to copy link.");
        }
    }
  }
  function openLink() {
    return open(`${window.location.href}${encodeURIComponent(prompt)}?name=${encodeURIComponent(name)}`)
  }

  return (
    <>
      <img className="rounded-circle" src="https://media.tenor.com/t9pwGPO3TpoAAAAM/apt.gif" />
      <label forhtml="prompt" className="w-100 text-lg font-bold"><h5 className="m-0">Perintah<span className="red">*</span></h5></label>
        <input 
          id="prompt" 
          className="form-control p-3"
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Buatlah kata-kata untuk..." 
        />
        <label forhtml="name" className="w-100 text-lg font-bold"><h5 className="m-0">Nama</h5></label>
        <input 
          id="name" 
          className="form-control p-3"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="M.Fathin Halim" 
        />
        <div id="mahiru" className="d-flex gap-2 w-100 align-items-start justify-content-center mt-2">
          <button onClick={copyLink} disabled={!prompt} className="btn btn-primary btn-lg">Share</button>
          <button onClick={openLink} disabled={!prompt} className="btn btn-secondary btn-lg">Preview</button>
        </div>
    </>
  );
}
