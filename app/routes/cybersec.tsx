import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/cybersec";
import { CARNAGE_META, CARNAGE_SUMMARY } from "../data/carnage";
import {
  ABOUT,
  CREDENTIALS,
  CTFS,
  EDUCATION,
  FEATURED_LABS,
  ROOM_GROUPS,
  SKILL_GROUPS,
  STATS,
  WRITEUP,
  type Credential,
  type Lab,
} from "../data/cybersec";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cybersecurity — Bradley King'ori" },
    {
      name: "description",
      content:
        "SOC analyst in training. Blue team labs, writeups, certifications and CTF results.",
    },
  ];
}

// Matrix Rain Effect Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    resizeCanvas();

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = [];

    const initDrops = () => {
      if (!canvasRef.current) return;
      columns = Math.floor(canvasRef.current.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    initDrops();

    let animationId: number;

    const draw = () => {
      const currentCanvas = canvasRef.current;
      const currentCtx = currentCanvas?.getContext('2d');

      if (!currentCanvas || !currentCtx) return;

      currentCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      currentCtx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);

      currentCtx.fillStyle = '#0F0';
      currentCtx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        currentCtx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > currentCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}

// Interactive Terminal Component
function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Type 'whoami' to discover my identity..."
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();

if (command === "whoami") {
      // 1. Show the command and prep an empty string for the animation
      setHistory(prev => [...prev, `$ ${input}`, ""]);

      const details = "\nBradley King'ori\nSOC Analyst (in training) | CEH | Blue team | CTF player";
      let currentIndex = 0;

      // 2. Start typing effect (using ReturnType to keep TS happy across environments)
      const typingInterval: ReturnType<typeof setInterval> = setInterval(() => {
        setHistory(prev => {
          const newHistory = [...prev];
          // Append the next character to the last string in the array
          newHistory[newHistory.length - 1] += details.charAt(currentIndex);
          return newHistory;
        });

        currentIndex++;

        // 3. Clean up when done
        if (currentIndex >= details.length) {
          clearInterval(typingInterval);
          setHistory(prev => [...prev, ""]);
        }
      }, 40); // Typing speed in ms

    } else if (command === "clear") {
      setHistory(["Type 'whoami' to discover my identity..."]);
    } else if (command === "help") {
      setHistory(prev => [
        ...prev,
        `$ ${input}`,
        "Available commands:",
        "  whoami - Display user information",
        "  help   - Show this help message",
        "  clear  - Clear terminal",
        ""
      ]);
    } else if (command !== "") {
      setHistory(prev => [
        ...prev,
        `$ ${input}`,
        `Command not found: ${input}. Type 'help' for available commands.`,
        ""
      ]);
    }

    setInput("");
  };

  return (
    <div
      className="bg-black backdrop-blur-sm border border-green-500/50 rounded-lg p-6 font-mono text-sm shadow-lg shadow-green-500/20 max-w-2xl mx-auto mb-12"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/30">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-green-400/60 text-xs">terminal@bradley:~</span>
      </div>

<div className="space-y-1 mb-2 max-h-64 overflow-y-auto">
        {history.map((line, idx) => (
          <div key={idx} className="text-green-400 whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-500">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 caret-transparent"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        {showCursor && <span className="text-green-500">▊</span>}
      </form>
    </div>
  );
}

function SectionHeading({ command, blurb }: { command: string; blurb?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-green-500 font-mono">
        $ {command}
      </h2>
      {blurb && <p className="text-green-400/60 font-mono text-sm mt-2">{blurb}</p>}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const tone =
    difficulty.toLowerCase() === "medium"
      ? "text-yellow-400 border-yellow-500/40 bg-yellow-500/10"
      : "text-green-400 border-green-500/40 bg-green-500/10";
  return (
    <span className={`px-2 py-0.5 rounded border text-xs font-mono ${tone}`}>
      {difficulty}
    </span>
  );
}

/** Renders the screenshot, or a labelled slot showing where one belongs. */
function ScreenshotSlot({ src, caption }: { src: string | null; caption: string }) {
  if (src) {
    return (
      <figure className="mt-4">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className="w-full rounded-lg border border-green-500/30"
        />
        <figcaption className="text-green-400/50 text-xs font-mono mt-2">
          {caption}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="mt-4 border border-dashed border-green-500/30 rounded-lg p-6 text-center">
      <div className="text-green-500/40 text-2xl mb-1">▦</div>
      <p className="text-green-400/50 text-xs font-mono">{caption}</p>
      <p className="text-green-500/30 text-[11px] font-mono mt-1">screenshot pending</p>
    </div>
  );
}

function LabCard({ lab }: { lab: Lab }) {
  return (
    <article className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all">
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <h3 className="text-xl font-bold text-green-500">{lab.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-green-400/60 text-xs font-mono">{lab.platform}</span>
          <DifficultyBadge difficulty={lab.difficulty} />
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-green-500/70 font-mono text-xs uppercase tracking-wide">
            The problem
          </dt>
          <dd className="text-green-400/80 mt-1">{lab.problem}</dd>
        </div>
        <div>
          <dt className="text-green-500/70 font-mono text-xs uppercase tracking-wide">
            What I did
          </dt>
          <dd className="text-green-400/80 mt-1">{lab.action}</dd>
        </div>
        <div>
          <dt className="text-green-500/70 font-mono text-xs uppercase tracking-wide">
            Outcome
          </dt>
          <dd className="text-green-400/80 mt-1">{lab.outcome}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2 mt-4">
        {lab.tools.map((tool) => (
          <span
            key={tool}
            className="px-2 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs font-mono"
          >
            {tool}
          </span>
        ))}
      </div>

      {lab.reportPath ? (
        <Link
          to={lab.reportPath}
          className="mt-5 inline-flex items-center gap-2 border border-green-500 text-green-400 px-4 py-2 rounded-lg font-mono text-sm hover:bg-green-500/10 transition"
        >
          Read the full incident report
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <ScreenshotSlot src={lab.screenshot} caption={lab.screenshotCaption} />
      )}
    </article>
  );
}

function CredentialCard({ credential }: { credential: Credential }) {
  const earned = credential.status === "Earned";
  return (
    <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <h3 className="text-lg font-bold text-green-500">{credential.name}</h3>
        <span
          className={`px-2 py-0.5 rounded border text-xs font-mono whitespace-nowrap ${
            earned
              ? "text-green-400 border-green-500/40 bg-green-500/10"
              : "text-cyan-300 border-cyan-500/40 bg-cyan-500/10"
          }`}
        >
          {credential.status}
        </span>
      </div>
      <p className="text-green-400/80 text-sm mb-2 font-mono">
        {credential.issuer} • {credential.year}
      </p>
      <p className="text-green-400/60 text-sm">{credential.description}</p>
    </div>
  );
}

function CTFCard({ name, placement, year, description }: (typeof CTFS)[number]) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <h3 className="text-lg font-bold text-purple-400">{name}</h3>
        <div className="text-yellow-500 font-bold text-sm">{placement}</div>
      </div>
      <p className="text-purple-400/60 text-sm mb-2 font-mono">{year}</p>
      <p className="text-purple-400/60 text-sm">{description}</p>
    </div>
  );
}

const TABS = [
  { id: "labs", label: "labs" },
  { id: "writeups", label: "writeups" },
  { id: "skills", label: "skills" },
  { id: "certs", label: "certs" },
  { id: "ctfs", label: "ctfs" },
] as const;

export default function Cybersec() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("labs");

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <MatrixRain />

      <div className="relative z-10 min-h-screen pt-8">
        <div className="container mx-auto px-4 py-16">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              $ whoami
            </h1>
          </div>

          <InteractiveTerminal />

          {/* About */}
          <section className="max-w-3xl mx-auto mb-12">
            <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 md:p-8">
              <div className="text-green-500 font-mono text-sm mb-4">
                $ cat about_me.txt
              </div>
              <p className="text-green-400/85 leading-relaxed">{ABOUT}</p>
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center hover:border-green-500 transition"
              >
                <div className="text-xl font-bold text-green-500 font-mono">
                  {stat.value}
                </div>
                <div className="text-green-400/70 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 font-mono rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-green-500 text-black border border-green-500"
                    : "bg-black/60 text-green-400 border border-green-500/30 hover:border-green-500"
                }`}
              >
                $ {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            {activeTab === "labs" && (
              <section>
                <SectionHeading
                  command="ls ~/labs"
                  blurb="Selected work, written up properly. Full room history below."
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {FEATURED_LABS.map((lab) => (
                    <LabCard key={lab.title} lab={lab} />
                  ))}
                </div>

                <div className="mt-12">
                  <SectionHeading
                    command="ls ~/labs/all"
                    blurb={`${ROOM_GROUPS.reduce((n, g) => n + g.rooms.length, 0)} rooms shown, grouped by discipline.`}
                  />
                  <div className="space-y-6">
                    {ROOM_GROUPS.map((group) => (
                      <div
                        key={group.group}
                        className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6"
                      >
                        <h3 className="text-green-500 font-bold font-mono mb-4">
                          {group.group}
                          <span className="text-green-500/40 text-sm font-normal ml-2">
                            ({group.rooms.length})
                          </span>
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {group.rooms.map((room) => (
                            <li
                              key={room.name}
                              className="border-l-2 border-green-500/30 pl-3 py-1"
                            >
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-green-400 text-sm font-medium">
                                  {room.name}
                                </span>
                                <DifficultyBadge difficulty={room.difficulty} />
                              </div>
                              <p className="text-green-400/50 text-xs mt-0.5">
                                {room.note}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "writeups" && (
              <section>
                <SectionHeading command="cat ~/writeups/*.md" />
                <article className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 md:p-10">
                  <header className="border-b border-green-500/20 pb-5 mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
                      {WRITEUP.title}
                    </h3>
                    <p className="text-green-400/70">{WRITEUP.subtitle}</p>
                    <p className="text-green-500/50 text-xs font-mono mt-3">
                      {WRITEUP.date} • {WRITEUP.readingTime}
                    </p>
                  </header>

                  <div className="space-y-8">
                    {WRITEUP.sections.map((section) => (
                      <div key={section.heading}>
                        <h4 className="text-lg font-bold text-green-400 mb-3 font-mono">
                          {section.heading}:-
                        </h4>
                        <div className="space-y-3">
                          {section.body.map((para, idx) => (
                            <p
                              key={idx}
                              className="text-green-400/80 text-sm leading-relaxed"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ScreenshotSlot
                    src={null}
                    caption="auth.log failures grouped by source IP, and the utmpdump session records that confirm them"
                  />
                </article>
              </section>
            )}

            {activeTab === "skills" && (
              <section>
                <SectionHeading
                  command="cat ~/skills.txt"
                  blurb="Grouped by what they are, not scored out of 100."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SKILL_GROUPS.map((group) => (
                    <div
                      key={group.group}
                      className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition"
                    >
                      <h3 className="text-lg font-bold text-green-500 mb-1">
                        {group.group}
                      </h3>
                      <p className="text-green-400/50 text-xs mb-4">{group.blurb}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs font-mono"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "certs" && (
              <section>
                <SectionHeading command="cat ~/credentials.txt" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CREDENTIALS.map((credential) => (
                    <CredentialCard key={credential.name} credential={credential} />
                  ))}
                </div>

                <div className="mt-12">
                  <SectionHeading command="cat ~/education.txt" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EDUCATION.map((entry) => (
                      <CredentialCard key={entry.name} credential={entry} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "ctfs" && (
              <section>
                <SectionHeading command="cat ~/competitions.txt" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CTFS.map((ctf) => (
                    <CTFCard key={ctf.name} {...ctf} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Links */}
          <div className="mt-12 max-w-4xl mx-auto bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 font-mono">
            <div className="text-green-400 mb-3">$ ls ~/links</div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://tryhackme.com/p/Brad.Kingori"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition text-sm"
              >
                [TryHackMe]
              </a>
              {/* TODO(bradley): uncomment once your HTB profile is public.
              <a
                href="https://app.hackthebox.com/users/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition text-sm"
              >
                [HackTheBox]
              </a> */}
              <a
                href="https://github.com/BradKingori"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition text-sm"
              >
                [GitHub]
              </a>
              <a
                href="mailto:bradkingori@gmail.com"
                className="text-green-400 hover:text-green-300 transition text-sm"
              >
                [Email]
              </a>
            </div>
          </div>

          <div className="text-center mt-8 text-green-400/60 text-sm font-mono">
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
