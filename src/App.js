import React from "react";
import stylesheet from "./App.module.css";
import ReactGA from "react-ga";

import { Outlet, Link } from "react-router-dom";

const App = () => {
  const TRACKING_ID = "UA-66263407-2";

  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  if (process.env.NODE_ENV !== "production") {
    window["ga-disable-GA_MEASUREMENT_ID"] = true;
    console.warn("DEV MODE - Working in dev mode.");
  }

  const LINKS = [
    {
      name: "Aylin Marie",
      url: "https://www.aylinmarie.co",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/aylin_marie",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/aylinmcg",
    },
  ];


  return (
    <div className={stylesheet.app}>
      <header className={stylesheet.header}>
          <h2><Link to={`/`}>Elegant Knits</Link></h2>
          {/* <nav className={stylesheet.nav}>
              <ul>
              <li><Link to={`supplies`}>About</Link></li>
              <li><Link to={`supplies`}>Supplies</Link></li>
              </ul>
          </nav> */}
      </header>
      <div className={stylesheet.content}>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={stylesheet.footer}>
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
        </footer>
    </div>
  );
};

export default App;
