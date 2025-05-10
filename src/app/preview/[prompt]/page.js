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
  const [countdown, setCountdown] = useState(3);
  const [showMessage, setShowMessage] = useState(false);
  const [bgm, setBgm] = useState(null);
  const [isReady, setIsReady] = useState(false); // Untuk menampilkan tombol setelah fetch selesai
  const [randomImageIndex, setRandomImageIndex] = useState(0);
  const [post, setPost] = useState(null);
  // Array untuk backgrounds dan cuteImages
  const backgrounds = [
    // mode 0 = formal
    ["https://i.pinimg.com/736x/35/31/56/353156bf3584fc3548d6465f9b0e429f.jpg"],
    // mode 1 = sahabat
    [
      "https://i.pinimg.com/736x/18/81/ac/1881ac3643a163237e8e14158f61cd60.jpg",
      "https://i.pinimg.com/736x/42/3e/75/423e752b884436e49d645763f6d784dc.jpg",
    ],
    // mode 2 = romantis
    [
      "https://i.pinimg.com/736x/f0/f1/a5/f0f1a5e6eae52f51376955c4cbf71dbd.jpg",
      "https://i.pinimg.com/736x/59/88/6d/59886dc9f0dde61ffd68004e3c09ad7a.jpg",
      "https://i.pinimg.com/736x/16/e6/e7/16e6e7475ecb29dcfc581e1ee5f46600.jpg",
      "https://i.pinimg.com/originals/e0/4c/2c/e04c2c64127462fad5a5a4243648f3d2.jpg",
      "https://i.pinimg.com/736x/59/88/6d/59886dc9f0dde61ffd68004e3c09ad7a.jpg"
    ],
    // mode 3 = undangan
    ["https://i.pinimg.com/736x/23/4c/1c/234c1c9184f5126b83d42ad6420b48ff.jpg"],
  ];

  const cuteImages = [
    // gender 0 = cowok
    [
      "https://i.pinimg.com/originals/29/ee/5c/29ee5c88ba50e0ef768872a49d1cb19f.gif",
      "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
    ],
    // gender 1 = cewek
    [
      "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
      "https://i.pinimg.com/originals/ce/de/e5/cedee5a2aa7ec4eaaa6dbf60e8eb4b3a.gif",
      "https://i.pinimg.com/originals/48/a9/0e/48a90eafbdec0f400940a9bb5da76266.gif",
      "https://i.pinimg.com/originals/65/28/7a/65287a19692bfeac7a7fce6ad296cef4.gif",
      "https://i.pinimg.com/originals/77/bc/7f/77bc7fd8117fa88beb837f39ef4d6544.gif",
    ],
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const apiurl = `/api/ai?uid=${prompt}`;
        const response = await fetch(apiurl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const newMessages =
          data.apiResponse.answer?.split(/[\.\,]/).map((msg) => msg.trim()) ||
          [];
        setMessages(newMessages);
        setMessages((prev) => [
          ...prev,
          data.apiResponse.answer.replaceAll(". ", ", "),
        ]);
        setPost(data.post);
        const bgArray = backgrounds[data.post.mode];
        const randomBg = bgArray[Math.floor(Math.random() * bgArray.length)];
        console.log(randomBg);

        // Terapkan ke body
        document.body.style.backgroundImage = `url('${randomBg}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        console.log(randomBg);
        setIsReady(true); // Menampilkan tombol setelah fetch selesai
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [prompt]);
  async function copyLink() {
    const currentUrl = `${window.location.href.replace("/preview", "")}`;
    console.log(currentUrl);
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
  function startReading() {
    // Play BGM setelah tombol ditekan
    //0 -> formal
    //1 -> sahabat
    //2 -> romantis
    const mode = post.mode;
    const bgmFiles = [[], [], ["/bgm1.mp3", "/bgm2.mp3", "/bgm3.mp3"]];

    const randomBgm =
      bgmFiles[mode === 3 ? 0 : mode][
        Math.floor(Math.random() * bgmFiles.length)
      ];
    const audio = new Audio(randomBgm);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    setBgm(audio);
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  }
  const playSound = () => {
    const audio = new Audio("/sfx.mp3");
    audio.volume = 0.3;
    audio.play().catch((error) => console.error("Autoplay error:", error));
  };

  useEffect(() => {
    document.body.addEventListener("click", playSound);

    return () => {
      document.body.removeEventListener("click", playSound);
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
      setCountdown(3);
      setRandomImageIndex(Math.floor(Math.random() * cuteImages.length));
      setCurrentMessageIndex((prev) =>
        prev + 1 < messages.length ? prev + 1 : prev
      );
    }, 3000);

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
      const remaining = Math.max(3 - elapsed, 0);
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

      if (messages.length === 0 || currentMessageIndex === messages.length - 1)
        return;

      setCountdown(3);
      setRandomImageIndex(
        Math.floor(
          Math.random() *
            cuteImages[
              post.gender === 1 || post.mode === 2 ? 1 : post.mode === 0 ? 0 : 2
            ].length
        )
      );
      setCurrentMessageIndex((prev) =>
        prev + 1 < messages.length ? prev + 1 : prev
      );
    }

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick); // Bersihkan listener saat komponen unmount
    };
  }, [showMessage, messages, currentMessageIndex]); // Tambahkan dependensi penting
  return (
    <div className="child px-3 py-5 d-flex justify-content-center align-items-center flex-column gap-2">
      <h5 className="mb-0">This is Preview</h5>
      <h4 className="text-lg font-bolder mt-0">{name || ""}</h4>

      {loading ? (
        <>
          <img
            draggable="false"
            src="https://media.tenor.com/rPYosYmsvokAAAAM/work-homework.gif"
            alt="Cute"
            className="rounded-circle"
          />
          <h3 className="text-2xl font-bold px-4 py-4 roundedd brdr">
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
          <button
            onClick={startReading}
            className="btn btn-secondary btn-lg fs-4 titlee"
          >
            Klik Suratnya
          </button>
        </>
      ) : messages.length > 0 ? (
        <>
          <img
            draggable="false"
            src={
              cuteImages[
                post.gender === 1 || post.mode === 2
                  ? 1
                  : post.mode === 0
                  ? 0
                  : 2
              ][randomImageIndex]
            }
            alt="Cute"
            className="rounded-circle bg-white"
          />
          <h3
            className={`text-2xl w-100 font-bold px-4 py-4 roundedd brdr ${
              currentMessageIndex === messages.length - 1
                ? "text-justify"
                : "text-center"
            }`}
          >
            {typedMessage
              .replace("undefined", "")
              .replace("SWT", "سُبْحَانَهُ وَ تَعَالَى ") || "..."}
          </h3>

          {currentMessageIndex < messages.length - 1 && (
            <progress
              type="range"
              min="0"
              max="3"
              value={countdown}
              readOnly
              className="w-full w-100 mt-2 transition-all duration-500 ease-in-out"
            ></progress>
          )}
          <button
            onClick={copyLink}
            className="btn btn-secondary btn-lg fs-4 titlee"
          >
            Share
          </button>
        </>
      ) : (
        <h3 className="text-2xl w-100 text-center font-bold px-4 py-4 roundedd  background brdr">
          waduh kecoret, reload pagenya dulu yaa
        </h3>
      )}
    </div>
  );
}
