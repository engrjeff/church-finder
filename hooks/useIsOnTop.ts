import { useEffect, useState } from "react";

export default function useIsOnTop(threshold: number = 80) {
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    const scrollCallback = () => {
      const scrolledFromTop = window.scrollY;
      setOnTop(scrolledFromTop <= threshold);
    };
    window.addEventListener("scroll", scrollCallback);
    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, [threshold]);

  return onTop;
}
