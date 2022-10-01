import React from "react";
import stylesheet from "./App.module.css";
import Gallery from "./Gallery";
import ReactGA from "react-ga";

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
    <>
      <header>
        <h1>Elegant Knits</h1>
      </header>
      <div className={stylesheet.app}>
        <main>
          <div>
            <p className={stylesheet.intro}>
              Collection of minimal and timeless knitting patterns.
            </p>
          </div>
          <Gallery />
        </main>
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
    </>
  );
};

export default App;
