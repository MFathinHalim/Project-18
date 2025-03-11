"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Ambil prompt dari URL
  const prompt = params.prompt;
  const name = searchParams.get("name");
  console.log(name)

  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const cuteImages = [
    "https://i.pinimg.com/originals/29/ee/5c/29ee5c88ba50e0ef768872a49d1cb19f.gif",
    "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
    "https://i.pinimg.com/originals/52/d0/60/52d06065a31aa6e7b03d512628b3f008.gif",
    "https://i.pinimg.com/originals/8b/82/c5/8b82c5576307ab23d2e207595fda65a7.gif",
  ];

  // Fetch API saat pertama kali render
  useEffect(() => {
    async function fetchData() {
      try {
        const apiurl = `/api/ai?prompt=${encodeURIComponent(prompt)}`;
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Perbaikan: Ambil `data.answer` bukan `data.response`
        const newMessages = data.answer?.split(". ").map((msg) => msg.trim()) || [];
        setMessages(newMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Pastikan loading berhenti setelah fetch selesai
      }
    }

    fetchData();
  }, [prompt]);

  // Countdown untuk mengganti pesan setiap 5 detik
  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1 < messages.length ? prev + 1 : prev));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{name || ""}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length > 0 ? (
        <>
        <p className="text-lg">{messages[currentMessageIndex]}</p>
        <img 
        src={cuteImages[currentMessageIndex % cuteImages.length]} 
        alt="Cute" 
        className="mt-4 w-64 h-64 rounded-lg shadow-lg"
      />
        </>
      ) : (
        <p className="text-lg">Tidak ada pesan ditemukan.</p>
      )}
      
    </div>
  );
}
