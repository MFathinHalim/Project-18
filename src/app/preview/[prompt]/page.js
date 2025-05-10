"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import emojiRegex from "emoji-regex";

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
    [
      "https://img.freepik.com/free-vector/white-background-with-wavy-line_361591-1210.jpg?t=st=1746852517~exp=1746856117~hmac=6d5c59af3e981e662f8779b0ec68bac8a2a94fba0c632c6a926a2294f9532a50&w=996",
      "https://img.freepik.com/free-vector/background-gradient-line-digital-abstract_483537-2921.jpg?t=st=1746852490~exp=1746856090~hmac=ab788c6257ee05242d8ca731a0b3bb072d4586ff7432645e5b0a0a78822e2e6c&w=996",
      "https://img.freepik.com/premium-vector/abstract-wavy-line-background-dynamic-sound-wave-wavy-pattern-stylish-line-art-background-design_481388-1337.jpg?w=740",
    ],
    // mode 1 = sahabat
    [
      "https://i.pinimg.com/736x/18/81/ac/1881ac3643a163237e8e14158f61cd60.jpg",
      "https://i.pinimg.com/originals/1e/5d/ef/1e5defd3e43a11c185c636f26fa5a04b.jpg",
      "https://img.freepik.com/free-vector/hand-drawn-abstract-doodle-background_23-2149323528.jpg?semt=ais_hybrid&w=740",
      "https://static.vecteezy.com/system/resources/previews/004/968/002/non_2x/cute-abstract-modern-background-free-vector.jpg",
    ],
    // mode 2 = romantis
    [
      "https://i.pinimg.com/736x/35/0b/d3/350bd3c3180f4234998299e34c6f89da.jpg",
      "https://i.pinimg.com/736x/35/31/56/353156bf3584fc3548d6465f9b0e429f.jpg",
      "https://i.pinimg.com/736x/18/81/ac/1881ac3643a163237e8e14158f61cd60.jpg",
      "https://i.pinimg.com/736x/42/3e/75/423e752b884436e49d645763f6d784dc.jpg",
      "https://i.pinimg.com/736x/6b/34/77/6b347757661505edf86e026e6edc18ae.jpg",
    ],
  ];

  const cuteImages = [
    // gender 0 = cowok
    [
      "https://i.pinimg.com/originals/f7/09/63/f709637565b4719b0ac950b666ac8a01.gif",
      "https://i.pinimg.com/originals/92/7e/e2/927ee21974707181014a5cef731394f5.gif",
      "https://i.pinimg.com/originals/39/9c/84/399c848ef51509e8ff302fd82f76bdf9.gif",
      "https://i.pinimg.com/originals/03/4d/a0/034da06d347ca04669060d4c68721ed3.gif",
      "https://i.pinimg.com/originals/92/a1/1e/92a11ea49b4c4395dc8ed62fb3e34718.gif",
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
        const emoji = emojiRegex().source;

        const splitRegex = new RegExp(`[.,]|${emoji}`, "gu");

        const newMessages =
          data.apiResponse.answer
            ?.split(splitRegex)
            .map((msg) => msg.trim())
            .filter(Boolean) || [];

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
    const bgmFiles = [
      ["/bgm2.mp3", "/bgm3.mp3", "/bgm4.mp3"],
      ["/bgm1.mp3", "/bgm2.mp3", "/bgm3.mp3", "/bgm4.mp3"],
      ["/rmc1.mp3", "/rmc2.mp3", "/rmc3.mp3", "/rmc4.mp3"],
    ];

    const randomBgm =
      bgmFiles[mode === 3 ? 1 : mode][
        Math.floor(Math.random() * bgmFiles[mode === 3 ? 0 : mode].length)
      ];
    console.log(randomBgm);
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
            cuteImages[post.gender === 1 || post.mode === 2 ? 1 : 0].length
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
      <h4 className="fw-bold mt-0 d-flex flex-column flex-md-row gap-2">
        <div>
          {" "}
          for{" "}
          <span className="text-decoration-underline">
            {post?.user?.tujuan || "..."}
          </span>
        </div>
        <div>
          from <span>{post?.user?.pengirim || "..."}</span>
        </div>
      </h4>

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
              cuteImages[post.gender === 1 || post.mode === 2 ? 1 : 0][
                randomImageIndex
              ]
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
