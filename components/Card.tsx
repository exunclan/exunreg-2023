import Image from "next/image";

export default function Card({
  link,
  image,
  name,
  summary,
}: {
  link: string;
  image: string;
  name: string;
  summary: string;
}) {
  return (
    <a href={link} className="w-3/4 lg:w-1/3 md:h-[15rem] my-4 md:m-4">
      <div className="flex flex-col md:flex-row items-center justify-center rounded-lg shadow-md w-full h-full">
        <div className="flex flex-col justify-center items-center p-4">
          <Image
            className="mx-12 my-10"
            src={image}
            alt={name}
            height={175}
            width={175}
          />
        </div>
        <div className="flex flex-col justify-center rounded-r-lg bg-light-blue h-full w-full py-8 pl-6 md:pl-12 pr-6">
          <div className="text-accent text-xl font-semibold mb-2">{name}</div>
          {/* <div className="text-sm text-accent">{summary}</div> */}
        </div>
      </div>
    </a>
  );
}
