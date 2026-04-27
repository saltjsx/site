"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import Dither from "./components/Dither";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const { resolvedTheme } = useTheme();
  const bgColor: [number, number, number] =
    resolvedTheme === "light" ? [1, 1, 1] : [0, 0, 0];

  return (
    <main className="relative flex-1 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        className="absolute inset-0"
      >
        <Dither
          waveColor={[0.047058823529411764, 0.3137254901960784, 1]}
          bgColor={bgColor}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.3}
          colorNum={4.3}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.25}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 z-10 flex flex-col items-start px-8 py-12 text-left sm:px-16 sm:py-20">
        <h1 className="font-pixel text-7xl leading-none lowercase tracking-wide text-[#1c1c1c] sm:text-9xl md:text-[10rem] dark:text-[#eeeeee]">
          saltjsx
        </h1>

        <h2 className="mt-4 font-pixel text-3xl lowercase tracking-wide text-[#1c1c1c]/80 sm:text-5xl dark:text-[#eeeeee]/80">
          dev &amp; designer
        </h2>

        <p className="mt-8 max-w-xl text-xl text-[#1c1c1c]/90 sm:text-2xl dark:text-[#eeeeee]/90">
          i&apos;m salt, a web dev and designer from{" "}
          <span aria-label="Australia" role="img">
            🇦🇺
          </span>
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="border border-[#1c1c1c] bg-transparent px-7 py-3.5 text-base text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-[#eeeeee] sm:text-lg dark:border-[#eeeeee] dark:text-[#eeeeee] dark:hover:bg-[#eeeeee] dark:hover:text-[#1c1c1c]"
          >
            About Me
          </Link>
          <Link
            href="/design"
            className="border border-[#0c50ff] bg-[#0c50ff] px-7 py-3.5 text-base text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff] sm:text-lg"
          >
            Design
          </Link>
        </div>
      </div>
    </main>
  );
}
