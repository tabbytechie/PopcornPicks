import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/shared/components/Navigation";
import Footer from "@/shared/components/Footer";

/**
 * MainLayout wraps every content page with the shared header and footer.
 * Auth and any future full-bleed screens live outside this layout.
 * `main` is keyed by pathname so each route change remounts it and plays
 * the entrance animation (page transition).
 */
const MainLayout = () => {
  const location = useLocation();

  // React Router keeps the previous scroll offset on navigation, so clicking
  // "Details" from the bottom of the hero lands mid-page. Reset to the top
  // (instantly, to avoid a visible glide) whenever the route changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main key={location.pathname} className="flex-1 pt-16 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
