"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const searchParams = useSearchParams();

  const prompt = params.prompt;
  const name = searchParams.get("name");

  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);


  const cuteImages = [
    "https://i.pinimg.com/originals/29/ee/5c/29ee5c88ba50e0ef768872a49d1cb19f.gif",
    "https://i.pinimg.com/originals/18/fb/0a/18fb0a41f4658f84befdd647756269cf.gif",
    "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
    "https://i.pinimg.com/originals/5d/7b/bf/5d7bbf91f0f3357cc9d4562b31ac7f39.gif",
    "https://i.pinimg.com/originals/52/d0/60/52d06065a31aa6e7b03d512628b3f008.gif",
    "https://i.pinimg.com/originals/8b/82/c5/8b82c5576307ab23d2e207595fda65a7.gif",
  ];
  const [randomImageIndex, setRandomImageIndex] = useState(Math.floor(Math.random() * cuteImages.length));
  
  useEffect(() => {
    async function fetchData() {
      try {
        const apiurl = `/api/ai?prompt=${encodeURIComponent(prompt)}`;
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const newMessages = data.answer?.split(". ").map((msg) => msg.trim()) || [];
        setMessages(newMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [prompt]);

  useEffect(() => {
    if (messages.length === 0) return;

    setTypedMessage(""); // Reset sebelum mulai animasi
    let index = -1;
    const text = messages[currentMessageIndex] || ""; // Hindari undefined
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setTypedMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Kecepatan mengetik

    return () => clearInterval(interval);
  }, [messages, currentMessageIndex]);

  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setCountdown(5);
      setRandomImageIndex(Math.floor(Math.random() * cuteImages.length));
      setCurrentMessageIndex((prev) => (prev + 1 < messages.length ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    let start = performance.now();

    function updateCountdown(timestamp) {
      const elapsed = (timestamp - start) / 1000;
      const remaining = Math.max(5 - elapsed, 0);
      setCountdown(remaining);
      if (remaining > 0) {
        requestAnimationFrame(updateCountdown);
      }
    }

    if (messages.length > 0) {
      requestAnimationFrame(updateCountdown);
    }
  }, [messages, currentMessageIndex]);

  return (
    <>
      <h4 className="text-lg font-bold">{name || ""}</h4>

      {loading ? (
        <h3 className="text-2xl font-bold background px-4 py-4 roundedd">
          Merangkai kata untuk yang berharga...
        </h3>
      ) : messages.length > 0 ? (
        <>
          <img
            src={cuteImages[randomImageIndex]}
            alt="Cute"
            className="rounded-circle"
          />
          <h3 className="text-2xl w-100 text-center font-bold background px-4 py-4 roundedd background">
            {typedMessage.replace("undefined", "") || "..." /* Tampilkan "..." saat teks masih diketik */}
          </h3>
          <progress
            type="range"
            min="0"
            max="5"
            value={countdown}
            readOnly
            className="w-full w-100 mt-2 transition-all duration-500 ease-in-out"
          ></progress>
        </>
      ) : (
        <p className="text-lg">Tidak ada pesan ditemukan.</p>
      )}
    </>
  );
}
