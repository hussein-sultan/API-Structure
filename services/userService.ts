import { createService } from "@/lib/api/factory";
import { PathType } from "@/types/common";
import { UserType } from "@/types/features/user";

const DEFAULT_USER_PATH: PathType = { endpoint: "/users" };

/**
 * Builds a user API client for any path (static or dynamic).
 */
export function createUserService(path: PathType = DEFAULT_USER_PATH) {
  return createService<UserType>(path);
}

/** Shared instance for the usual `/users` base — use when nothing is dynamic. */
export const userService = createUserService(DEFAULT_USER_PATH);

export const {
  create: createUser,
  delete: deleteUser,
  get: getUser,
  getAll: getUsers,
  update: updateUser,
  updateProp: updateUserProp,
} = userService;
