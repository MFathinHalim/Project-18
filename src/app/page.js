"use client"
import { useState, useEffect } from "react";
const backgrounds = [
  "https://marketplace.canva.com/EAGAJbQSMpI/1/0/900w/canva-beige-pastel-cute-phone-wallpaper-gZsOg5F0HNI.jpg",
  "https://wallpapers.com/images/featured/cute-aesthetic-background-x3g7cz5dr9k14wha.jpg",
  "https://i.pinimg.com/originals/42/1b/76/421b76d982a90b8f2c6f9f1ddbbcb1e6.jpg"
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [bg, setBg] = useState("");

  useEffect(() => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.background = "url('" + randomBg + "')"
  }, []);
  useEffect(() => {
    document.body.addEventListener("click", () => {
      const audio = new Audio("/sfx.mp3");
      audio.play().catch((error) => console.error("Autoplay error:", error));
    });
  
    return () => {
      document.body.removeEventListener("click", () => {
        const audio = new Audio("/sfx.mp3");
        audio.play().catch((error) => console.error("Autoplay error:", error));
      });
    };
  }, []);
  
  async function copyLink() {
    const currentUrl = `${window.location.href}${ btoa(unescape(encodeURIComponent(prompt))) .replace(/\+/g, "-")
    .replace(/\//g, "_") 
    .replace(/=+$/, "")}?name=${encodeURIComponent(name)}`
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Card Cozy",
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
    return open(`${window.location.href}${ btoa(unescape(encodeURIComponent(prompt))) .replace(/\+/g, "-")
    .replace(/\//g, "_") 
    .replace(/=+$/, "")}?name=${encodeURIComponent(name)}`)
  }

  return (
    <>
      <img draggable="false" className="rounded-circle" src="https://media.tenor.com/t9pwGPO3TpoAAAAM/apt.gif" />
      <h3 className="font-bolder my-2">Card Cozy</h3>
        <label forhtml="prompt" className="w-100 text-lg font-bold"><h5 className="m-0">Perintah<span className="red">*</span></h5></label>
        <input 
          id="prompt" 
          className="form-control p-3"
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Contoh: Buatlah kata-kata untuk selamat ulang tahun" 
        />
        <label forhtml="name" className="w-100 text-lg font-bold"><h5 className="m-0">Nama (Opsional)</h5></label>
        <input 
          id="name" 
          className="form-control p-3"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="from: M.Fathin Halim to: Mahiru Shiina" 
        />
        <div id="mahiru" className="d-flex gap-2 w-100 align-items-start justify-content-center mt-2">
          <button onClick={copyLink} disabled={!prompt} className="btn btn-primary btn-lg">Share</button>
          <button onClick={openLink} disabled={!prompt} className="btn btn-secondary btn-lg">Preview</button>
        </div>
    </>
  );
}
