import { RetroLayout, RetroLink, RetroHr } from "../components/RetroLayout";

export default function About() {
  return (
    <RetroLayout>
      <h1 style={{ color: "#fff", fontSize: "16px", marginBottom: "16px" }}>
        &gt;&gt; about me
      </h1>

      <div style={{ fontSize: "14px", lineHeight: 1.8 }}>
        <p style={{ color: "#00cc00" }}>// intro</p>
        <p>
          hiya, i&apos;m{" "}
          <span style={{ color: "#ff6644", fontWeight: 700 }}>salt</span>.
          a software dev based in hell(australia).
        </p>
        <p>i love writing code, design(occasionally), and public transit.</p>

        <RetroHr />

        <p style={{ color: "#00cc00" }}>// what i do</p>
        <p>
          i&apos;m the cto @{" "}
          <RetroLink href="https://clovr.dev">clovr</RetroLink>, building the
          best design agent possible
        </p>
        <p>
          i also work on{" "}
          <RetroLink href="https://tryportal.app">portal</RetroLink> on the
          side, an oss slack alternative
        </p>

        <RetroHr />

        <p style={{ color: "#00cc00" }}>// hobbies</p>
        <p>i play friendslop games w/ my friends sometimes.</p>
        <p>i also enjoy watching and making youtube videos(also sometimes).</p>
        <p>other than that, i just make random bs on the internet :)</p>
      </div>
    </RetroLayout>
  );
}
