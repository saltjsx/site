"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BrowsersIcon,
  ChartBarIcon,
  CheckIcon,
  DiscordLogoIcon,
  EnvelopeSimpleIcon,
  MinusIcon,
  PackageIcon,
  PaintBrushIcon,
  PenNibIcon,
  PlusIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Service = "logo" | "product";
type LogoType = "svg" | "brandkit";
type ProductType = "landing" | "dashboard";
type ContactMethod = "discord" | "email";

type FormState = {
  name: string;
  service: Service | null;
  logoType: LogoType | null;
  productType: ProductType | null;
  extraIterations: number;
  extraPages: number;
  brief: string;
  contactMethod: ContactMethod | null;
  contact: string;
};

const initialState: FormState = {
  name: "",
  service: null,
  logoType: null,
  productType: null,
  extraIterations: 0,
  extraPages: 0,
  brief: "",
  contactMethod: null,
  contact: "",
};

export default function QuotePage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const steps = useMemo(() => buildSteps(form), [form]);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const goNext = () => {
    if (isLast) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const restart = () => {
    setDirection(-1);
    setForm(initialState);
    setStep(0);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const total = computeTotal(form);
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <main className="relative flex flex-1 flex-col">
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
        <div
          className="pointer-events-none absolute left-0 top-0 h-px bg-[#0c50ff] transition-[width] duration-500"
          style={{ width: `${progress}%`, willChange: "width" }}
        />

        <div className="flex items-center justify-between border-b border-border px-6 py-3 sm:px-10">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="group flex items-center gap-2 text-sm lowercase text-foreground/70 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeftIcon
              size={16}
              weight="regular"
              className="transition-transform group-hover:-translate-x-0.5"
            />
            back
          </button>
          <span className="font-mono text-xs lowercase tracking-wide text-foreground/60">
            {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative min-h-[560px] px-6 py-12 sm:px-10 sm:py-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.45, ease }}
              className="mx-auto max-w-3xl"
            >
              {current.id === "name" && (
                <NameStep
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  onSubmit={goNext}
                />
              )}

              {current.id === "service" && (
                <ChoiceStep
                  eyebrow={form.name ? `nice to meet you, ${form.name.toLowerCase()}` : "what are we making"}
                  question="what do you need?"
                  helper="pick the service you're interested in. you can change this later."
                  options={[
                    {
                      value: "logo",
                      label: "logo design",
                      sub: "marks, wordmarks, brand kits",
                      icon: <PenNibIcon size={28} weight="regular" />,
                    },
                    {
                      value: "product",
                      label: "product design",
                      sub: "landing pages, dashboards, apps",
                      icon: <SparkleIcon size={28} weight="regular" />,
                    },
                  ]}
                  selected={form.service}
                  onSelect={(v) => {
                    update("service", v as Service);
                    update("logoType", null);
                    update("productType", null);
                    update("extraIterations", 0);
                    update("extraPages", 0);
                    setTimeout(goNext, 180);
                  }}
                />
              )}

              {current.id === "logoType" && (
                <ChoiceStep
                  eyebrow="logo design"
                  question="just the logo, or the full kit?"
                  helper="2 iterations included with both options."
                  options={[
                    {
                      value: "svg",
                      label: "svg logo only",
                      sub: "vector mark, ready to drop in",
                      price: "$75",
                      icon: <PaintBrushIcon size={28} weight="regular" />,
                    },
                    {
                      value: "brandkit",
                      label: "brand kit",
                      sub: "logo, colors, type, usage guide",
                      price: "$100",
                      icon: <PackageIcon size={28} weight="regular" />,
                    },
                  ]}
                  selected={form.logoType}
                  onSelect={(v) => {
                    update("logoType", v as LogoType);
                    setTimeout(goNext, 180);
                  }}
                />
              )}

              {current.id === "productType" && (
                <ChoiceStep
                  eyebrow="product design"
                  question="what kind of product?"
                  helper="landing pages can grow with extra pages. dashboards are flat-rate."
                  options={[
                    {
                      value: "landing",
                      label: "landing page",
                      sub: "marketing site, hero to footer",
                      price: "$250",
                      icon: <BrowsersIcon size={28} weight="regular" />,
                    },
                    {
                      value: "dashboard",
                      label: "product / dashboard",
                      sub: "app ui, dashboards, complex flows",
                      price: "$500",
                      icon: <ChartBarIcon size={28} weight="regular" />,
                    },
                  ]}
                  selected={form.productType}
                  onSelect={(v) => {
                    update("productType", v as ProductType);
                    setTimeout(goNext, 180);
                  }}
                />
              )}

              {current.id === "iterations" && (
                <CounterStep
                  eyebrow="logo design"
                  question="need extra iterations?"
                  helper="2 rounds are included. extras are $10 each — most folks don't need them."
                  unit="extra iteration"
                  unitPlural="extra iterations"
                  pricePerUnit={10}
                  value={form.extraIterations}
                  onChange={(v) => update("extraIterations", v)}
                  onContinue={goNext}
                  baseLabel="2 included"
                />
              )}

              {current.id === "pages" && (
                <CounterStep
                  eyebrow="product design"
                  question="any extra pages?"
                  helper="the base landing page covers one route. add more pages at $25 each."
                  unit="extra page"
                  unitPlural="extra pages"
                  pricePerUnit={25}
                  value={form.extraPages}
                  onChange={(v) => update("extraPages", v)}
                  onContinue={goNext}
                  baseLabel="1 page included"
                />
              )}

              {current.id === "brief" && (
                <BriefStep
                  value={form.brief}
                  onChange={(v) => update("brief", v)}
                  onSubmit={goNext}
                />
              )}

              {current.id === "contactMethod" && (
                <ChoiceStep
                  eyebrow="almost done"
                  question="how should i reach you?"
                  helper="pick whichever you check more often."
                  options={[
                    {
                      value: "discord",
                      label: "discord",
                      sub: "fastest. dm me directly.",
                      icon: <DiscordLogoIcon size={28} weight="regular" />,
                    },
                    {
                      value: "email",
                      label: "email",
                      sub: "good for longer briefs",
                      icon: <EnvelopeSimpleIcon size={28} weight="regular" />,
                    },
                  ]}
                  selected={form.contactMethod}
                  onSelect={(v) => {
                    update("contactMethod", v as ContactMethod);
                    update("contact", "");
                    setTimeout(goNext, 180);
                  }}
                />
              )}

              {current.id === "contact" && (
                <ContactStep
                  method={form.contactMethod!}
                  value={form.contact}
                  onChange={(v) => update("contact", v)}
                  onSubmit={goNext}
                />
              )}

              {current.id === "summary" && (
                <SummaryStep form={form} total={total} onRestart={restart} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function buildSteps(form: FormState) {
  const steps: { id: string }[] = [
    { id: "name" },
    { id: "service" },
  ];

  if (form.service === "logo") {
    steps.push({ id: "logoType" });
    if (form.logoType) steps.push({ id: "iterations" });
  } else if (form.service === "product") {
    steps.push({ id: "productType" });
    if (form.productType === "landing") steps.push({ id: "pages" });
  }

  steps.push({ id: "brief" });
  steps.push({ id: "contactMethod" });
  if (form.contactMethod) steps.push({ id: "contact" });
  steps.push({ id: "summary" });

  return steps;
}

function computeTotal(form: FormState) {
  let total = 0;
  if (form.service === "logo") {
    if (form.logoType === "svg") total += 75;
    if (form.logoType === "brandkit") total += 100;
    total += form.extraIterations * 10;
  } else if (form.service === "product") {
    if (form.productType === "landing") {
      total += 250 + form.extraPages * 25;
    }
    if (form.productType === "dashboard") total += 500;
  }
  return total;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#0c50ff]">
      <span className="h-px w-6 bg-[#0c50ff]" />
      {children}
    </span>
  );
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-4 font-pixel text-4xl leading-[1.05] lowercase tracking-wide text-foreground sm:text-6xl">
      {children}
    </h1>
  );
}

function Helper({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-xl text-base text-foreground/70 sm:text-lg">
      {children}
    </p>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className="group inline-flex items-center gap-2 border border-[#0c50ff] bg-[#0c50ff] px-6 py-3 text-sm lowercase tracking-wide text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0c50ff] disabled:hover:text-[#eeeeee] sm:text-base"
    >
      {children}
      <ArrowRightIcon
        size={16}
        weight="regular"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </motion.button>
  );
}

function NameStep({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const canContinue = value.trim().length > 0;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) onSubmit();
      }}
    >
      <Eyebrow>quote · 01</Eyebrow>
      <Question>hey there 👋 what's your name?</Question>
      <Helper>
        let's get a quote together. it'll take about a minute.
      </Helper>

      <div className="mt-10">
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="your name"
          className="w-full max-w-lg border-b border-border bg-transparent pb-3 font-pixel text-3xl lowercase text-foreground placeholder:text-foreground/30 focus:border-[#0c50ff] focus:outline-none sm:text-4xl"
        />
      </div>

      <div className="mt-10">
        <PrimaryButton type="submit" disabled={!canContinue}>
          continue
        </PrimaryButton>
      </div>
    </form>
  );
}

