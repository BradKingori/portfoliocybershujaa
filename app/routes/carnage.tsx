import { Link } from "react-router";
import type { Route } from "./+types/carnage";
import {
  CARNAGE_ATTACK,
  CARNAGE_C2_TABLE,
  CARNAGE_CONCLUSION,
  CARNAGE_FINDINGS,
  CARNAGE_IMPACT,
  CARNAGE_IOCS,
  CARNAGE_META,
  CARNAGE_RECOMMENDATIONS,
  CARNAGE_SCOPE,
  CARNAGE_SUMMARY,
  CARNAGE_TIMELINE,
  type Finding,
} from "../data/carnage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Operation Carnage — Incident Report | Bradley King'ori" },
    {
      name: "description",
      content:
        "PCAP network intrusion analysis of a phishing-to-Cobalt-Strike compromise chain: delivery, first-stage C2, Cobalt Strike infrastructure, IOCs and MITRE ATT&CK mapping.",
    },
  ];
}

function DownloadIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
      />
    </svg>
  );
}

function SectionHeading({ command, blurb }: { command: string; blurb?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-green-500 font-mono">
        $ {command}
      </h2>
      {blurb && <p className="text-green-400/60 font-mono text-sm mt-2">{blurb}</p>}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 md:p-8">
      {children}
    </div>
  );
}

