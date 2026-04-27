"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const productShots = [
  {
    src: "/design/median-screenshot.png",
    alt: "Median — feedback engine product design",
  },
  {
    src: "/design/whirl-screenshot.png",
    alt: "Whirl — chat product design",
  },
];

const logos = [
  { src: "/design/median.svg", alt: "Median" },
  { src: "/design/whirl.svg", alt: "Whirl" },
  { src: "/design/clovrlabs.svg", alt: "Clovr Labs" },
  { src: "/design/salt.svg", alt: "Salt" },
  { src: "/design/portalnew.svg", alt: "Portal" },
  { src: "/design/tripwire.svg", alt: "Tripwire" },
];

export default function Design() {
  return (
    <main className="relative flex-1">
      <Hero />
      <ProductDesign />
      <LogoDesign />
      <Pricing />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-8 py-16 sm:px-16 sm:py-24">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="font-pixel text-6xl leading-none lowercase tracking-wide text-foreground sm:text-8xl"
      >
        Design
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="mt-8 max-w-2xl text-lg text-foreground/90 sm:text-xl"
      >
        i do product design, and logo design for clients
      </motion.p>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <motion.a
          variants={fadeUp}
          transition={{ duration: 0.5, ease }}
          href="#product-design"
          className="border border-[#1c1c1c] bg-transparent px-6 py-3 text-base text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-[#eeeeee] dark:border-[#eeeeee] dark:text-[#eeeeee] dark:hover:bg-[#eeeeee] dark:hover:text-[#1c1c1c]"
        >
          Product Design
        </motion.a>
        <motion.a
          variants={fadeUp}
          transition={{ duration: 0.5, ease }}
          href="#logo-design"
          className="border border-[#1c1c1c] bg-transparent px-6 py-3 text-base text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-[#eeeeee] dark:border-[#eeeeee] dark:text-[#eeeeee] dark:hover:bg-[#eeeeee] dark:hover:text-[#1c1c1c]"
        >
          Logo Design
        </motion.a>
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/quote"
            className="inline-block border border-[#0c50ff] bg-[#0c50ff] px-6 py-3 text-base text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff]"
          >
            Get a Quote
          </Link>
        </motion.span>
      </motion.div>
    </section>
  );
}

function ProductDesign() {
  return (
    <section
      id="product-design"
      className="relative border-t border-border px-8 py-16 sm:px-16 sm:py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="font-pixel text-4xl leading-none lowercase tracking-wide text-foreground sm:text-6xl"
      >
        Product Design
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="grainy-gradient-blue relative mt-12 overflow-hidden"
      >
        <div className="relative flex flex-col gap-16 px-8 py-20 sm:gap-20 sm:px-16 sm:py-28 lg:px-24 lg:py-32">
          {productShots.map((shot, i) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
              className="group relative"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={2400}
                height={1500}
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function LogoDesign() {
  return (
    <section
      id="logo-design"
      className="relative border-t border-border px-8 py-16 sm:px-16 sm:py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="font-pixel text-4xl leading-none lowercase tracking-wide text-foreground sm:text-6xl"
      >
        Logo Design
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.06, delayChildren: 0.15 }}
        className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3"
      >
        {logos.map((logo) => (
          <motion.div
            key={logo.src}
            variants={fadeUp}
            transition={{ duration: 0.5, ease }}
            className="group relative flex aspect-square items-center justify-center bg-background transition-colors duration-300 hover:bg-[#0c50ff]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo-monochrome h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-border px-8 py-16 sm:px-16 sm:py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="font-pixel text-4xl leading-none lowercase tracking-wide text-foreground sm:text-6xl"
      >
        Pricing
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05, ease }}
        className="mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg"
      >
        interested? fill out this form and get an instant quote to get started.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="mt-10"
      >
        <Link
          href="/quote"
          className="group inline-flex items-center gap-2 border border-[#0c50ff] bg-[#0c50ff] px-7 py-3.5 text-base text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff]"
        >
          Get an instant quote
          <ArrowRightIcon
            size={18}
            weight="regular"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </section>
  );
}
