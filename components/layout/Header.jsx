import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./HeaderClient";

/**
 * SERVER HEADER
 * Fetches the latest user context from the database/Clerk sync.
 */
export default async function Header() {
  const user = await checkUser();
  
  return <HeaderClient user={user} />;
}
