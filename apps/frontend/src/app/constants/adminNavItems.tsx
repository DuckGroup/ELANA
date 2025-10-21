import { LayoutDashboard, Package, ClipboardList } from "lucide-react";

export const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "All products", href: "/admin/products", icon: Package },
  { name: "Order list", href: "/admin/orders", icon: ClipboardList },
];
