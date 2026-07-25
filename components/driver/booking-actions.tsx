"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

const actionsByStatus: Record<string, {action: string; label: string}[]> = {
  driver_assigned: [{action: "accept", label: "Accept trip"}, {action: "reject", label: "Reject"}],
  confirmed: [{action: "en_route", label: "Start journey to pickup"}],
  driver_en_route: [{action: "arrived", label: "Mark arrived"}],
  trip_started: [{action: "pause", label: "Pause"}, {action: "complete", label: "Complete trip"}],
  trip_paused: [{action: "resume", label: "Resume"}, {action: "complete", label: "Complete trip"}],
};

export function BookingActions({bookingId, status}: {bookingId: string; status: string}) {
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const actions = actionsByStatus[status] ?? [];

  async function update(action: string) {
    const reason = action === "reject" ? window.prompt("Reason for rejection (optional)") ?? undefined : undefined;
    setBusy(action); setError("");
    try {
      const response = await fetch(`/api/driver/bookings/${bookingId}/status`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({action, reason})});
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Update failed");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Update failed");
    } finally { setBusy(""); }
  }

  if (!actions.length) return null;
  return <div className="driver-actions">{actions.map(item => <button key={item.action} className={item.action === "reject" ? "btn btn-secondary btn-small" : "btn btn-primary btn-small"} onClick={() => update(item.action)} disabled={Boolean(busy)}>{busy === item.action ? "Updating…" : item.label}</button>)}{error && <small className="form-error">{error}</small>}</div>;
}
