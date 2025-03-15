"use client";
import { useEffect } from "react";

export default function AboutUs() {
  const backgrounds = [
    "https://marketplace.canva.com/EAGAJbQSMpI/1/0/900w/canva-beige-pastel-cute-phone-wallpaper-gZsOg5F0HNI.jpg",
    "https://i.pinimg.com/736x/0e/a6/0e/0ea60e02e5dbad89e04710fab40d7b21.jpg",
    "https://i.pinimg.com/736x/06/30/33/063033b955aa19d0a58b02cc513a8b5e.jpg"
  ];

  useEffect(() => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${randomBg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row gap-5" id="aboutdiv">
      <div className="d-flex flex-column justify-content-center text-muted">
        <a href="/" className="display-6 mb-0 fw-bold text-dark">Cardcozy</a>
        <h1 className="display-4 fw-bold text-dark">Siapa Kami?</h1>
        <p className="  max-w-2xl">
          Kami adalah kelompok 3 prakarya kelas 9G SMP Negeri 1 Rejang Lebong (2024/2025) yang memiliki ambisi untuk membantu beberapa orang yang kesulitan mengutarakan perasaan atau bosan dengan kartu ucapan gambar yang itu itu saja
        </p>
        <h6 className="text-dark">Kelompok 3</h6>
        <ul>
            <li><a href="https://mfathinhalim.github.io" className="text-decoration-none text-dark">M.Fathin Halim (Leader, Developer, Designer)</a></li>
            <li>Faraz Dreamkey (Anggota)</li>
            <li>M.Fathurahman (Anggota)</li>
            <li>Napisya Amelia (Anggota)</li>
            <li>Neisya Erlinda Azmi (Anggota)</li>
        </ul>
        <h6 className="text-dark">Other Contributor</h6>
        <ul>
            <li>Najla Zeta Khairunisa (Reviewer design dan penyedia peralatan)</li>
            <li>Galang Dzaki El-Azizi (AI Reviewer dan pembuat prompt AI)</li>
        </ul>
      </div>
      <img 
        id="aboutimg"
        className="img-fluid d-none d-lg-block rounded border-0 mb-4 col-md-3 col-12"
        src="https://static.vecteezy.com/system/resources/thumbnails/009/665/322/small_2x/cute-kitty-cat-family-greeting-cartoon-element-png.png" 
        alt="About Us"
      />
    </div>
  );
}
