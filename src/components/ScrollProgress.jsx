import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);
      setWidth(scrolled * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{ width: `${width}%` }}
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
    />
  );
}
