export type DispatchCandidate = {
  id: string;
  city?: string;
  averageRating?: number;
  completedTrips?: number;
  transmissionExperience?: string[];
  isAvailable?: boolean;
  kycStatus?: string;
};

export type DispatchRequest = {
  city: string;
  transmissionType: "manual" | "automatic";
};

export type ScoredCandidate = DispatchCandidate & {
  score: number;
  reasons: string[];
};

export function scoreDispatchCandidate(candidate: DispatchCandidate, request: DispatchRequest): ScoredCandidate {
  let score = 0;
  const reasons: string[] = [];

  if (!candidate.isAvailable || candidate.kycStatus !== "approved") {
    return {...candidate, score: -1, reasons: ["Driver is not dispatch eligible"]};
  }

  if ((candidate.city ?? "").toLowerCase() === request.city.toLowerCase()) {
    score += 45;
    reasons.push("Same operating city");
  }

  if ((candidate.transmissionExperience ?? []).includes(request.transmissionType)) {
    score += 25;
    reasons.push(`${request.transmissionType} transmission experience`);
  }

  const rating = Math.max(0, Math.min(5, candidate.averageRating ?? 0));
  score += Math.round(rating * 4);
  if (rating >= 4) reasons.push("Strong customer rating");

  const trips = Math.max(0, candidate.completedTrips ?? 0);
  score += Math.min(10, Math.floor(trips / 10));
  if (trips >= 25) reasons.push("Experienced driver");

  return {...candidate, score, reasons};
}

export function rankDispatchCandidates(candidates: DispatchCandidate[], request: DispatchRequest): ScoredCandidate[] {
  return candidates
    .map(candidate => scoreDispatchCandidate(candidate, request))
    .filter(candidate => candidate.score >= 0)
    .sort((a, b) => b.score - a.score || (b.averageRating ?? 0) - (a.averageRating ?? 0));
}
