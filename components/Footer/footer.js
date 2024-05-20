import { redirect } from "next/navigation";
import styles from "./Footer.module.css";

const footerSections = [
  {
    name: "Deus A.I",
    options: [
      { name: "Team", link: "/llama3" },
      { name: "Research", link: "/llama2" },
      { name: "API", link: "/code-llama" },
    ],
  },
  {
    name: "Getting Started",
    options: [
      { name: "Docs", link: "/get-started" },
      { name: "FAQ", link: "/faq" },
    ],
  },
  {
    name: "Trust & Safety",
    options: [
      { name: "About US", link: "/trust-and-safety" },
      { name: "Privacy Policy", link: "/responsible-use-guide" },
    ],
  },
];

const FooterSection = ({ name, options }) => {
  return (
    <div
      key={name}
      className="x193iq5w xh8yej3 x9f619 xdl72j9 x1c4vz4f x2lah0s x18i85vq xu9dp86 x1n2gxj2 x3yeff4 xhuz21x x1jcwenj x1s0dajt x1gnvfkl x8lmfi4 xwy3nlu xpu8j0z xfzd5jt"
    >
      <div className="x1iymm2a">
        <div
          className={`x16g9bbj x17gzxuv x1rujz1s xm5vtmc x3voqp2 x658qfi x1wsgf3v xn1wy4v x1k03ns3 xpbi8i2 xh2n1af x1npfmwo xg94uf4 xrm2kyc xjprkx4 xawl3gl x1twfotg x12429cg x6tc29j xbq7h4v x6jdkww xq9mrsl x12nagc ${styles.section_header}`}
        >
          {name}
        </div>
        <div role="list"></div>
        {options.map(({ name, link }) => (
          <div className="x12nagc" role="listitem" key={link}>
            <span className="xbks1sj x17gzxuv x1rujz1s xm5vtmc x3voqp2 x658qfi x1wsgf3v xn1wy4v x1k03ns3 xpbi8i2 xh2n1af x1npfmwo xg94uf4 xrm2kyc xjprkx4 xawl3gl x12429cg x6tc29j xbq7h4v x6jdkww xq9mrsl">
              <a
                className="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 xdt5ytf x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 xggy1nq x1ja2u2z x1t137rt xt0psk2 x1hl2dhg xt0b8zv x1heor9g"
                href={link}
                role="link"
                tabIndex="0"
                target="_self"
              >
                {name}
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer
      className={`hidden md:grid divide-y divide-border pt-3 ${styles.container}`}
    >
      <div className="x78zum5 x1l7klhg x1iyjqo2 x2lah0s x1a02dak xd2bs7b x5bj0eh x1sje56t x2b88hg x17tu2g0 xnjo89n x1u140kg x1upty2d x1i8puum">
        <div className="x193iq5w xh8yej3 x9f619 xdl72j9 x1c4vz4f x2lah0s x10rn61k x1p4a80c x1n2gxj2 x3yeff4 xhuz21x x1jcwenj x1s0dajt x1gnvfkl x8lmfi4 x137jj4x x1dshhg4 x14z7tpn">
          <div
            className="d-flex justify-start items-center gap-4 px-6"
            style={{ left: "50px", position: "relative" }}
          >
            <a
              className="inline-block font-semibold transition duration-200 ease-in-out text-primaryaccent hover:text-foreground"
              target="_blank"
              href="https://discord.gg/groq"
            >
              <svg
                aria-label="discord"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-none stroke-muted-foreground hover:stroke-primaryaccent"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7.858 17.635 6.675 20c-1.507-.628-3.068-1.255-4.727-2.336a2.085 2.085 0 0 1-.944-1.707c-.072-3.542.76-7.104 2.865-10.87a2.331 2.331 0 0 1 1.267-1.042c1.27-.45 2.133-.799 3.61-1.045l.887 1.626S10.521 4.33 12 4.33c1.48 0 2.367.296 2.367.296L15.254 3c1.477.246 2.34.594 3.61 1.045.532.189.991.55 1.267 1.043 2.105 3.765 2.937 7.327 2.865 10.87a2.085 2.085 0 0 1-.944 1.706c-1.66 1.08-3.22 1.708-4.727 2.336l-1.183-2.365M6.083 16.452S9.042 17.93 12 17.93c2.958 0 5.916-1.478 5.916-1.478"
                ></path>
                <path
                  strokeWidth="2"
                  d="M9.421 11.5c0 .515-.145.938-.326 1.203-.185.27-.338.297-.384.297-.047 0-.2-.027-.385-.297C8.145 12.438 8 12.015 8 11.5c0-.515.145-.938.326-1.203.185-.27.338-.297.385-.297.046 0 .199.027.384.297.181.265.326.688.326 1.203Zm6.579 0c0 .515-.145.938-.326 1.203-.185.27-.338.297-.384.297-.047 0-.2-.027-.385-.297-.181-.265-.326-.688-.326-1.203 0-.515.144-.938.326-1.203.185-.27.338-.297.385-.297.046 0 .199.027.384.297.181.265.326.688.326 1.203Z"
                ></path>
              </svg>
            </a>
            <a
              className="inline-block font-semibold transition duration-200 ease-in-out text-primaryaccent hover:text-foreground"
              target="_blank"
              href="https://twitter.com/groqinc"
            >
              <svg
                aria-label="x"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#000"
                className="fill-muted-foreground hover:fill-primaryaccent"
              >
                <path d="M14.286 10.164 23.222 0h-2.117l-7.763 8.823L7.147 0H0l9.37 13.343L0 24h2.117l8.192-9.32L16.853 24H24M2.88 1.562h3.253l14.97 20.953H17.85"></path>
              </svg>
            </a>
            <a
              className="inline-block font-semibold transition duration-200 ease-in-out text-primaryaccent hover:text-foreground"
              target="_blank"
              href="https://www.youtube.com/c/GroqInc"
            >
              <svg
                aria-label="youtube"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 24"
                fill="#000"
                className="fill-muted-foreground hover:fill-primaryaccent"
              >
                <path d="M19.227 3.183H4.773C2.14 3.183 0 5.331 0 7.97v8.058c0 2.64 2.14 4.787 4.773 4.787h14.454c2.632 0 4.773-2.148 4.773-4.787V7.97c0-2.64-2.14-4.787-4.773-4.787ZM23.02 16.03c0 2.1-1.701 3.807-3.793 3.807H4.773C2.68 19.836.98 18.128.98 16.03V7.97c0-2.099 1.701-3.807 3.793-3.807h14.454c2.092 0 3.793 1.708 3.793 3.807v8.059Z"></path>
                <path d="M16.336 11.822 9.55 7.847a.49.49 0 0 0-.738.423v7.949a.49.49 0 0 0 .738.422l6.786-3.973a.49.49 0 0 0 0-.846Zm-6.544 3.542v-6.24l5.327 3.12-5.327 3.12Z"></path>
              </svg>
            </a>
            <a
              className="inline-block font-semibold transition duration-200 ease-in-out text-primaryaccent hover:text-foreground"
              target="_blank"
              href="https://www.linkedin.com/company/groq"
            >
              <svg
                aria-label="linkedin"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#000"
                className="fill-muted-foreground hover:fill-primaryaccent"
              >
                <path d="M22.286 0H1.709C.766 0 0 .777 0 1.73v20.54C0 23.223.766 24 1.709 24h20.577c.943 0 1.714-.777 1.714-1.73V1.73C24 .777 23.229 0 22.286 0ZM7.254 20.571H3.696V9.118H7.26V20.57h-.005ZM5.475 7.554a2.063 2.063 0 0 1 0-4.125c1.136 0 2.063.926 2.063 2.062a2.06 2.06 0 0 1-2.063 2.063ZM20.587 20.57H17.03V15c0-1.329-.026-3.037-1.848-3.037-1.853 0-2.137 1.446-2.137 2.94v5.668H9.488V9.118H12.9v1.564h.048c.477-.9 1.64-1.848 3.37-1.848 3.6 0 4.27 2.373 4.27 5.459v6.278Z"></path>
              </svg>
            </a>
            <a
              className="inline-block font-semibold transition duration-200 ease-in-out text-primaryaccent hover:text-foreground"
              target="_blank"
              href="https://www.instagram.com/groqinc/"
            >
              <svg
                aria-label="instagram"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#000"
                className="fill-muted-foreground hover:fill-primaryaccent"
              >
                <g clipPath="url(#a)">
                  <path d="M17.377 0H6.623A6.63 6.63 0 0 0 0 6.623v10.754A6.63 6.63 0 0 0 6.623 24h10.754A6.63 6.63 0 0 0 24 17.377V6.623A6.63 6.63 0 0 0 17.377 0Zm4.494 17.377a4.499 4.499 0 0 1-4.494 4.494H6.623a4.499 4.499 0 0 1-4.494-4.494V6.623A4.499 4.499 0 0 1 6.623 2.13h10.754a4.499 4.499 0 0 1 4.494 4.494v10.754Z"></path>
                  <path d="M11.997 5.817A6.191 6.191 0 0 0 5.813 12a6.191 6.191 0 0 0 6.184 6.184A6.191 6.191 0 0 0 18.18 12a6.191 6.191 0 0 0-6.184-6.184Zm0 10.238a4.06 4.06 0 0 1-4.055-4.054 4.06 4.06 0 0 1 4.055-4.055A4.06 4.06 0 0 1 16.05 12a4.06 4.06 0 0 1-4.054 4.054ZM18.448 4.01a1.569 1.569 0 0 0-1.562 1.562c0 .41.168.814.459 1.105.29.29.692.457 1.103.457.411 0 .813-.168 1.104-.457.291-.291.457-.695.457-1.105 0-.412-.166-.815-.457-1.104a1.568 1.568 0 0 0-1.104-.457Z"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h24v24H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
        <div className="x193iq5w xh8yej3 x9f619 xdl72j9 x1c4vz4f x2lah0s x10rn61k x1p4a80c x11b69tj x3yeff4 xhuz21x x1jcwenj x1s0dajt x1gnvfkl x8lmfi4 x137jj4x x1dshhg4 x14z7tpn">
          <div className="x78zum5 x1l7klhg x1iyjqo2 x2lah0s x1a02dak xd2bs7b x5bj0eh x1sje56t x2b88hg x17tu2g0 xnjo89n xo2o5nc xv9pgs7 xjfzuef x137v6ai x1mj2il2"></div>
          <div className="x78zum5 x1l7klhg x1iyjqo2 x2lah0s x1a02dak xd2bs7b x5bj0eh x1sje56t x2b88hg x17tu2g0 xnjo89n xo2o5nc xv9pgs7 xjfzuef x137v6ai xtv8dzd">
            {footerSections.map(({ name, options }) => (
              <FooterSection name={name} options={options} key={name} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
