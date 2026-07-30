import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../utils/constants";

export default function Navbar() {
  const [quickTicker, setQuickTicker] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  function handleQuickSearch(e) {
    e.preventDefault();
    const symbol = quickTicker.trim().toUpperCase();
    if (!symbol) return;
    navigate(`/analysis/${symbol}`);
    setQuickTicker("");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-base-border bg-base/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-accent/15 text-accent">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 12.5 5 7l3 2.5L15 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink-primary">
            Kick<span className="text-accent">Stocks</span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-250 ${
                    isActive ? "text-ink-primary bg-base-raised" : "text-ink-secondary hover:text-ink-primary hover:bg-base-raised/60"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <form onSubmit={handleQuickSearch} className="ml-auto hidden w-full max-w-[220px] items-center sm:flex">
          <div className="relative w-full">
            <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={quickTicker}
              onChange={(e) => setQuickTicker(e.target.value)}
              placeholder="Jump to ticker"
              aria-label="Jump to ticker"
              className="w-full rounded-sm border border-base-border bg-base-panel py-1.5 pl-8 pr-2 font-tabular text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-accent/60"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-sm border border-base-border text-ink-primary md:hidden"
        >
          {mobileOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-base-border bg-base px-4 py-4 md:hidden">
          <form onSubmit={handleQuickSearch} className="mb-4">
            <div className="relative w-full">
              <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={quickTicker}
                onChange={(e) => setQuickTicker(e.target.value)}
                placeholder="Jump to ticker"
                aria-label="Jump to ticker"
                className="w-full rounded-sm border border-base-border bg-base-panel py-2 pl-8 pr-2 font-tabular text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-accent/60"
              />
            </div>
          </form>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-sm px-3 py-2.5 text-sm font-medium transition-colors duration-250 ${
                      isActive ? "text-ink-primary bg-base-raised" : "text-ink-secondary hover:text-ink-primary hover:bg-base-raised/60"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}