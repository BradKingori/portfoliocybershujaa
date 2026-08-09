// Content for the /cybersec page.
//
// EDIT ME: the prose here is a first draft written to your outline  the facts
// are yours, the phrasing is not. Read it once and make it sound like you.
// Anything marked TODO is something I could not verify and you must fill in.

/** ------------------------------------------------------------------ About */

// TODO(bradley): this is a draft in a plain, first-person voice. The inferences
// I made and you should confirm or correct: "engineering student in Nairobi",
// and the framing that CTFs were your way in.
export const ABOUT =

`

I'm Bradley King'ori, an engineering student in Nairobi who got into security through CTFs and stayed for the blue team side of it. 
Most of my recent work is defensive: SOC tooling on Azure through Cyber Shujaa, and TryHackMe rooms weighted heavily toward SIEM,
 threat intelligence and Windows forensics. I'm building toward a SOC analyst role
  the person reading the logs and deciding what actually deserves an escalation, not just what tripped a rule. 
  The habit I bring from engineering is refusing to stop at "the alert fired"; I want the mechanism underneath it, 
  because that's the difference between closing a ticket and understanding an intrusion. I also build software a vehicle recognition system, 
  a game studio so I've written the kind of thing I'm now learning to defend.`;

/** ------------------------------------------------------------------ Stats */

// Verified from your TryHackMe profile.
export const STATS = [
  { label: "TryHackMe rank", value: "Top 25%" },
  { label: "Rooms completed", value: "20+" },
  { label: "THM level", value: "20+ · Apprentice" },
  { label: "HackTheBox rank", value: "Apprentice" },
];

/** ----------------------------------------------------------------- Skills */

export type SkillGroup = { group: string; blurb: string; items: string[] };

// TODO(bradley): I removed Ghidra and IDA Pro. Nothing in your room history or
// certs backs reverse-engineering at tool level, and naming a disassembler you
// can't drive is the first thing an interviewer probes. Add them back if you
// genuinely use them.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    group: "Tools",
    blurb: "Things I've actually driven, not just read about.",
    items: [
      "Splunk",
      "Wireshark",
      "Burp Suite",
      "Nmap",
      "Registry Explorer",
      "RegRipper",
      "Autopsy",
      "utmpdump",
      "Hashcat",
      "John the Ripper",
      "Social-Engineer Toolkit",
      "CyberChef",
      "VirusTotal",
      "Metasploit",
    ],
  },
  {
    group: "Platforms",
    blurb: "Environments I work and train in.",
    items: [
      "Microsoft Azure",
      "Microsoft Sentinel",
      "Microsoft Defender",
      "Linux (CLI)",
      "Windows",
      "TryHackMe",
      "HackTheBox",
    ],
  },
  {
    group: "Concepts",
    blurb: "The frameworks and methods I reason with.",
    items: [
      "MITRE ATT&CK",
      "Pyramid of Pain",
      "Cyber Kill Chain",
      "Cyber threat intelligence",
      "SIEM & log analysis",
      "Endpoint security monitoring",
      "Threat hunting",
      "Windows registry forensics",
      "Linux log analysis (auth.log / wtmp)",
      "Detection engineering",
      "Malware triage",
      "Phishing & social engineering",
      "OWASP Top 10",
      "Password cracking",
      "Alert triage & escalation",
    ],
  },
];

/** ------------------------------------------------------------- Featured labs */

export type Lab = {
  title: string;
  platform: string;
  difficulty: string;
  problem: string;
  action: string;
  tools: string[];
  outcome: string;
  /** Drop an image URL here (Imgur, like your other pages) to replace the placeholder. */
  screenshot: string | null;
  screenshotCaption: string;
};

