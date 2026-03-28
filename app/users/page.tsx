import {
  createUserAction,
  deleteUserAction,
  getUserAction,
  getUsersAction,
  updateUserAction,
} from "@/actions/userActions";

export default async function UsersPage() {
  const users = await getUsersAction({ url: "http://localhost:3001/users" });

  const deletedUser = await deleteUserAction({ endpoint: "/users/20" });

  if (!users.success) {
    return <h1>{users.error.message}</h1>;
  }

  if (!deletedUser.success) {
    return <h1>{deletedUser.error.message}</h1>;
  }

  return <h1>Users Page {deletedUser.data.name}</h1>;
}
