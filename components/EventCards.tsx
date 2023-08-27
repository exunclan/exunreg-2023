import Image from "next/image";

type CardParams = {
  text: string;
  image: string;
  className?: string;
  long?: boolean;
};
export default function Card({ text, image, className, long }: CardParams) {
  return (
    <>
      <div
        className={`hover:shadow-md transition-all border-sub/20 border-solid border-[1px] flex ${
          long ? "flex-row w-[31rem]" : "flex-col w-[15rem]"
        } justify-center items-center p-8 m-2 h-[15rem] ${className}`}
      >
        {long ? (
          <>
            <Image src={image} alt={text} height="150" width="150" />
            <div className="text-sub text-5xl mt-5 mx-2 text-semibold text-center">
              {text}
            </div>
          </>
        ) : (
          <>
            <Image src={image} alt={text} height="120" width="120" />
            <div className="text-sub text-lg mt-5 mx-2 text-semibold text-center">
              {text}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function HeaderCard() {
  return (
    <>
      <div className="header-card shadow-md border-sub/20 border-solid border-[1px] rounded-md flex flex-col justify-center items-center p-8 m-2 w-[15rem] h-[31rem] rounded-ss-max rounded-ee-max">
        <div className="text-7xl mt-5 mx-3 font-bold -rotate-90 text-white">
          Events
        </div>
      </div>
    </>
  );
}
