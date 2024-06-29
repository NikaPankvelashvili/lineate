import React from "react";

const ParallaxImage = () => {
  return (
    <h1 className="text-3xl font-bold underline bg-red-500 ">
      <div
        className="image-bg"
        style={{
          backgroundImage: `url(https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.landing-big_2x.jpg)`,
        }}
      >
        <div className="photoText">
          <h1 className="text-8xl">Elegance.</h1>
        </div>
      </div>
    </h1>
  );
};

export default ParallaxImage;
