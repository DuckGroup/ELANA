export type User = {
  id: string;
  email: string;
  role: "admin" | "user" | "guest";
  auth0Id: string;
  createdAt: string;
  updatedAt: string;
};
