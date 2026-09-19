import type { Metadata } from "next";
import Script from "next/script";
import { Hanken_Grotesk } from "next/font/google";
import "mybharat-react-library/style.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Bharat Volunteer Portal",
  description:
    "A Next.js App Router showcase built with Tailwind CSS and mybharat-react-library components.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('myb-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastHost />
      </body>
    </html>
  );
}
