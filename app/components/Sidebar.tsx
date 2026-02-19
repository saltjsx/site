"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  House,
  User,
  LinkSimple,
  Article,
  Sun,
  Moon,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/", label: "home", icon: House },
  { href: "/about", label: "about", icon: User },
  { href: "/links", label: "links", icon: LinkSimple },
  { href: "/blog", label: "blog", icon: Article },
];

const ITEM_HEIGHT = "h-10";
const ICON_SIZE = 13;

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex ${ITEM_HEIGHT} w-full items-center gap-2 pl-4 text-xs transition-colors duration-150 ${
        isActive
          ? "text-foreground underline underline-offset-4 decoration-orange-500"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <Icon size={ICON_SIZE} weight={isActive ? "fill" : "regular"} />
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-28 flex-col items-center border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <Link
        href="/"
        className={`flex ${ITEM_HEIGHT} w-full items-center pl-4 transition-colors hover:bg-accent`}
      >
        {mounted ? (
          <Image
            src={isDark ? "/salt-full-dark.svg" : "/salt-full.svg"}
            alt="Logo"
            width={48}
            height={14}
          />
        ) : (
          <Image src="/salt-full.svg" alt="Logo" width={48} height={14} />
        )}
      </Link>

      <Separator />

      {/* Nav items */}
      <nav className="flex w-full flex-col">
        {navItems.map(({ href, label, icon }, index) => (
          <div key={href} className="flex w-full flex-col">
            <NavItem
              href={href}
              label={label}
              icon={icon}
              isActive={pathname === href}
            />
            {index < navItems.length - 1 && <Separator />}
          </div>
        ))}
      </nav>

      <Separator />

      {/* Spacer */}
      <div className="flex-1" />

      <Separator />

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`flex ${ITEM_HEIGHT} w-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground`}
      >
        {mounted ? (
          isDark ? <Sun size={ICON_SIZE} /> : <Moon size={ICON_SIZE} />
        ) : (
          <Moon size={ICON_SIZE} />
        )}
      </button>
    </aside>
  );
}
