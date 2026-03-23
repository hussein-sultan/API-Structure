import { getUsers } from "@/services/userService";

export default async function UsersPage() {
  const users = await getUsers();
  return <h1>Users Page</h1>;
}
