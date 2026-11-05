import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface TrailerModalProps {
  trailerKey: string | null;
  onClose: () => void;
  title?: string;
}

/**
 * Full-screen YouTube trailer with keyboard shortcuts (YouTube-style).
 * Uses the official IFrame API so we can drive playback programmatically.
 */

// --- YouTube IFrame API singleton loader -------------------------------------

interface YtPlayer {
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  destroy(): void;
}

interface YtNamespace {
  Player: new (
    el: HTMLElement | string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: { onReady?: (e: { target: YtPlayer }) => void };
    },
  ) => YtPlayer;
}

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytLoader: Promise<YtNamespace | null> | null = null;
const loadYouTubeApi = (): Promise<YtNamespace | null> => {
  if (ytLoader) return ytLoader;
  ytLoader = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT ?? null);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => resolve(null);
    document.head.appendChild(tag);
    // Safety net: if the API never signals ready (blocked/offline), give up
    // after 6s so the fallback iframe is used.
    window.setTimeout(() => resolve(window.YT ?? null), 6000);
  });
  return ytLoader;
};

// --- Component ---------------------------------------------------------------

export const TrailerModal = ({
  trailerKey,
  onClose,
  title = "Movie trailer",
}: TrailerModalProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const hudTimerRef = useRef<number | null>(null);

  const [mini, setMini] = useState(false);
  const [hud, setHud] = useState<string | null>(null);
  const [apiFailed, setApiFailed] = useState(false);

  const flashHud = useCallback((text: string) => {
    setHud(text);
    if (hudTimerRef.current) window.clearTimeout(hudTimerRef.current);
    hudTimerRef.current = window.setTimeout(() => setHud(null), 900);
  }, []);

  // Boot / teardown the YT Player whenever the trailer changes.
  useEffect(() => {
    if (!trailerKey) {
      playerRef.current?.destroy?.();
      playerRef.current = null;
      return;
    }
    let cancelled = false;
    let created: YtPlayer | null = null;
    setApiFailed(false);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      if (!YT || !hostRef.current) {
        setApiFailed(true);
        return;
      }
      hostRef.current.innerHTML = "";
      const mount = document.createElement("div");
      mount.style.width = "100%";
      mount.style.height = "100%";
      hostRef.current.appendChild(mount);
      created = new YT.Player(mount, {
        videoId: trailerKey,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        created?.destroy?.();
      } catch {
        /* ignore – API may already have torn it down */
      }
      playerRef.current = null;
    };
  }, [trailerKey]);

  // --- Player action helpers -------------------------------------------------

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unMute();
      flashHud("Unmuted");
    } else {
      p.mute();
      flashHud("Muted");
    }
  }, [flashHud]);

  const toggleFullscreen = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      if (mini) setMini(false);
      void el.requestFullscreen?.().catch(() => undefined);
    }
  }, [mini]);

  // --- Global keyboard handler (only active while trailer is open) -----------

  useEffect(() => {
    if (!trailerKey) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;

      if (k === "Escape") {
        // Let the browser exit native fullscreen first; only close otherwise.
        if (document.fullscreenElement) return;
        onClose();
        return;
      }
      if (k === "m" || k === "M") return toggleMute();
      if (k === "f" || k === "F") return toggleFullscreen();
      if (k === "i" || k === "I") return setMini((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trailerKey, onClose, toggleMute, toggleFullscreen]);

  if (!trailerKey) return null;

  // Portal to <body> so the overlay is never trapped inside a transformed
  // ancestor (e.g. LiquidGlassPanel on the Home hero).
  return createPortal(
    <>
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal={!mini}
        aria-label={title}
        className={
          mini
            ? "fixed bottom-4 right-4 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15"
            : "fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        }
        onClick={mini ? undefined : onClose}
      >
        <div
          className="relative"
          style={{
            width: mini ? "100%" : "min(100vw, calc(100vh * 16 / 9))",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {apiFailed ? (
            // Fallback if the YouTube IFrame API never loaded (blocked/offline).
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={title}
              className="block aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div ref={hostRef} className="block aspect-video w-full [&>div]:h-full [&>div]:w-full [&>iframe]:h-full [&>iframe]:w-full" />
          )}
          <Button
            variant="glass"
            size="icon"
            onClick={onClose}
            aria-label="Close trailer"
            className="absolute right-2 top-2 z-10 opacity-70 hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {hud && (
          <div className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/10 backdrop-blur">
            {hud}
          </div>
        )}
      </div>
    </>,
    document.body,
  );
};

export default TrailerModal;

