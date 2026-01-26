import type { Metadata } from "next";
// 1. Import Poppins from Google
import { Poppins } from "next/font/google";
// 2. Import your new CSS file (since we deleted globals.css)
import "./main.css"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 3. Configure the font (Added 800 weight for extra bold headers)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Special Graphics",
  description: "Design Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${poppins.variable} font-sans bg-white text-black`}
        // 4. THE FIX: We force the font via inline style to guarantee it works
        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
