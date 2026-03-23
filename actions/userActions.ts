'use server'

import { getUsers, getUser, createUser, updateUser, deleteUser } from "@/services/userService"
import { IdType } from "@/types/common";
import { UserType } from "@/types/features/user";

export async function getUsersAction() {
    return await getUsers();
}

export async function getUserAction(id: IdType) {
    return await getUser(id);
}

export async function createUserAction(formData: UserType) {
    return await createUser(formData)
}

export async function updateUserAction(id: IdType, formData: Partial<UserType>) {
    return await updateUser(id,formData)
}

export async function deleteUserAction(id: IdType) {
    return await deleteUser(id)
}