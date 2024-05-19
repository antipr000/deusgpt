import { Montserrat } from "next/font/google";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "jotai";
import { store } from "../store/store";

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
