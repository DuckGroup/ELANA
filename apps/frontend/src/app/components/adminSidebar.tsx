"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "../constants/adminNavItems";


export const AdminSidebar = ()=> {
  const pathname = usePathname();

  const linkClasses = (isActive: boolean) =>
    [
      "flex items-center gap-3 w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out",
      isActive
        ? "bg-stone-700 text-white"
        : "text-stone-600 hover:bg-stone-200 hover:text-stone-800 hover:scale-[1.02]",
    ].join(" ");

  return (
    <aside className="hidden md:flex flex-col items-center gap-10 p-6 bg-stone-50 min-h-screen w-64 border-r border-stone-200 shadow-sm">
      <div className="mt-4 mb-6">
        <Image src="/elana_logo.svg" alt="Elana logo" width={160} height={80} />
      </div>

      <nav className="flex flex-col gap-4 w-full">
        {adminNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={linkClasses(isActive)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
