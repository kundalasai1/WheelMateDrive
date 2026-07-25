"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, Download, RefreshCw, Share2, X } from "lucide-react";
import { WheelMateLogo } from "@/components/brand/logo";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "wmd:pwa-install-dismissed-at";
const DISMISS_DAYS = 7;

export function PwaManager() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [updateReady, setUpdateReady] = useState<ServiceWorkerRegistration | null>(null);
  const [installing, setInstalling] = useState(false);

  const isIos = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      registration = reg;
      if (reg.waiting) setUpdateReady(reg);
      reg.addEventListener("updatefound", () => {
        const worker = reg.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            setUpdateReady(reg);
          }
        });
      });
    }).catch(console.error);

    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", beforeInstall);

    const installed = () => {
      setShowInstall(false);
      setInstallEvent(null);
      localStorage.removeItem(DISMISS_KEY);
    };
    window.addEventListener("appinstalled", installed);

    const timer = window.setTimeout(() => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      if (standalone) return;
      const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
      const canShow = !dismissedAt || Date.now() - dismissedAt > DISMISS_DAYS * 86400000;
      if (canShow) {
        if (isIos) setShowIosHelp(true);
        else setShowInstall(true);
      }
    }, 8000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", installed);
      registration?.unregister;
    };
  }, [isIos]);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShowInstall(false);
    setShowIosHelp(false);
  }

  async function install() {
    if (!installEvent) {
      setShowInstall(false);
      return;
    }
    setInstalling(true);
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstalling(false);
    setShowInstall(false);
    setInstallEvent(null);
  }

  function applyUpdate() {
    updateReady?.waiting?.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  }

  return (
    <>
      {showInstall && (
        <aside className="pwa-prompt" role="dialog" aria-modal="false" aria-label="Install WheelMateDrive">
          <button className="pwa-close" onClick={dismiss} aria-label="Dismiss install prompt"><X size={18} /></button>
          <div className="pwa-logo"><WheelMateLogo className="pwa-brand-image" /></div>
          <div className="pwa-copy">
            <span className="pwa-kicker"><BellRing size={15} /> Faster bookings</span>
            <strong>Install WheelMateDrive</strong>
            <p>Add the app to your home screen for quick booking, trip alerts and offline access.</p>
          </div>
          <button className="btn btn-primary pwa-install" onClick={install} disabled={!installEvent || installing}>
            <Download size={17} /> {installing ? "Installing…" : installEvent ? "Install app" : "Install from browser"}
          </button>
        </aside>
      )}

      {showIosHelp && (
        <aside className="pwa-prompt" role="dialog" aria-label="Add WheelMateDrive to Home Screen">
          <button className="pwa-close" onClick={dismiss} aria-label="Dismiss instructions"><X size={18} /></button>
          <div className="pwa-logo"><WheelMateLogo className="pwa-brand-image" /></div>
          <div className="pwa-copy">
            <span className="pwa-kicker"><Share2 size={15} /> iPhone & iPad</span>
            <strong>Add WheelMateDrive to Home Screen</strong>
            <p>Tap Share in Safari, then choose <b>Add to Home Screen</b>.</p>
          </div>
          <button className="btn btn-secondary pwa-install" onClick={dismiss}>Got it</button>
        </aside>
      )}

      {updateReady && (
        <aside className="pwa-update" role="status">
          <RefreshCw size={18} />
          <span><strong>Update available</strong><small>A newer WheelMateDrive version is ready.</small></span>
          <button className="btn btn-primary" onClick={applyUpdate}>Update</button>
          <button className="icon-button" onClick={() => setUpdateReady(null)} aria-label="Dismiss update"><X size={17} /></button>
        </aside>
      )}
    </>
  );
}
