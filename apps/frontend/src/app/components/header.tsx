import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
export const Header = () => {
  return (
    <nav className="flex justify-between px-6 py-6 w-full items-center">
      <User size={32}></User>
      <Image src="/elana_logo.svg" alt="logo" width="163" height="80"></Image>
      <ShoppingCart size={32}></ShoppingCart>
    </nav>
  );
};
