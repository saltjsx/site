"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className="flex w-full border-b border-border bg-background"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease }}
        className="flex items-center justify-center border-r border-border px-5 py-3"
      >
        <Image
          src="/salt.svg"
          alt="Salt"
          width={28}
          height={28}
          className="dark:invert"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
        className="flex flex-1 items-center border-r border-border px-5 py-3"
      >
        <Link
          href="/"
          className="font-pixel text-2xl lowercase tracking-wide text-foreground"
        >
          saltjsx
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35, ease }}
        className="flex items-center border-r border-border"
      >
        <Link
          href="/about"
          className="flex h-full items-center px-5 py-3 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
        >
          about
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.38, ease }}
        className="flex items-center border-r border-border"
      >
        <Link
          href="/design"
          className="flex h-full items-center px-5 py-3 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
        >
          design
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease }}
        className="flex items-center border-r border-border"
      >
        <Link
          href="/links"
          className="flex h-full items-center px-5 py-3 text-sm lowercase tracking-wide text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
        >
          links
        </Link>
      </motion.div>

      <motion.button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center px-5 py-3 text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
      >
        {mounted ? (
          isDark ? (
            <SunIcon size={20} weight="regular" />
          ) : (
            <MoonIcon size={20} weight="regular" />
          )
        ) : (
          <span className="block h-5 w-5" />
        )}
      </motion.button>
    </motion.nav>
  );
}
