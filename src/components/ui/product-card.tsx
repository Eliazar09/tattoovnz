import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "../../lib/utils";

interface ServiceHighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

export const ServiceHighlightCard = React.forwardRef<
  HTMLDivElement,
  ServiceHighlightCardProps
>(
  (
    {
      className,
      categoryIcon,
      category,
      title,
      description,
      price,
      imageSrc,
      imageAlt = "",
      href,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(175);
    const mouseY = useMotionValue(175);

    const handleMouseMove = ({
      clientX,
      clientY,
      currentTarget,
    }: React.MouseEvent) => {
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      rotateXRaw.set(clientY - top);
      rotateYRaw.set(clientX - left);
      const w = width || 350;
      const h = height || 320;
      glowXPct.set(((clientX - left) / w) * 100);
      glowYPct.set(((clientY - top) / h) * 100);
      glowOpacity.set(0.55);
    };

    const rotateXRaw = useMotionValue(175);
    const rotateYRaw = useMotionValue(175);

    const rotateX = useTransform(rotateXRaw, [0, 320], [8, -8]);
    const rotateY = useTransform(rotateYRaw, [0, 350], [-8, 8]);

    const springConfig = { stiffness: 280, damping: 22 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowXPct = useMotionValue(50);
    const glowYPct = useMotionValue(50);
    const glowOpacity = useMotionValue(0);

    const glowBackground = useMotionTemplate`radial-gradient(100px at ${glowXPct}% ${glowYPct}%, rgba(212,175,55,0.45), transparent 65%)`;

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(175);
          mouseY.set(175);
          rotateXRaw.set(175);
          rotateYRaw.set(175);
          glowOpacity.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-[320px] w-full rounded-2xl cursor-default shadow-xl transition-shadow duration-300 hover:shadow-2xl",
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
      >
        {/* Inner container — elevated layer */}
        <div
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
            background: "#111111",
            border: "1px solid rgba(212,175,55,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
          className="absolute inset-0 rounded-2xl overflow-hidden"
        >
          {/* Subtle grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

          {/* Mouse-follow glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ opacity: glowOpacity, background: glowBackground }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Top — icon + category */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.15)" }}
              >
                <span style={{ color: "#D4AF37" }}>{categoryIcon}</span>
              </div>
              <span
                className="text-xs font-medium font-body tracking-widest uppercase"
                style={{ color: "rgba(212,175,55,0.7)" }}
              >
                {category}
              </span>
            </div>

            {/* Middle — title + price + description */}
            <div>
              <h3
                className="font-display italic text-3xl leading-tight mb-1"
                style={{ color: "#FFFFFF" }}
              >
                {title}
              </h3>
              <p
                className="font-display italic text-2xl mb-2"
                style={{ color: "#D4AF37" }}
              >
                {price}
              </p>
              <p
                className="text-xs font-body leading-relaxed max-w-[65%]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {description}
              </p>
            </div>

            {/* Bottom — book button */}
            <div>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-body text-xs font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)",
                    color: "#0A0A0A",
                    boxShadow: "0 3px 12px rgba(212,175,55,0.3)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Reservar
                </a>
              ) : null}
            </div>
          </div>

          {/* Floating service image — bottom-right */}
          {imageSrc && (
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              style={{ transform: "translateZ(50px)" }}
              whileHover={{ scale: 1.08, y: -12, x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -right-8 -bottom-8 h-44 w-44 object-cover rounded-2xl pointer-events-none"
              style={{
                transform: "translateZ(50px)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.2)",
                opacity: 0.85,
              }}
              loading="lazy"
            />
          )}
        </div>
      </motion.div>
    );
  }
);

ServiceHighlightCard.displayName = "ServiceHighlightCard";
