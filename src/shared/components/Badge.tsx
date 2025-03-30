import { FC } from "react";
import cn from "../utils/cn";

type BadgeProps = {
  variant?: "outline" | "default";
  color?: "success" | "warning" | "error" | "info" | "ghost";
  children: React.ReactNode;
  className?: string;
};

export const Badge: FC<BadgeProps> = ({
  variant = "default",
  color = "info",
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-md text-sm uppercase font-bold px-3 py-1 w-min h-8 flex items-center justify-center transition-opacity duration-300 cursor-pointer",
        {
          success: "bg-lime-400/80 text-white",
          warning: "bg-orange-600 text-white",
          error: "bg-red-600 text-white",
          info: "bg-blue-600 text-white",
          ghost: "bg-gray-400 text-white",
        }[color],
        {
          "border border-gray-300 text-gray-700 bg-transparent":
            variant === "outline",
          "text-gray-700": color === "success",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
