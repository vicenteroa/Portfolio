// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable */

"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  HTMLMotionProps,
} from "framer-motion";
import React, { useRef, forwardRef } from "react";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

export interface DockProps
  extends Omit<HTMLMotionProps<"div">, "onAnimationStart">,
    VariantProps<typeof dockVariants> {
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
}

const Dock = forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<HTMLMotionProps<"div">, "onAnimationStart"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
}

const DockIcon = forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      size, // eslint-disable-next-line no-unused-vars
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      mouseX,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const iconRef = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(
      mouseX || new MotionValue(Infinity),
      (val: number) => {
        const bounds = iconRef.current?.getBoundingClientRect() ?? {
          x: 0,
          width: 0,
        };
        return val - bounds.x - bounds.width / 2;
      },
    );

    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [40, magnification, 40],
    );

    const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    return (
      <motion.div
        ref={(node) => {
          iconRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{ width }}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
