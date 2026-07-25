"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export function DispatchButton({bookingId}: {bookingId: string}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function dispatch() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/auto-dispatch`, {method: "POST"});
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Dispatch failed");
      setMessage(body.matched ? `Matched · score ${body.score}` : "No eligible driver found");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Dispatch failed");
    } finally {
      setBusy(false);
    }
  }

  return <div className="dispatch-action"><button className="btn btn-primary btn-small" onClick={dispatch} disabled={busy}>{busy ? "Matching…" : "Auto match"}</button>{message && <small>{message}</small>}</div>;
}