/** Wireshark filter or raw stream excerpt. */
function CommandBlock({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="mt-4 rounded-lg border border-green-500/30 bg-black overflow-hidden">
      <div className="px-4 py-2 border-b border-green-500/20 text-green-500/70 text-[11px] font-mono uppercase tracking-wide">
        {label}
      </div>
      <pre className="px-4 py-3 text-green-400 text-xs md:text-sm font-mono overflow-x-auto whitespace-pre-wrap break-words">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

/** Horizontally scrollable on small screens rather than squashed. */
function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-green-500/30">
      <table className="w-full text-left text-sm border-collapse min-w-[36rem]">
        <thead>
          <tr className="bg-green-900/20">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-green-500 font-mono text-xs uppercase tracking-wide border-b border-green-500/30"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-green-500/10 last:border-0 hover:bg-green-900/10 transition-colors"
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-green-400/80 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-green-400/50 text-xs font-mono mt-2">{children}</p>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-green-400">{children}</span>;
}

function FindingBlock({ finding }: { finding: Finding }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-green-400 mb-3 font-mono">
        {finding.heading}
      </h3>
      <div className="space-y-3">
        {finding.body.map((para, idx) => (
          <p key={idx} className="text-green-400/80 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {finding.commands?.map((command, idx) => (
        <CommandBlock key={idx} label={command.label} lines={command.lines} />
      ))}

      {finding.points && (
        <ul className="mt-4 space-y-2">
          {finding.points.map((point) => (
            <li
              key={point}
              className="text-green-400/80 text-sm leading-relaxed border-l-2 border-green-500/30 pl-3"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Carnage() {
  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Back to the cybersecurity page */}
        <Link
          to="/cybersec"
          className="inline-flex items-center gap-2 text-green-400/70 hover:text-green-300 font-mono text-sm transition mb-8"
        >
          <span aria-hidden="true">←</span> cd ~/cybersec
        </Link>

        {/* Report header */}
        <header className="border border-green-500/30 rounded-lg bg-black/60 backdrop-blur-sm p-6 md:p-10 mb-10">
          <p className="text-green-500/60 font-mono text-xs uppercase tracking-widest mb-3">
            Incident Report
          </p>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-3">
            {CARNAGE_META.title}
          </h1>
          <p className="text-green-400/80 text-base md:text-lg">
            {CARNAGE_META.subtitle}
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-8 text-sm font-mono">
            <div>
              <dt className="text-green-500/60 text-xs uppercase tracking-wide">
                Analyst
              </dt>
              <dd className="text-green-400 mt-1">{CARNAGE_META.analyst}</dd>
            </div>
            <div>
              <dt className="text-green-500/60 text-xs uppercase tracking-wide">
                Date
              </dt>
              <dd className="text-green-400 mt-1">{CARNAGE_META.date}</dd>
            </div>
            <div>
              <dt className="text-green-500/60 text-xs uppercase tracking-wide">
                Classification
              </dt>
              <dd className="text-green-400 mt-1">{CARNAGE_META.classification}</dd>
            </div>
            <div>
              <dt className="text-green-500/60 text-xs uppercase tracking-wide">
                Source material
              </dt>
              <dd className="mt-1">
                <a
                  href={CARNAGE_META.room.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 underline decoration-green-500/40 transition"
                >
                  {CARNAGE_META.room.label}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 pt-6 border-t border-green-500/20 flex flex-wrap items-center gap-4">
            <a
              href={CARNAGE_META.download.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-black px-5 py-3 rounded-lg font-semibold text-sm hover:bg-green-400 transition"
            >
              <DownloadIcon className="w-4 h-4" />
              {CARNAGE_META.download.label}
            </a>
            <span className="text-green-400/50 text-xs font-mono">
              {CARNAGE_META.readingTime} · the PDF includes the Wireshark
              screenshots referenced throughout
            </span>
          </div>
        </header>

        <div className="space-y-12">
          {/* 1. Executive summary */}
          <section>
            <SectionHeading command="cat 01_executive_summary.txt" />
            <Panel>
              <p className="text-green-400/85 text-sm md:text-base leading-relaxed">
                {CARNAGE_SUMMARY}
              </p>
            </Panel>
          </section>

          {/* 2. Scope & objective */}
          <section>
            <SectionHeading command="cat 02_scope.txt" />
            <Panel>
              <dl className="space-y-4">
                {CARNAGE_SCOPE.map((item) => (
                  <div key={item.label}>
                    <dt className="text-green-500/70 font-mono text-xs uppercase tracking-wide">
                      {item.label}
                    </dt>
                    <dd className="text-green-400/80 text-sm mt-1 leading-relaxed">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </section>

          {/* 3. Timeline */}
          <section>
            <SectionHeading
              command="cat 03_timeline.csv"
              blurb="All times UTC, taken from the capture."
            />
            <Table
              headers={["Timestamp (UTC)", "Event", "Evidence"]}
              rows={CARNAGE_TIMELINE.map((entry) => [
                <span className="font-mono text-green-400 whitespace-nowrap text-xs">
                  {entry.time}
                </span>,
                entry.event,
                <span className="font-mono text-green-400/60 text-xs">
                  {entry.evidence}
                </span>,
              ])}
            />
            <Caption>Table 1: Timeline of events</Caption>
          </section>

          {/* 4. Technical findings */}
          <section>
            <SectionHeading command="cat 04_technical_findings.md" />
            <Panel>
              <div className="space-y-10">
                {CARNAGE_FINDINGS.map((finding) => (
                  <FindingBlock key={finding.heading} finding={finding} />
                ))}

                {/* C2 confirmation table sits inside 4.3's argument */}
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-3 font-mono">
                    Confirmed Cobalt Strike infrastructure
                  </h3>
                  <Table
                    headers={["IP address", "Domain", "VirusTotal confirmation"]}
                    rows={CARNAGE_C2_TABLE.map((row) => [
                      <Mono>{row.ip}</Mono>,
                      <Mono>{row.domain}</Mono>,
                      row.confirmation,
                    ])}
                  />
                  <Caption>Table 2: Cobalt Strike VirusTotal confirmation</Caption>
                </div>
              </div>
            </Panel>
          </section>

          {/* 5. IOCs */}
          <section>
            <SectionHeading
              command="cat 05_iocs.csv"
              blurb="Everything here is blockable today."
            />
            <Table
              headers={["Type", "Indicator", "Context"]}
              rows={CARNAGE_IOCS.map((ioc) => [
                <span className="text-green-500/70 font-mono text-xs whitespace-nowrap">
                  {ioc.type}
                </span>,
                <Mono>{ioc.indicator}</Mono>,
                ioc.context,
              ])}
            />
            <Caption>Table 3: Indicators of compromise</Caption>
          </section>

          {/* 6. MITRE ATT&CK */}
          <section>
            <SectionHeading command="cat 06_attack_mapping.csv" />
            <Table
              headers={["Tactic", "Technique", "ID", "Evidence"]}
              rows={CARNAGE_ATTACK.map((entry) => [
                <span className="whitespace-nowrap text-green-400">{entry.tactic}</span>,
                entry.technique,
                <span className="font-mono text-cyan-300 text-xs whitespace-nowrap">
                  {entry.id}
                </span>,
                entry.evidence,
              ])}
            />
            <Caption>Table 4: MITRE ATT&CK mapping</Caption>
          </section>

          {/* 7. Impact */}
          <section>
            <SectionHeading command="cat 07_impact.txt" />
            <Panel>
              <p className="text-green-400/85 text-sm md:text-base leading-relaxed">
                {CARNAGE_IMPACT}
              </p>
            </Panel>
          </section>

          {/* 8. Recommendations */}
          <section>
            <SectionHeading command="cat 08_recommendations.txt" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CARNAGE_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.horizon}
                  className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition"
                >
                  <h3 className="text-green-500 font-bold font-mono text-sm uppercase tracking-wide mb-3">
                    {rec.horizon}
                  </h3>
                  <p className="text-green-400/80 text-sm leading-relaxed">{rec.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Conclusion */}
          <section>
            <SectionHeading command="cat 09_conclusion.txt" />
            <Panel>
              <p className="text-green-400/85 text-sm md:text-base leading-relaxed">
                {CARNAGE_CONCLUSION}
              </p>
              <div className="mt-6 pt-6 border-t border-green-500/20 flex flex-wrap gap-4 items-center">
                <a
                  href={CARNAGE_META.download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-green-500 text-green-400 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-green-500/10 transition"
                >
                  <DownloadIcon className="w-4 h-4" />
                  {CARNAGE_META.download.label}
                </a>
                <a
                  href={CARNAGE_META.room.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 font-mono text-sm transition"
                >
                  [View the room on TryHackMe]
                </a>
              </div>
            </Panel>
          </section>
        </div>

        <div className="text-center mt-12 text-green-400/60 text-sm font-mono">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
