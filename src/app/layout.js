import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project 18",
  description: "Share some Quotes",
  icons: {
    icon: "https://media.tenor.com/rPYosYmsvokAAAAM/work-homework.gif" // Menentukan ikon favicon
},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center flex-column gap-2">
            {children}
          </div>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
        </div>
      </body>
    </html>
  );
}
