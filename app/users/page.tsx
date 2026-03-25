import { getUser } from "@/services/userService";

export default async function UsersPage() {
  const user = await getUser(10);

  if (!user.success) {
    return <h1>Users Page: {user.error.message}</h1>;
  }

  return <h1>Users Page {user.data.name}</h1>;
}
