import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  NavLink,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useState } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import { Logo } from "./components/Logo";
import { getCvForPath } from "./config/cv";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const date = new Date();
const year = date.getFullYear();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Footer(){
  return (
    <footer className="w-full border-t border-gray-200 mt-auto">
      <p className="text-center py-6 text-gray-600">
        © {year} Bradley King'ori. All rights reserved.
      </p>
    </footer>
  )
}
// Facebook-style Navbar Component
function DownloadIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function FacebookNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Each page advertises its own CV; routes missing from the map (e.g. /roguelab)
  // show no button at all.
  const cv = getCvForPath(useLocation().pathname);

  const navItems = [
    { path: "/", label: "Home", icon: "" },
    { path: "/cybersec", label: "CyberSecurity"},//, icon: "🔒" },
    { path: "/roguelab", label: "Rogue Lab"},// icon: "🎮" },
    { path: "/projects", label: "Projects",},// icon: "📁" },

  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Logo className="text-3xl font-bold text-green-600 h-8" />
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? "bg-green-600 text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:bradkingori@gmail.com"></a>
            {cv && (
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition"
              >
                <DownloadIcon className="w-4 h-4" />
                {cv.label}
              </a>
            )}
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
              Contact Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? "bg-green-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              {cv && (
                <a
                  href={cv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition"
                >
                  <DownloadIcon className="w-4 h-4" />
                  {cv.label}
                </a>
              )}
              <button className="w-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
                Contact Me
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <FacebookNavbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}