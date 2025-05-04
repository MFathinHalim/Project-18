import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Card Cozy",
  description: "Share some Quotes",
  icons: {
    icon: "https://media.tenor.com/rPYosYmsvokAAAAM/work-homework.gif", // Favicon
  },
  openGraph: {
    title: "Card Cozy",
    description: "Share some Quotes",
    siteName: "Card Cozy",
    images: [
      {
        url: "https://media.tenor.com/rPYosYmsvokAAAAM/work-homework.gif", // Gambar saat di-share
        width: 1200,
        height: 630,
        alt: "Card Cozy Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center flex-column gap-2 parent">
            {children}
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column gap-2 parent">
            <div id="#about" className="d-flex flex-column flex-md-row gap-5">
              <div className="d-flex flex-column justify-content-center text-muted">
                <a href="/" className="display-6 mb-0 fw-bold text-dark">
                  Cardcozy
                </a>
                <h1 className="display-4 fw-bold text-dark">Siapa Kami?</h1>
                <p className="  max-w-2xl">
                  Kami adalah kelompok 3 prakarya kelas 9G SMP Negeri 1 Rejang
                  Lebong (2024/2025) yang memiliki ambisi untuk membantu
                  beberapa orang yang kesulitan mengutarakan perasaan atau bosan
                  dengan kartu ucapan gambar yang itu itu saja. Web ini
                  diharapkan dapat mempererat hubungan dan silahturahmi serta
                  membantu orang-orang yang kesulitan mengutarakan perasaannya
                </p>
                <h6 className="text-dark">Kelompok 3</h6>
                <ul>
                  <li>
                    <a
                      href="https://mfathinhalim.github.io"
                      className="text-decoration-none text-dark"
                    >
                      M.Fathin Halim (Leader, Developer, Designer)
                    </a>
                  </li>
                  <li>Faraz Dreamkey (Anggota)</li>
                  <li>M.Fathurahman (Anggota)</li>
                  <li>Napisya Amelia (Anggota)</li>
                  <li>Neisya Erlinda Azmi (Anggota)</li>
                </ul>
                <h6 className="text-dark">Other Contributor</h6>
                <ul>
                  <li>
                    Najla Zeta Khairunisa (Reviewer design dan penyedia
                    peralatan)
                  </li>
                  <li>
                    Galang Dzaki El-Azizi (AI Reviewer dan pembuat prompt AI)
                  </li>
                </ul>
              </div>
              <img
                id="aboutimg"
                className="img-fluid d-none d-lg-block rounded border-0 mb-4 col-md-3 col-12"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/665/322/small_2x/cute-kitty-cat-family-greeting-cartoon-element-png.png"
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
