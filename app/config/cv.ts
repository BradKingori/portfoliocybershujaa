export type CvEntry = {
  /** Text shown on the navbar button. */
  label: string;
  /** Public link to the hosted CV (Google Drive, Dropbox, etc.). */
  url: string;
};

// TODO: replace each placeholder with the real hosted CV link.
// Any path left out of this map shows no CV button — that is how /roguelab
// is excluded, so keep it out of here.
const CV_BY_PATH: Record<string, CvEntry> = {
  "/": {
    label: "Download CV",
    url: "https://drive.google.com/file/d/1jNGv9jf5nTwkA1Nh-yw0KzavBV-g6_mf/view?usp=drive_link",
  },
  "/projects": {
    label: "Software CV",
    url: "https://drive.google.com/file/d/1jNGv9jf5nTwkA1Nh-yw0KzavBV-g6_mf/view?usp=drive_link",
  },
  "/cybersec": {
    label: "CyberSecurity CV",
    url: "https://drive.google.com/file/d/1jNGv9jf5nTwkA1Nh-yw0KzavBV-g6_mf/view?usp=drive_link",
  },
};

/** The CV for a given route, or null when that route should not show one. */
export function getCvForPath(pathname: string): CvEntry | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return CV_BY_PATH[path] ?? null;
}
