import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';  
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 8,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const textY = useSpring(20);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scroll animation for mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scrollTextY = useTransform(scrollYProgress, [0.2, 0.5], [20, 0]);
  const scrollScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1.02, 0.95]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      console.log('Mobile check:', mobile, 'Width:', window.innerWidth);
    };
    
    // Check immediately
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    // Also check with matchMedia for better DevTools support
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
      console.log('Media query mobile:', e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  function handleMouse(e) {
    if (!ref.current || isMobile) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (isMobile) return;
    scale.set(scaleOnHover);
    opacity.set(1);
    textY.set(0);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    textY.set(20);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:1000px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] overflow-hidden rounded-[15px]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: isMobile ? scrollScale : scale
        }}
      >
        {/* IMAGE */}
        <motion.img
          src={imageSrc}
          alt={altText}
          onLoad={() => setImageLoaded(true)}
          onError={() => console.error('Image failed to load')}
          className={`absolute top-0 left-0 object-cover w-full h-full will-change-transform [transform:translateZ(0)] ${imageLoaded ? '' : 'opacity-0'}`}
          style={{
            filter: 'brightness(0.85)',
          }}
        />

        {/* DARK OVERLAY */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-black/50 backdrop-blur-[2px]"
          style={{
            zIndex: 2,
            opacity: isMobile ? scrollOpacity : opacity
          }}
        />

        {/* SUBTLE VIGNETTE */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)',
          }}
        />

        {/* OVERLAY CONTENT - CENTERED */}
        {displayOverlayContent && overlayContent && (
          <motion.div 
            className="absolute inset-0 z-[4] flex items-center justify-center px-4 will-change-transform"
            style={{
              opacity: isMobile ? scrollOpacity : opacity,
              y: isMobile ? scrollTextY : textY,
              transform: isMobile ? 'none' : 'translateZ(40px)'
            }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showMobileWarning && isMobile && (
        <div className="absolute bottom-4 text-white text-sm z-10">Scroll to see the effect!</div>
      )}

      {showTooltip && !isMobile && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}