export const FEATURED_LABS: Lab[] = [
  {
    title: "Brutus",
    platform: "Hack The Box · Sherlock",
    difficulty: "Very Easy",
    problem:
      "A Confluence server was brute-forced over SSH. The evidence set is two files auth.log and wtmp and the questions are the ones an incident lead asks: who got in, from where, what did they do as root, and is the box still theirs.",
    action:
      "Counted authentication failures per source IP to isolate the attacker, found the transition from failed to accepted login to fix time zero, then cross-checked the session against wtmp with utmpdump for duration and source. Traced the post-compromise shadow-utils entries to the persistence account and mapped the chain to ATT&CK.",
    tools: ["auth.log", "wtmp", "utmpdump", "Linux CLI", "MITRE ATT&CK"],
    outcome:
      "A full timeline from two log files, and three detection rules worth writing the failure-then-success transition being the highest fidelity of them. Written up in full below.",
    screenshot: null,
    screenshotCaption: "utmpdump output pairing the session open and close records",
  },
  {
    title: "Splunk Basics: Did you SIEM?",
    platform: "TryHackMe",
    difficulty: "Medium",
    problem:
      "Raw log data from a custom source lands in a SIEM as unstructured text. Until it is parsed into fields, it cannot be searched, correlated or alerted on it is storage, not detection.",
    action:
      "Ingested a custom log source into Splunk, built the field extractions to turn free text into queryable fields, then wrote SPL searches to pivot across the data and surface the events that mattered.",
    tools: ["Splunk", "SPL", "Field extraction"],
    outcome:
      "Went from unsearchable text to a set of working queries and, more usefully, learned why detection engineering lives or dies on parsing quality rather than rule cleverness.",
    screenshot: null,
    screenshotCaption: "Splunk search returning parsed fields from the custom source",
  },
  {
    title: "Windows Forensics 1  Registry Analysis",
    platform: "TryHackMe",
    difficulty: "Medium",
    problem:
      "A Windows host is suspected of compromise, but the attacker did not leave a convenient log. Most of what a user and a process did on the box is recorded in the registry, spread across hives that are locked while the system runs.",
    action:
      "Worked from acquired hives rather than a live system, mapped which hive answers which question, and reconstructed a timeline of system configuration, account activity and program execution from registry artifacts.",
    tools: ["Registry Explorer", "RegRipper", "Autopsy", "KAPE"],
    outcome:
      "Built a repeatable checklist of registry artifacts for host triage, and a clear sense of which artifact proves execution versus mere presence  the distinction that decides whether an alert is worth escalating.",
    screenshot: null,
    screenshotCaption: "UserAssist key decoded in Registry Explorer showing program run counts",
  },
  {
    title: "Malware Analysis  Egg-xecutable",
    platform: "TryHackMe",
    difficulty: "Medium",
    problem:
      "A suspicious executable needs a verdict, and detonating it on anything that matters is not an option. The question is what it does before it is allowed anywhere near a production host.",
    action:
      "Triaged the sample inside a sandbox: static properties and strings first to form a hypothesis, then dynamic execution to watch what it actually touched  filesystem, registry, network.",
    tools: ["Sandbox VM", "Strings", "VirusTotal", "Process monitoring"],
    outcome:
      "Produced a verdict backed by observable behaviour, and a set of indicators that could be handed to a detection team.",
    screenshot: null,
    screenshotCaption: "Sandbox process tree and network callouts from detonation",
  },
  {
    title: "OWASP Juice Shop",
    platform: "TryHackMe",
    difficulty: "Easy",
    problem:
      "A deliberately vulnerable web app carrying most of the OWASP Top 10 at once  the point being to find the flaws by hand rather than trusting a scanner's output.",
    action:
      "Mapped the app in Burp Suite, then worked the classes in order: injection on the login flow, broken access control on user-scoped endpoints, and misconfiguration exposing data that should never have been reachable.",
    tools: ["Burp Suite", "Browser DevTools", "SQL injection", "OWASP Top 10"],
    outcome:
      "The defensive half is the part I kept: each exploited flaw has a log signature, and knowing what the attack looks like from the attacker's console tells you what to hunt for in the SIEM.",
    screenshot: null,
    screenshotCaption: "Burp Suite intercepting the request used for the access-control bypass",
  },
];

/** ------------------------------------------- Full room history, grouped */

export type RoomGroup = {
  group: string;
  rooms: { name: string; difficulty: string; note: string }[];
};

export const ROOM_GROUPS: RoomGroup[] = [
  {
    group: "Threat Intelligence",
    rooms: [
      { name: "MITRE", difficulty: "Medium", note: "ATT&CK, CAR, ENGAGE and the wider MITRE resource set" },
      { name: "Pyramid of Pain", difficulty: "Easy", note: "Ranking indicators by how costly they are for an adversary to change" },
      { name: "Intro to Cyber Threat Intel", difficulty: "Easy", note: "CTI lifecycle, standards and frameworks" },
      { name: "Threat Intelligence Tools", difficulty: "Easy", note: "OSINT tooling for threat assessment and investigation" },
    ],
  },
  {
    group: "SOC & Detection",
    rooms: [
      { name: "Junior Security Analyst Intro", difficulty: "Easy", note: "A day of analyst duties end to end" },
      { name: "Introduction to SIEM", difficulty: "Easy", note: "SIEM fundamentals, features and functionality" },
      { name: "Splunk Basics  Did you SIEM?", difficulty: "Medium", note: "Ingesting and parsing custom log data" },
      { name: "Intro to Endpoint Security", difficulty: "Easy", note: "Endpoint monitoring methodology and tooling" },
      { name: "Threat Hunting: Introduction", difficulty: "Easy", note: "Hunting mindset, process and goals" },
    ],
  },
  {
    group: "Forensics & Malware",
    rooms: [
      { name: "Windows Forensics 1", difficulty: "Medium", note: "Windows registry forensics" },
      { name: "Malware Analysis  Egg-xecutable", difficulty: "Medium", note: "Sandbox triage tooling" },
      { name: "Passwords  A Cracking Christmas", difficulty: "Easy", note: "Cracking password-protected encrypted files" },
    ],
  },
  {
    group: "Offensive & Web",
    rooms: [
      { name: "OWASP Juice Shop", difficulty: "Easy", note: "Identifying and exploiting common web app vulnerabilities" },
      { name: "Phishing  Merry Clickmas", difficulty: "Easy", note: "Social-Engineer Toolkit phishing campaigns" },
      { name: "Linux CLI  Shells Bells", difficulty: "Easy", note: "Linux command line for investigation" },
    ],
  },
  {
    group: "Foundations",
    rooms: [
      { name: "Advent of Cyber Prep Track", difficulty: "Easy", note: "Warm-up track ahead of Advent of Cyber 2025" },
    ],
  },
];

