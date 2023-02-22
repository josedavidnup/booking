import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="fondo">
      <img src="https://i.imgur.com/3BGEqFQ.png" class="plane" />
      <img src="https://i.imgur.com/6tncGeG.png" class="cloud1" />
      <img src="https://i.imgur.com/6tncGeG.png" class="cloud2" />
      <img src="https://i.imgur.com/6tncGeG.png" class="cloud3" />
      <img src="https://i.imgur.com/6tncGeG.png" class="cloud4" />
      <img src="https://i.imgur.com/6tncGeG.png" class="cloud5" />
      <h2 className="flex justify-center items-center">Loading...</h2>
      <div class="sun"></div>
      <div class="moon"></div>
    </div>
  );
};

export default Loader;
