import ShinyText from "../../components/ShinyText";


export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur">
      <div className="max-w-6xl mx-auto flex justify-between px-6 py-4">
        <span className="font-bold text-xl md:text-2xl"> <ShinyText
          text="Usaid Ahmad"
          speed={2}
          delay={0}
          color="#fff"
          shineColor="#000f0f"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
        /></span>
        <div className="space-x-3 ">
          {["skills", "projects", "contact"].map((id) => (
            <a key={id} href={`#${id}`} className="hover:text-[#1b6679]">
              {id}
            </a>
          ))}
        </div>
      </div>
    </nav >
  );
}