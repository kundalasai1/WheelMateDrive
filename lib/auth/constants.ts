export const SESSION_COOKIE = "wheelmate_session";
export const SESSION_TTL_DAYS = 7;
export const USER_ROLES = ["customer","driver","admin","support","operations"] as const;
export type UserRole = (typeof USER_ROLES)[number];
