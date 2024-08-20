"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "../_lib/utils";

export const ScrollTop: React.FC<ButtonProps> = ({
  variant = "outline",
  size = "icon",
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={variant}
      className={cn(
        "fixed bottom-4 right-4 bg-background transition z-50",
        show ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
};
