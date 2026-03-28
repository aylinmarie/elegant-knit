import React from "react";
import stylesheet from "./Hero.module.css";

const Hero = ({title, children}) => {
 

  return (
    <div className={stylesheet.root}>
        <h1>{title}</h1>
        <p>{children}</p>
    </div>
  );
};

export default Hero;
