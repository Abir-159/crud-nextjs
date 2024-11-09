import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-5xl mx-auto text-slate-800">
          <header className="p-6 border-b flex justify-between items-center bg-blue-400 rounded-bl-md rounded-br-md">
            <Link className="font-bold text-2xl text-white" href={"/"}>
              Crud
            </Link>
            <Link
              className="bg-slate-200 grid place-items-center py-2 px-4 font-bold rounded-full shadow-md"
              href={"/create"}
            >
              Add New
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
