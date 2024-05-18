import "../styles/global.css";

export const metadata = {
  title: "DeusGPT",
  description: "DeusGPT Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#ccddec] h-[100vh]">
        {/* Layout UI */}
        {children}
      </body>
    </html>
  );
}
