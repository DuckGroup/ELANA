import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { IconButton } from "./iconButton";
import Link from "next/link";

export const Header = () => {
  return (
    <nav className="flex justify-between px-4 py-2 w-full items-center">
      <IconButton size="md" href="/profile" icon={User}></IconButton>
      <Link href="/">
      <Image src="/elana_logo.svg" alt="logo" width="163" height="80"></Image>
      </Link>
      <IconButton size="md" href="#" icon={ShoppingCart}></IconButton>
    </nav>
  );
};