import Image from "next/image";
import {
  CodeIcon,
  LightningIcon,
  PenNibIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function About() {
  return (
    <main className="relative flex-1 px-8 py-16 sm:px-16 sm:py-24">
      <h1 className="font-pixel text-6xl leading-none lowercase tracking-wide text-foreground sm:text-8xl">
        About
      </h1>

      <div className="mt-10 max-w-2xl space-y-5 text-lg text-foreground/90 sm:text-xl">
        <p>
          hi! i&apos;m salt, a{" "}
          <span className="inline-flex items-center gap-1.5 align-middle">
            <CodeIcon size={20} weight="regular" className="inline-block" />
            dev
          </span>{" "}
          based in{" "}
          <span aria-label="Australia" role="img">
            🇦🇺
          </span>
          , originally from{" "}
          <span aria-label="United States" role="img">
            🇺🇸
          </span>
        </p>

        <p>
          i&apos;m the cto of{" "}
          <a
            href="https://clovrlabs.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 align-middle border-b border-[#0c50ff] text-[#0c50ff] transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
          >
            <Image
              src="/clovrlabs.svg"
              alt=""
              width={20}
              height={20}
              className="inline-block"
            />
            clovr labs
          </a>
        </p>

        <p>
          i also{" "}
          <span className="inline-flex items-center gap-1.5 align-middle">
            <PenNibIcon size={20} weight="regular" className="inline-block" />
            design
          </span>{" "}
          sites and logos (available for client work!)
        </p>

        <p>
          i love making sites as{" "}
          <span className="inline-flex items-center gap-1.5 align-middle">
            <LightningIcon
              size={20}
              weight="fill"
              className="inline-block text-[#0c50ff]"
            />
            fast
          </span>{" "}
          as possible, and making them{" "}
          <span className="inline-flex items-center gap-1.5 align-middle">
            <SparkleIcon
              size={20}
              weight="fill"
              className="inline-block text-[#0c50ff]"
            />
            look good
          </span>
        </p>
      </div>
    </main>
  );
}