/** --------------------------------------------------------------- Writeup */

export type WriteupSection = { heading: string; body: string[] };

// IMPORTANT(bradley): the METHOD below is accurate Linux auth.log / wtmp DFIR and
// you can publish it as-is. The FINDINGS are left as <angle-bracket> placeholders
// on purpose  I know the shape of Brutus but I will not put a specific attacker
// IP, timestamp or username on your portfolio that I cannot verify. Open your
// notes, fill in every <placeholder>, then delete this comment.
export const WRITEUP = {
  title: "Brutus: Reconstructing an SSH Brute Force from auth.log and wtmp",
  subtitle: "DFIR triage  Hack The Box Sherlock: Brutus",
  readingTime: "7 min read",
  date: "2026",
  sections: [
    {
      heading: "The scenario",
      body: [
        "A Confluence server was hit over SSH. I will get two files and no live system: /var/log/auth.log and /var/log/wtmp. That is the entire evidence set that i would require. The job is to answer the questions an incident lead actually asks  who got in, when, from where, what did they do once they were root, and is there anything left behind that means the box is still theirs.",
        "It is a small dataset, which makes it a good exercise in discipline. With two files there is nowhere to hide behind tooling; you either read the log correctly or you get the timeline wrong.",
      ],
    },
    {
      heading: "Knowing what each file can and cannot tell you",
      body: [
        "auth.log is known as plain text and records authentication events as they are attempted in all of the following sshd, sudo, PAM, and the shadow-utils tools like useradd and usermod. Crucially it logs failures as well as successes, which is what makes brute force visible at all.",
        "wtmp is binary and records completed login sessions, so it answers a different question: not 'who tried' but 'who was actually logged in, from where, and for how long'. It is not greppable  utmpdump wtmp renders it into readable records.",
        "Two related files worth knowing even though they are not in this set: btmp holds failed logins (lastb), and lastlog holds the most recent login per account. Naming what is absent from your evidence matters as much as reading what is present.",
      ],
    },
    {
      heading: "Spotting the brute force",
      body: [
        "Brute force has an unmistakable shape in auth.log: a burst of 'Failed password for <user> from <IP> port <port> ssh2' lines from one source in a very short window. Attempts against accounts that do not exist show up slightly differently, as 'Failed password for invalid user <user> from <IP>'  that distinction is useful, because it tells you whether the attacker was guessing usernames or already knew a valid one.",
        "Counting failures per source IP is the fastest way in. Sorting the source addresses by frequency separates the noisy internet background radiation from the one host that is genuinely working the door, and gives you a candidate attacker IP within a minute.",
        "The moment that matters is the transition: the first 'Accepted password for <user> from <IP>' line from the same address that was failing. That single line is the compromise. Everything before it is an attempt; everything after it is an intrusion, and the timestamp on it becomes time zero for the whole timeline.",
      ],
    },
    {
      heading: "Confirming the session in wtmp",
      body: [
        "auth.log tells you authentication succeeded. wtmp tells you what the session actually was. Running utmpdump against it gives records with a type, a PID, a terminal, the username, the source host and a timestamp.",
        "Sessions come in pairs: a user-process record when the session opens and a dead-process record on the same terminal when it closes. Pairing them gives session duration, which is the number that separates a login that was immediately dropped from one where somebody sat and worked. The PID field is what HTB refers to as the session number.",
        "This is also the cross-check on your auth.log reading. If the source IP in wtmp does not match the one you pulled from the Accepted line, you have attributed the session to the wrong actor.",
      ],
    },
    {
      heading: "Following what happened after the login",
      body: [
        "Once there is a valid session, auth.log keeps narrating, and the shadow-utils entries are the ones that reveal persistence. Account creation appears as 'useradd[PID]: new user: name=<user>, UID, GID, home, shell'. Privilege escalation follows as 'usermod[PID]: add <user> to group sudo'. A password being set logs as 'passwd[PID]: password changed for <user>'.",
        "A new local account added to the sudo group minutes after a brute-forced root login is not an administrative coincidence. It is the attacker converting a cracked password into durable access that survives a password reset which means remediation has to include deleting that account, not just rotating the compromised one.",
        "Commands run through sudo are logged too, in the form '<user> : TTY=<tty> ; PWD=<dir> ; USER=root ; COMMAND=<command>'. This is where you find out whether they were enumerating, pulling tooling down from the internet, or establishing something more permanent.",
      ],
    },
    {
      heading: "Findings",
      body: [
        "The intruder broke into the Confluence server by brute forcing SSH credentials. Once inside, they set up a hidden user account that let them keep exploring the system and install tools meant to maintain long term access. The fact that the login attempt succeeded points to weak passwords and a lack of layered security defenses."
       ],
    },
    {
      heading: "Mapping it to ATT&CK",
      body: [
        "T1110.001  Brute Force: Password Guessing, for the initial burst of failures. T1078 Valid Accounts, the moment the guessed credential succeeds and the activity stops looking like an attack and starts looking like an administrator. T1021.004 Remote Services: SSH, the access vector itself.",
        "Then the post-compromise half: T1136.001 Create Account: Local Account for the new user, T1098 Account Manipulation for adding it to sudo, and T1548.003  Abuse Elevation Control Mechanism: Sudo and Sudo Caching for the privileged commands that follow.",
        "Mapping is not decoration. It turns a one-off case into a detection requirement: if I can name the technique, I can ask whether we have coverage for it across every other host, not just this one.",
      ],
    },
    {
      heading: "What I would detect on",
      body: [
        "The single highest-value rule out of this case is the transition, not the volume. Failed SSH authentications alone are constant background noise on any internet-facing host and alerting on them trains analysts to ignore the alert. N failures followed by a success from the same source IP inside a short window is rare, high-fidelity, and is exactly the event that happened here.",
        "The second rule is the persistence pattern: useradd followed by that account being added to a privileged group, correlated against whether the session that ran it came from an expected source. In a change-managed environment, account creation from a fresh remote SSH session should never be routine.",
        "The third is the cheapest and most often missed a successful root login over SSH from an IP that has never authenticated to that host before. First-seen source addresses on privileged accounts catch a great deal for how little the rule costs.",
      ],
    },
  ] as WriteupSection[],
};