type Option = {
  value: string;
  label: string;
  sub: string;
  price?: string;
  icon: React.ReactNode;
};

function ChoiceStep({
  eyebrow,
  question,
  helper,
  options,
  selected,
  onSelect,
}: {
  eyebrow: string;
  question: string;
  helper?: string;
  options: Option[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Question>{question}</Question>
      {helper && <Helper>{helper}</Helper>}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {options.map((opt, idx) => {
          const active = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + idx * 0.06, ease }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-start gap-4 border p-6 text-left transition-colors ${
                active
                  ? "border-[#0c50ff] bg-[#0c50ff] text-[#eeeeee]"
                  : "border-border bg-transparent text-foreground hover:border-[#0c50ff]"
              }`}
            >
              <span
                className={`transition-colors ${
                  active ? "text-[#eeeeee]" : "text-foreground/80 group-hover:text-[#0c50ff]"
                }`}
              >
                {opt.icon}
              </span>
              <div className="flex w-full items-baseline justify-between gap-3">
                <span className="font-pixel text-2xl lowercase tracking-wide">
                  {opt.label}
                </span>
                {opt.price && (
                  <span
                    className={`font-mono text-sm ${
                      active ? "text-[#eeeeee]" : "text-[#0c50ff]"
                    }`}
                  >
                    {opt.price}
                  </span>
                )}
              </div>
              <span
                className={`text-sm ${
                  active ? "text-[#eeeeee]/80" : "text-foreground/60"
                }`}
              >
                {opt.sub}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function CounterStep({
  eyebrow,
  question,
  helper,
  unit,
  unitPlural,
  pricePerUnit,
  value,
  onChange,
  onContinue,
  baseLabel,
}: {
  eyebrow: string;
  question: string;
  helper: string;
  unit: string;
  unitPlural: string;
  pricePerUnit: number;
  value: number;
  onChange: (v: number) => void;
  onContinue: () => void;
  baseLabel: string;
}) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(Math.min(20, value + 1));

  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Question>{question}</Question>
      <Helper>{helper}</Helper>

      <div className="mt-10 flex flex-col items-start gap-8">
        <div className="flex items-center gap-6 border border-border p-3">
          <button
            type="button"
            onClick={dec}
            disabled={value === 0}
            aria-label="decrease"
            className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            <MinusIcon size={20} weight="regular" />
          </button>

          <div className="flex min-w-[120px] flex-col items-center">
            <motion.span
              key={value}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease }}
              className="font-pixel text-5xl text-foreground"
            >
              {value}
            </motion.span>
            <span className="mt-1 text-xs lowercase text-foreground/60">
              {value === 1 ? unit : unitPlural}
            </span>
          </div>

          <button
            type="button"
            onClick={inc}
            aria-label="increase"
            className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee]"
          >
            <PlusIcon size={20} weight="regular" />
          </button>
        </div>

        <div className="font-mono text-sm text-foreground/70">
          <span className="text-foreground/50">{baseLabel}</span>
          {value > 0 && (
            <>
              {" · "}
              <span className="text-[#0c50ff]">
                +${value * pricePerUnit}
              </span>
            </>
          )}
        </div>

        <PrimaryButton onClick={onContinue}>continue</PrimaryButton>
      </div>
    </div>
  );
}

function BriefStep({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const canContinue = value.trim().length >= 10;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) onSubmit();
      }}
    >
      <Eyebrow>tell me more</Eyebrow>
      <Question>what are we making?</Question>
      <Helper>
        a sentence or two is plenty. who's it for, what's the vibe, links to
        anything you love.
      </Helper>

      <div className="mt-10">
        <textarea
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="a portfolio site for a film photographer, minimal, lots of whitespace…"
          className="w-full resize-none border border-border bg-transparent p-4 text-base text-foreground placeholder:text-foreground/30 focus:border-[#0c50ff] focus:outline-none sm:text-lg"
        />
        <div className="mt-2 text-right font-mono text-xs text-foreground/40">
          {value.trim().length} chars
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton type="submit" disabled={!canContinue}>
          continue
        </PrimaryButton>
      </div>
    </form>
  );
}

function ContactStep({
  method,
  value,
  onChange,
  onSubmit,
}: {
  method: ContactMethod;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const isEmail = method === "email";
  const placeholder = isEmail ? "you@domain.com" : "yourhandle";
  const label = isEmail ? "your email" : "your discord username";
  const valid = isEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    : value.trim().length >= 2;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit();
      }}
    >
      <Eyebrow>{isEmail ? "email" : "discord"}</Eyebrow>
      <Question>{label}</Question>
      <Helper>
        i'll only use this to reply with your quote. no spam, ever.
      </Helper>

      <div className="mt-10 flex max-w-lg items-center gap-3 border-b border-border pb-3 focus-within:border-[#0c50ff]">
        <span className="text-foreground/50">
          {isEmail ? (
            <EnvelopeSimpleIcon size={22} weight="regular" />
          ) : (
            <DiscordLogoIcon size={22} weight="regular" />
          )}
        </span>
        <input
          autoFocus
          type={isEmail ? "email" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-2xl text-foreground placeholder:text-foreground/30 focus:outline-none sm:text-3xl"
        />
      </div>

      <div className="mt-10">
        <PrimaryButton type="submit" disabled={!valid}>
          see my quote
        </PrimaryButton>
      </div>
    </form>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function SummaryStep({
  form,
  total,
  onRestart,
}: {
  form: FormState;
  total: number;
  onRestart: () => void;
}) {
  const lines = buildSummaryLines(form);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isDiscord = form.contactMethod === "discord";

  const submitToDiscord = async () => {
    if (status === "submitting" || status === "success") return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "something went wrong");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "something went wrong");
    }
  };

  const mailtoBody = encodeURIComponent(
    [
      `hi salt — i'd like a quote.`,
      ``,
      `name: ${form.name}`,
      ...lines.map((l) => `${l.label}: ${l.value}`),
      `total: $${total} usd`,
      ``,
      `brief:`,
      form.brief,
    ].join("\n"),
  );
  const subject = encodeURIComponent(`quote request — ${form.name}`);
  const mailtoHref = `mailto:me@saltjsx.com?subject=${subject}&body=${mailtoBody}`;

  if (status === "success") {
    return <ConfirmationScreen form={form} total={total} onRestart={onRestart} />;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
    >
      <Eyebrow>your quote</Eyebrow>
      <Question>
        thanks{form.name ? `, ${form.name.toLowerCase()}` : ""} ✦ here's the damage
      </Question>
      <Helper>
        review below, then ping me to lock it in. send a copy of this summary in
        your message and we'll move fast.
      </Helper>

      <div className="mt-10 border border-border">
        <div className="grainy-gradient-blue relative flex items-center justify-between px-6 py-6 text-[#eeeeee]">
          <span className="relative z-10 font-mono text-xs uppercase tracking-[0.18em] opacity-80">
            estimated total
          </span>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="relative z-10 font-pixel text-5xl tracking-wide sm:text-6xl"
          >
            ${total} <span className="text-2xl opacity-80 sm:text-3xl">usd</span>
          </motion.span>
        </div>

        <ul className="divide-y divide-border">
          {lines.map((line) => (
            <li
              key={line.label}
              className="flex items-baseline justify-between gap-4 px-6 py-4"
            >
              <span className="text-sm lowercase text-foreground/60">
                {line.label}
              </span>
              <span className="text-right text-sm text-foreground sm:text-base">
                {line.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-start gap-3 border border-[#0c50ff]/30 bg-[#0c50ff]/5 px-5 py-4">
        <SparkleIcon
          size={20}
          weight="fill"
          className="mt-0.5 shrink-0 text-[#0c50ff]"
        />
        <p className="text-sm text-foreground/80">
          payment in <span className="text-[#0c50ff]">solana</span> only. wallet
          address shared once we lock the brief.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {isDiscord ? (
          <motion.button
            type="button"
            onClick={submitToDiscord}
            disabled={status === "submitting"}
            whileTap={status === "submitting" ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center gap-2 border border-[#0c50ff] bg-[#0c50ff] px-6 py-3 text-sm lowercase tracking-wide text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#0c50ff] disabled:hover:text-[#eeeeee] sm:text-base"
          >
            {status === "submitting" ? (
              <>
                sending
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  className="inline-block h-3 w-3 rounded-full border border-[#eeeeee] border-t-transparent"
                />
              </>
            ) : (
              <>
                send via discord
                <DiscordLogoIcon size={16} weight="regular" />
              </>
            )}
          </motion.button>
        ) : (
          <a
            href={mailtoHref}
            className="group inline-flex items-center gap-2 border border-[#0c50ff] bg-[#0c50ff] px-6 py-3 text-sm lowercase tracking-wide text-[#eeeeee] transition-colors hover:bg-transparent hover:text-[#0c50ff] sm:text-base"
          >
            send via email
            <ArrowRightIcon
              size={16}
              weight="regular"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="text-sm lowercase text-foreground/70 underline-offset-4 transition-colors hover:text-[#0c50ff] hover:underline"
        >
          start over
        </button>
      </div>

      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="mt-4 text-sm text-red-500"
          >
            couldn't send: {errorMsg}. try email instead, or dm saltjsx on discord.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ConfirmationScreen({ form }: { form: FormState; total: number; onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="flex h-20 w-20 items-center justify-center border border-[#0c50ff] bg-[#0c50ff] text-[#eeeeee]"
      >
        <CheckIcon size={36} weight="regular" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.2 }}
        className="mt-8 font-pixel text-4xl lowercase tracking-wide text-foreground sm:text-5xl"
      >
        thanks{form.name ? `, ${form.name.toLowerCase()}` : ""}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.3 }}
        className="mt-3 text-base text-foreground/70 sm:text-lg"
      >
        i'll be in touch soon.
      </motion.p>
    </motion.div>
  );
}

function buildSummaryLines(form: FormState) {
  const lines: { label: string; value: string }[] = [];
  lines.push({ label: "name", value: form.name || "—" });

  if (form.service === "logo") {
    lines.push({ label: "service", value: "logo design" });
    if (form.logoType === "svg") {
      lines.push({ label: "package", value: "svg logo only · $75" });
    } else if (form.logoType === "brandkit") {
      lines.push({ label: "package", value: "brand kit · $100" });
    }
    lines.push({
      label: "iterations",
      value:
        form.extraIterations === 0
          ? "2 included"
          : `2 included + ${form.extraIterations} extra · +$${form.extraIterations * 10}`,
    });
  } else if (form.service === "product") {
    lines.push({ label: "service", value: "product design" });
    if (form.productType === "landing") {
      lines.push({ label: "package", value: "landing page · $250" });
      lines.push({
        label: "extra pages",
        value:
          form.extraPages === 0
            ? "none"
            : `${form.extraPages} × $25 · +$${form.extraPages * 25}`,
      });
    } else if (form.productType === "dashboard") {
      lines.push({ label: "package", value: "product / dashboard · $500" });
    }
  }

  lines.push({
    label: "brief",
    value:
      form.brief.length > 80 ? form.brief.slice(0, 80).trim() + "…" : form.brief,
  });

  if (form.contactMethod && form.contact) {
    lines.push({
      label: form.contactMethod === "discord" ? "discord" : "email",
      value: form.contact,
    });
  }

  return lines;
}

