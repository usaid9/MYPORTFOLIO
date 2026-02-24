// import { useEffect, useRef, useState, useId } from 'react';
// import ShinyText from "../../components/ShinyText";

// export default function Navbar() {
//   const uniqueId = useId().replace(/:/g, '-');
//   const filterId = `glass-filter-${uniqueId}`;
//   const redGradId = `red-grad-${uniqueId}`;
//   const blueGradId = `blue-grad-${uniqueId}`;

//   const [svgSupported, setSvgSupported] = useState(false);

//   const containerRef = useRef(null);
//   const feImageRef = useRef(null);
//   const redChannelRef = useRef(null);
//   const greenChannelRef = useRef(null);
//   const blueChannelRef = useRef(null);
//   const gaussianBlurRef = useRef(null);
//   const debounceTimeoutRef = useRef(null);

//   const generateDisplacementMap = () => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     const actualWidth = rect?.width || 1200; // Assuming max-w-6xl ~1200px
//     const actualHeight = rect?.height || 80; // Approximate height with py-4
//     const edgeSize = Math.min(actualWidth, actualHeight) * (0.07 * 0.5);

//     const svgContent = `
//       <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
//             <stop offset="0%" stop-color="#0000"/>
//             <stop offset="100%" stop-color="red"/>
//           </linearGradient>
//           <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stop-color="#0000"/>
//             <stop offset="100%" stop-color="blue"/>
//           </linearGradient>
//         </defs>
//         <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
//         <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="16" fill="url(#${redGradId})" />
//         <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="16" fill="url(#${blueGradId})" style="mix-blend-mode: difference" />
//         <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="16" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(15px)" />
//       </svg>
//     `;

//     return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
//   };

//   const updateDisplacementMap = () => {
//     feImageRef.current?.setAttribute('href', generateDisplacementMap());
//   };

//   const debouncedUpdate = () => {
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current);
//     }
//     debounceTimeoutRef.current = setTimeout(() => {
//       updateDisplacementMap();
//     }, 100); // 100ms debounce
//   };

//   useEffect(() => {
//     updateDisplacementMap();
//     [
//       { ref: redChannelRef, offset: 0 },
//       { ref: greenChannelRef, offset: 10 },
//       { ref: blueChannelRef, offset: 20 }
//     ].forEach(({ ref, offset }) => {
//       if (ref.current) {
//         ref.current.setAttribute('scale', (-180 + offset).toString());
//         ref.current.setAttribute('xChannelSelector', 'R');
//         ref.current.setAttribute('yChannelSelector', 'G');
//       }
//     });

//     gaussianBlurRef.current?.setAttribute('stdDeviation', '0');
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const resizeObserver = new ResizeObserver(() => {
//       debouncedUpdate();
//     });

//     resizeObserver.observe(containerRef.current);

//     return () => {
//       resizeObserver.disconnect();
//       if (debounceTimeoutRef.current) {
//         clearTimeout(debounceTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setSvgSupported(supportsSVGFilters());
//   }, []);

//   const supportsSVGFilters = () => {
//     if (typeof window === 'undefined' || typeof document === 'undefined') {
//       return false;
//     }

//     const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
//     const isFirefox = /Firefox/.test(navigator.userAgent);

//     if (isWebkit || isFirefox) {
//       return false;
//     }

//     const div = document.createElement('div');
//     div.style.backdropFilter = `url(#${filterId})`;

//     return div.style.backdropFilter !== '';
//   };

//   return (
//     <nav
//       ref={containerRef}
//       className="fixed top-0 w-full z-50"
//       style={{
//         backdropFilter: svgSupported ? `url(#${filterId}) saturate(1)` : 'blur(15px)',
//         background: 'hsl(0 0% 0% / 0)',
//         boxShadow: `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
//            0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
//            0px 4px 16px rgba(17, 17, 26, 0.05),
//            0px 8px 24px rgba(17, 17, 26, 0.05),
//            0px 16px 56px rgba(17, 17, 26, 0.05),
//            0px 4px 16px rgba(17, 17, 26, 0.05) inset,
//            0px 8px 24px rgba(17, 17, 26, 0.05) inset,
//            0px 16px 56px rgba(17, 17, 26, 0.05) inset`
//       }}
//     >
//       <svg
//         className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
//             <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

//             <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
//             <feColorMatrix
//               in="dispRed"
//               type="matrix"
//               values="1 0 0 0 0
//                       0 0 0 0 0
//                       0 0 0 0 0
//                       0 0 0 1 0"
//               result="red"
//             />

//             <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
//             <feColorMatrix
//               in="dispGreen"
//               type="matrix"
//               values="0 0 0 0 0
//                       0 1 0 0 0
//                       0 0 0 0 0
//                       0 0 0 1 0"
//               result="green"
//             />

//             <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
//             <feColorMatrix
//               in="dispBlue"
//               type="matrix"
//               values="0 0 0 0 0
//                       0 0 0 0 0
//                       0 0 1 0 0
//                       0 0 0 1 0"
//               result="blue"
//             />

//             <feBlend in="red" in2="green" mode="screen" result="rg" />
//             <feBlend in="rg" in2="blue" mode="screen" result="output" />
//             <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
//           </filter>
//         </defs>
//       </svg>
//       <div className="max-w-6xl mx-auto flex justify-between px-6 py-4">
//         <span className="font-bold text-xl md:text-2xl">
//           <ShinyText
//             text="Usaid Ahmad"
//             speed={2}
//             delay={0}
//             color="#fff"
//             shineColor="#000f0f"
//             spread={120}
//             direction="left"
//             yoyo={false}
//             pauseOnHover={false}
//             disabled={false}
//           />
//         </span>
//         <div className="space-x-4">
//           {["about", "skills", "projects", "contact"].map((id) => (
//             <a key={id} href={`#${id}`} className="hover:text-[#1b6679]">
//               {id}
//             </a>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }
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