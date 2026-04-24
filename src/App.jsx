import React from "react";
import stylesheet from "./App.module.css";
import ReactGA from "react-ga4";

import { Outlet, Link } from "react-router-dom";

const App = () => {
  // Replace with your GA4 measurement ID (format: G-XXXXXXXXXX)
  const TRACKING_ID = "G-XXXXXXXXXX";

  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

  if (import.meta.env.MODE !== "production") {
    console.warn("DEV MODE - Working in dev mode.");
  }

  const LINKS = [
    {
      name: "Aylin Marie",
      url: "https://www.aylinmarie.co",
    },
  ];


  return (
    <div className={stylesheet.app}>
      <header className={stylesheet.header}>
          <h2><Link to={`/`}>Elegant Knits</Link></h2>
      </header>
      <div className={stylesheet.content}>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={stylesheet.footer}>
        <div className={stylesheet.footerWrapper}>
          <ul>
            {LINKS.map((link) => {
              return (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <span>
            Built with{" "}
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              React
            </a>{" "}
            and{" "}
            <a
              href="https://www.ravelry.com/groups/ravelry-apihttps://www.ravelry.com/groups/ravelry-api"
              target="_blank"
              rel="noreferrer"
            >
              Ravelry API
            </a>
          </span>
        </div>
        </footer>
    </div>
  );
};

export default App;
