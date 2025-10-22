import { Icon as LucideIcon } from "lucide-react";
import Link from "next/link";
import { ComponentType } from "react";
type Props = {
  href: string;
  size: "sm" | "md" | "lg"; 
  icon: ComponentType<{ className?: string }>;
};

export const IconButton = ({ size = "md", href, icon: Icon }: Props) => {
    const sizeStyles = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};
  return (
    <Link href={href}>
      <Icon className={sizeStyles[size]} />
    </Link>
  );
};
