import { useRef } from "react";

const useScroll = (): [React.MutableRefObject<any>, () => void] => {
  const ref = useRef(null);
  // @ts-ignore
  const scrollToRef = () => ref.current.scrollIntoView({ behavior: "smooth" });

  return [ref, scrollToRef];
};

export default useScroll;
