import React, { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";
import mergeNames from "@/util/mergeNames";

const ScrollTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
      // else !setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="fixed bottom-[60px] right-[50px]">
      <button
        onClick={top}
        className={mergeNames(
          "bg-blue-600 rounded-full py-3 px-4",
          "transition-all duration-400 ease-in-out",
          !scrolled ? "opacity-0" : "opacity-100",
          !scrolled ? "translate-y-[100px]" : "translate-y-[0px]"
        )}
      >
        <HiArrowUp color="white" size={20} />
      </button>
    </div>
  );
};

export default ScrollTop;
