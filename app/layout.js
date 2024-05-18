import Head from "next/head";
import "../styles/global.css";

export const metadata = {
  title: "DeusGPT",
  description: "DeusGPT Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body className="bg-[#ccddec] w-[100vw] h-[100vh]">
        {/* Layout UI */}
        {children}
      </body>
    </html>
  );
}
