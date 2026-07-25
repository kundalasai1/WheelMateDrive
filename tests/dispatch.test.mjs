import test from "node:test";
import assert from "node:assert/strict";
import {scoreDispatchCandidate, rankDispatchCandidates} from "../services/dispatch/scoring.ts";

test("ineligible drivers are excluded", () => {
  const result = scoreDispatchCandidate({id: "1", isAvailable: false, kycStatus: "approved"}, {city: "Bengaluru", transmissionType: "manual"});
  assert.equal(result.score, -1);
});

test("same-city transmission match ranks first", () => {
  const ranked = rankDispatchCandidates([
    {id: "a", city: "Bengaluru", averageRating: 4.7, completedTrips: 50, transmissionExperience: ["manual"], isAvailable: true, kycStatus: "approved"},
    {id: "b", city: "Mysuru", averageRating: 5, completedTrips: 100, transmissionExperience: ["manual"], isAvailable: true, kycStatus: "approved"},
  ], {city: "Bengaluru", transmissionType: "manual"});
  assert.equal(ranked[0].id, "a");
  assert.ok(ranked[0].score > ranked[1].score);
});