/** --------------------------------------------- Certifications & education */

export type Credential = {
  name: string;
  issuer: string;
  year: string;
  status: "Earned" | "In Progress";
  description: string;
};

// Confirmed with you: Cyber Shujaa, SC-900 and CEH (Sep 2025) all earned.
export const CREDENTIALS: Credential[] = [
  {
    name: "CEH  Certified Ethical Hacker",
    issuer: "EC-Council",
    year: "Sep 2025",
    status: "Earned",
    description:
      "Offensive methodology and tooling  the attacker's-eye view that the detection work is built on.",
  },
  {
    name: "Cyber Shujaa  SOC Analyst",
    issuer: "Cyber Shujaa",
    year: "2024",
    status: "Earned",
    description:
      "Security operations track covering SOC workflow and Azure-based monitoring, triage and response tooling.",
  },
  {
    name: "Microsoft SC-900",
    issuer: "Microsoft",
    year: "2024",
    status: "Earned",
    description:
      "Security, Compliance and Identity Fundamentals  core Microsoft security, identity and compliance concepts.",
  },
];

// TODO(bradley): fill in your degree, institution and graduation year. I know
// you won the USIU chapter of the Hult Prize but I will not guess a programme.
export const EDUCATION = [
  {
    name: "BSC. in Applied Computer Technology",
    issuer: "United States International University - Africa ",
    year: "2021-2025",
  status: "Earned",
    description: "Major in CyberSecurity and Forensics",
  },  {
    name: "Diploma in Computer Engineering",
    issuer: "Mount Kenya University  ",
    year: "2013-2016",
  status: "Earned",
    description: "",
  },
];

/** ------------------------------------------------------------------- CTFs */

export const CTFS = [
  {
    name: "Microsoft Africa ADC CTF",
    placement: "1st Place (Africa)",
    year: "2025",
    description:
      "Won the Africa regional competition against teams from across the continent.",
  },
  {
    name: "Hult Prize  USIU",
    placement: "Winner",
    year: "2024",
    description:
      "Won the USIU chapter of the world's largest social entrepreneurship competition.",
  },
  {
    name: "TryHackMe  Advent of Cyber",
    placement: "Completed",
    year: "2024",
    description:
      "Full run of the annual Advent challenge series, spanning SIEM, phishing, malware triage and password cracking.",
  },
];
