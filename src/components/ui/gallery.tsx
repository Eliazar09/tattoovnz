import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

type Direction = "left" | "right";

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) throw new Error("Min value should be less than max value");
  return Math.random() * (max - min) + min;
}

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 0 2px rgba(212,175,55,0.15)" }}
      >
        <img
          className="rounded-3xl object-cover w-full h-full"
          style={{ position: "absolute", inset: 0 }}
          src={src}
          alt={alt}
          draggable={false}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, (animationDelay + 0.4) * 1000);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  const photos = [
    {
      id: 2,
      order: 0,
      x: "-240px",
      y: "28px",
      zIndex: 40,
      direction: "left" as Direction,
      src: "/gallery-2.png",
    },
    {
      id: 3,
      order: 1,
      x: "-80px",
      y: "10px",
      zIndex: 30,
      direction: "right" as Direction,
      src: "/gallery-3.png",
    },
    {
      id: 4,
      order: 2,
      x: "80px",
      y: "22px",
      zIndex: 20,
      direction: "right" as Direction,
      src: "/gallery-4.png",
    },
    {
      id: 5,
      order: 3,
      x: "240px",
      y: "40px",
      zIndex: 10,
      direction: "left" as Direction,
      src: "/gallery-5.png",
    },
  ];

  return (
    <div className="mt-8 relative">
      <div className="relative mb-8 h-[350px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={`Miami Stylls trabajo ${photo.id}`}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="flex w-full justify-center mt-4">
        <a
          href="/portfolio"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)",
            color: "#0A0A0A",
            boxShadow: "0 4px 18px rgba(212,175,55,0.35)",
          }}
        >
          Ver todos los trabajos
        </a>
      </div>
    </div>
  );
};
