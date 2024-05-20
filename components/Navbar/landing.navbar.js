"use client";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import styles from "./LandingPageNavbar.module.css";

const navRoutes = [
  { name: "Home", link: "/" },
  { name: "About US", link: "/about-us" },
  { name: "Blog", link: "/blog" },
  { name: "Price", link: "/pricing" },
  { name: "Contacts", link: "/contacts" },
];

const NavLink = ({ name, link }) => {
  return (
    <div role="listitem" key={link}>
      <div className="xeuugli x2lwn1j x6s0dn4 x78zum5 xl56j7k x5yr21d">
        <div className="xeuugli x2lwn1j x6s0dn4 x78zum5">
          <div
            aria-expanded="false"
            className="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk x78zum5 xdl72j9 xdt5ytf x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xkhd6sd x1n2onr6 x16tdsg8 xggy1nq x1ja2u2z x1t137rt x1hl2dhg x1lku1pv xqmdsaz x1y1aw1k xwib8y2"
            role="button"
            tabIndex="0"
          >
            <Link
              href={link}
              className={`inline-block transition duration-200 ease-in-out hover:text-primaryaccent text-content-emphasis font-medium ${styles.nav_link}`}
            >
              {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPageNavbar = ({ shortIcon }) => {
  const user = useAtomValue(userAtom);

  return (
    <header className="px-3 py-4 md:px-6 md:py-7 flex md:grid md:grid-cols-6 h-[72px] md:h-[96px]">
      <div
        className={`flex-1 flex items-center justify-center md:col-span-4 md:col-start-2 ${styles.container}`}
      >
        <div className="w-full max-w-[900px] flex items-center justify-between">
          <div className="x5yr21d x14atkfc x1iyjqo2 x9e5oc1">
            <div className="xeuugli x2lwn1j x1qjc9v5 x78zum5 x1nhvcw1 x5yr21d x1gcox1g">
              <div className="xeuugli x2lwn1j x1qjc9v5 x78zum5 xl56j7k">
                <div className="x78zum5 xkh2ocl xl56j7k" role="list">
                  {navRoutes.map(({ name, link }) => (
                    <NavLink name={name} link={link} key={link} />
                  ))}
                  <div className="xg01cxk xw4jnvo"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-medium mr-3 hidden md:block ${styles.register_btn_container}`}
        >
          {!user ? (
            <button
              className={`${styles.register_btn} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 underline-offset-4 h-10 p-0 hover:text-primaryaccent`}
            >
              <Link
                className="inline-block transition duration-200 ease-in-out  text-content-emphasis font-medium"
                href="/login"
                style={{
                  fontSize: "1.1rem",
                  position: "relative",
                  textDecoration: "none",
                }}
              >
                Login / Register
              </Link>
            </button>
          ) : (
            <div
              className="p-[10px] inline-flex items-center justify-center whitespace-nowrap rounded-md 
              text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
              disabled:pointer-events-none disabled:opacity-50 underline-offset-4 h-10 
              hover:text-primaryaccent"
            >
              <UserAvatar
                user={user}
                placement="bottom-end"
                className="mt-[10px]"
              />
            </div>
          )}
        </div>
      </div>
      <a href="/" className="h-[40px] fixed top-4 left-3 md:top-7 md:left-6">
        <img
          src="logo.png"
          width={shortIcon ? "85px" : "185px"}
          height="auto"
          className={styles.logo}
        />
      </a>
    </header>
  );
};

export default LandingPageNavbar;
