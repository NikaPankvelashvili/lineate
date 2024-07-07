import { ParallaxImageProps } from "@/src/types/generalType";
import Island from "@components/island/Island";

const ParallaxImage = ({ image, phrase, secondary }: ParallaxImageProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline bg-black">
        <div
          className={`relative bg-fixed bg-center bg-no-repeat bg-cover w-full ${
            secondary ? "h-[100vh]" : "h-screen"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="text-white absolute top-1/2 text-base w-full text-center">
            <h1 className="text-8xl select-none">{phrase}</h1>
          </div>
        </div>
      </h1>
      <Island />
    </>
  );
};

export default ParallaxImage;
