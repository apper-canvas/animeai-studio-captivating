import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-anime-surface rounded-xl border border-white/10 shadow-lg backdrop-blur-sm",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export default Card;