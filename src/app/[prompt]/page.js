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
  const [showMessage, setShowMessage] = useState(false);
  const [bgm, setBgm] = useState(null);
  const [isReady, setIsReady] = useState(false); // Untuk menampilkan tombol setelah fetch selesai

  const cuteImages = [
    "https://i.pinimg.com/originals/29/ee/5c/29ee5c88ba50e0ef768872a49d1cb19f.gif",
    "https://i.pinimg.com/originals/18/fb/0a/18fb0a41f4658f84befdd647756269cf.gif",
    "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
    "https://i.pinimg.com/originals/5d/7b/bf/5d7bbf91f0f3357cc9d4562b31ac7f39.gif",
    "https://i.pinimg.com/originals/52/d0/60/52d06065a31aa6e7b03d512628b3f008.gif",
    "https://i.pinimg.com/originals/8b/82/c5/8b82c5576307ab23d2e207595fda65a7.gif",
  ];
  const [randomImageIndex, setRandomImageIndex] = useState(
    Math.floor(Math.random() * cuteImages.length)
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const apiurl = `/api/ai?prompt=${encodeURIComponent(prompt)}`;
        const response = await fetch(apiurl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const newMessages =
          data.answer?.split(". ").map((msg) => msg.trim()) || [];
        setMessages(newMessages);
        setMessages((prev) => [...prev, data.answer.replaceAll(". ", ", ")]);
        setIsReady(true); // Menampilkan tombol setelah fetch selesai
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [prompt]);

  function startReading() {
    // Play BGM setelah tombol ditekan
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.play();
    setBgm(audio);
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  }
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
  
  useEffect(() => {
    if (messages.length === 0 || !showMessage) return;

    setTypedMessage("");
    let index = -1;
    const text = messages[currentMessageIndex] || "";
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setTypedMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [messages, currentMessageIndex, showMessage]);

  useEffect(() => {
    if (
      messages.length === 0 ||
      !showMessage ||
      currentMessageIndex === messages.length - 1
    )
      return;

    const interval = setInterval(() => {
      setCountdown(5);
      setRandomImageIndex(Math.floor(Math.random() * cuteImages.length));
      setCurrentMessageIndex((prev) =>
        prev + 1 < messages.length ? prev + 1 : prev
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [messages, currentMessageIndex, showMessage]);

  useEffect(() => {
    if (
      messages.length === 0 ||
      !showMessage ||
      currentMessageIndex === messages.length - 1
    )
      return;

    let start = performance.now();
    function updateCountdown(timestamp) {
      const elapsed = (timestamp - start) / 1000;
      const remaining = Math.max(5 - elapsed, 0);
      setCountdown(remaining);
      if (remaining > 0) {
        requestAnimationFrame(updateCountdown);
      }
    }

    requestAnimationFrame(updateCountdown);
  }, [messages, currentMessageIndex, showMessage]);
  useEffect(() => {
    function handleClick() {
      if (!showMessage) return; // Pastikan surat sudah dibuka
  
      if (messages.length === 0 || currentMessageIndex === messages.length - 1) return;
  
      setCountdown(5);
      setRandomImageIndex(Math.floor(Math.random() * cuteImages.length));
      setCurrentMessageIndex((prev) => (prev + 1 < messages.length ? prev + 1 : prev));
    }
  
    document.body.addEventListener("click", handleClick);
  
    return () => {
      document.body.removeEventListener("click", handleClick); // Bersihkan listener saat komponen unmount
    };
  }, [showMessage, messages, currentMessageIndex]); // Tambahkan dependensi penting
  return (
    <div className="child px-3 py-5 d-flex justify-content-center align-items-center flex-column gap-2">
      <h4 className="text-lg font-bolder">{name || ""}</h4>

      {loading ? (
        <>
        <img
        draggable="false"
          src="https://media.tenor.com/rPYosYmsvokAAAAM/work-homework.gif"
          alt="Cute"
          className="rounded-circle"
        />
          <h3 className="text-2xl font-bold px-4 py-4 roundedd background brdr">
            Sedang menulis surat
          </h3>
        </>
      ) : isReady && !showMessage ? (
        <>
        <img
        draggable="false"
            src="https://static.vecteezy.com/system/resources/previews/007/165/786/non_2x/cute-turquoise-email-message-icon-flat-design-for-app-label-illustration-free-vector.jpg"
            alt="Cute"
            className="rounded-circle"
          />
        <button onClick={startReading} className="btn btn-secondary btn-lg fs-4 titlee">
          Klik Suratnya
        </button>
        </>
      ) : messages.length > 0 ? (
        <>
          <img
          draggable="false"
            src={cuteImages[randomImageIndex]}
            alt="Cute"
            className="rounded-circle"
          />
          <h3 className="text-2xl w-100 text-center font-bold px-4 py-4 roundedd  background brdr">
            {typedMessage
              .replace("undefined", "")
              .replace("SWT", "سُبْحَانَهُ وَ تَعَالَى ") || "..."}
          </h3>
          {currentMessageIndex < messages.length - 1 && (
            <progress
              type="range"
              min="0"
              max="5"
              value={countdown}
              readOnly
              className="w-full w-100 mt-2 transition-all duration-500 ease-in-out"
            ></progress>
          )}
        </>
      ) : (
        <h3 className="text-2xl w-100 text-center font-bold px-4 py-4 roundedd  background brdr">
            waduh kecoret, reload pagenya dulu yaa
        </h3>
      )}
    </div>
  );
}
