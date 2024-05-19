import { Montserrat } from "next/font/google";
import StoreProvider from "../store/StoreProvider";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "DeusGPT",
  description: "DeusGPT Application",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-[#ccddec] h-[100vh]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
