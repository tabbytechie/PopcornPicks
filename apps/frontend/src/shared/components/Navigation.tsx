import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Film, LogOut, Menu, Moon, Plus, Radio, Search, Star, Sun, TrendingUp, User, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { useAppleLiquidGlassWebGL } from "@/shared/components/liquid-glass/useAppleLiquidGlassWebGL";
import { useAuth } from "@/features/authentication/context/AuthContext";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Film;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: TrendingUp },
  { href: "/browse", label: "Browse", icon: Film },
  { href: "/live", label: "Live", icon: Radio },
  { href: "/search", label: "Search", icon: Search },
  { href: "/recommendations", label: "For You", icon: Star },
  { href: "/watchlist", label: "Watchlist", icon: Plus },
];

const NavLinks = ({
  onNavigate,
  activePath,
  showLabels = false,
}: {
  onNavigate: () => void;
  activePath: string;
  showLabels?: boolean;
}) => (
  <>
    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      const isActive = activePath === item.href;
      return (
        <Link
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "text-netflix-red"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className={showLabels ? "inline" : "hidden md:inline"}>{item.label}</span>
        </Link>
      );
    })}
  </>
);

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { user, status, logout } = useAuth();
  const authed = status === "authenticated" && !!user;
  const glassRef = useAppleLiquidGlassWebGL<HTMLElement>({
    tint: 0.12,
    tintTone: "auto",
    frost: 0.05,
    opacity: 0.8,
    material: { refraction: 60 },
  });

  // Auto-hide: slide the bar out when the user scrolls down so the hero
  // art owns the full viewport; slide it back in on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 96) setHidden(true);
      else if (y < lastY || y <= 8) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-disappear: whenever the bar is visible (and the menu is closed),
  // slide it away after 3s of showing. Scrolling up or hovering the very
  // top of the page brings it back and restarts the countdown.
  useEffect(() => {
    if (hidden || isOpen) return;
    const timer = window.setTimeout(() => setHidden(true), 3000);
    return () => window.clearTimeout(timer);
  }, [hidden, isOpen]);

  // Pointer near the top edge summons the bar back.
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 24) setHidden(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <header
      ref={glassRef}
      data-liquid-glass-target="nav"
      className={`fixed top-0 z-50 w-full border-b border-black/10 bg-background/70 backdrop-blur-md transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-black/40 ${
        hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded bg-netflix-red p-1.5">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              PopcornPicks
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLinks activePath={location.pathname} onNavigate={() => setIsOpen(false)} />
          </div>

          <div className="flex items-center gap-3">
            {authed ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="max-w-40 truncate text-sm text-foreground/70" title={user.email}>
                  {user.email}
                </span>
                <Button
                  variant="glass"
                  size="sm"
                  className="gap-2 border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10"
                  onClick={logout}
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:inline-flex">
                <Button
                  variant="glass"
                  size="sm"
                  className="gap-2 border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-foreground/10"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-foreground hover:bg-foreground/10"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span>Menu</span>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-netflix-bg border-white/10 text-white w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-netflix-red p-1.5">
                      <Film className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">PopcornPicks</span>
                  </div>

                  <div className="flex flex-col gap-2 items-start">
                    <NavLinks
                      activePath={location.pathname}
                      onNavigate={() => setIsOpen(false)}
                      showLabels
                    />
                  </div>

                  {authed ? (
                    <div className="flex w-full flex-col gap-2">
                      <span className="truncate text-sm text-white/70" title={user.email}>
                        {user.email}
                      </span>
                      <Button
                        variant="glass"
                        className="w-full gap-2"
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="w-full">
                      <Button variant="primary-red" className="w-full gap-2">
                        <User className="h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
