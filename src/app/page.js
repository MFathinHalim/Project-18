"use client"
import { useState, useEffect } from "react";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");

  const backgrounds = [
    "https://marketplace.canva.com/EAGAJbQSMpI/1/0/900w/canva-beige-pastel-cute-phone-wallpaper-gZsOg5F0HNI.jpg",
    "https://i.pinimg.com/736x/0e/a6/0e/0ea60e02e5dbad89e04710fab40d7b21.jpg",
    "https://i.pinimg.com/736x/06/30/33/063033b955aa19d0a58b02cc513a8b5e.jpg"
  ];
  
    useEffect(() => {
      // Pilih gambar acak
      const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      
      // Terapkan ke body
      document.body.style.backgroundImage = `url('${randomBg}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      
      // Cleanup untuk menghindari efek samping saat unmount
      return () => {
        document.body.style.backgroundImage = "";
      };
    }, []);
    const playSound = () => {
      const audio = new Audio("/sfx.mp3");
      audio.volume = 0.6; 
      audio.play().catch((error) => console.error("Autoplay error:", error));
    };
    
    useEffect(() => {
      document.body.addEventListener("click", playSound);
    
      return () => {
        document.body.removeEventListener("click", playSound);
      };
    }, []);
  
  async function copyLink() {
    const currentUrl = `${window.location.href}${ btoa(unescape(encodeURIComponent(prompt))) .replace(/\+/g, "-")
    .replace(/\//g, "_") 
    .replace(/=+$/, "")}?name=from:${encodeURIComponent(name)} to:${encodeURIComponent(name2)}`
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
    return open(`${window.location.href}/preview/${ btoa(unescape(encodeURIComponent(prompt))) .replace(/\+/g, "-")
    .replace(/\//g, "_") 
    .replace(/=+$/, "")}?name=from:${encodeURIComponent(name)} to:${encodeURIComponent(name2)}`)
  }

  return (
    <div  className="d-flex justify-content-center align-items-center flex-column child">
      <img draggable="false" className="rounded-circle text-center" src="https://media.tenor.com/t9pwGPO3TpoAAAAM/apt.gif" />
      <a className="mt-2 mb-0 text-center text-dark h3 fw-bolder">Card Cozy</a>
        <label forhtml="prompt" className="w-100 text-lg font-bold mt-3"><h5 className="m-0">Perintah<span className="red">*</span></h5></label>
        <input 
          id="prompt" 
          className="form-control p-3"
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Contoh: Buatlah kata-kata untuk selamat ulang tahun" 
        />
        <label forhtml="name" className="w-100 text-lg font-bold mt-3"><h5 className="m-0">Nama Pengirim</h5></label>
        <input 
          id="name" 
          className="form-control p-3"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="M.Fathin Halim" 
        />
        <label forhtml="name2" className="w-100 text-lg font-bold mt-3"><h5 className="m-0">Nama Penerima</h5></label>
        <input 
          id="name2" 
          className="form-control p-3"
          type="text" 
          value={name2}
          onChange={(e) => setName2(e.target.value)} 
          placeholder="Mahiru Shiina" 
        />
        <div id="mahiru" className="d-flex gap-2 w-100 align-items-start justify-content-center mt-2">
          <button onClick={copyLink} disabled={!prompt} className="btn btn-primary btn-lg">Share</button>
          <button onClick={openLink} disabled={!prompt} className="btn btn-secondary btn-lg">Preview</button>
        </div>
        
    </div>
  );
}
