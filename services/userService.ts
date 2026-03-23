import { FactoryRequest } from "@/lib/api/factory";
import { UserType } from "@/types/features/user";
// import { UserType } from "@/types/features/user";

const ENDPOINT = "/users";

const userService = new FactoryRequest<UserType>(ENDPOINT);

export const {
  create: createUser,
  delete: deleteUser,
  get: getUser,
  getAll: getUsers,
  update: updateUser,
  updateProp: updateUserProp,
} = userService;

