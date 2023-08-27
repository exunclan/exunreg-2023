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
          long ? "flex-row sm:w-[31rem]" : "flex-col sm:w-[15rem]"
        } justify-center items-center p-8 m-2 w-[8rem] h-[8rem] sm:h-[15rem] ${className}`}
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
            <div className="text-sub text-sm sm:text-lg mt-2 sm:mt-5 sm:mx-2 text-semibold text-center">
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
      <div className="header-card shadow-md border-sub/20 border-solid border-[1px] sm:rounded-md flex flex-col justify-center items-center p-8 m-2 w-[17rem] sm:w-[15rem] h-[4rem] sm:h-[31rem] rounded-2xl sm:rounded-ss-max sm:rounded-ee-max">
        <div className="text-2xl sm:text-7xl sm:mt-5 mx-3 font-bold sm:-rotate-90 text-white">
          Events
        </div>
      </div>
    </>
  );
}
