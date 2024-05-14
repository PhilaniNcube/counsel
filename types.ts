import type { Database } from "./schema";

export type ExtendedMember = {
	id: number;
	created_at: string;
	profile_id: string;
	org_id: number;
	role: "admin" | "member" | "manager";
  profile: {
    id: string;
    email: string;
    full_name: string;
    updated_at: string | null;
  }
};
