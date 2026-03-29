'use server'

import { createUserService } from "@/services/userService";
import { PathType } from "@/types/common";
import { UserType } from "@/types/features/user";

export async function getUsersAction(path: PathType) {
    const { getAll } = createUserService(path)
    return await getAll()
}

export async function getUserAction(path: PathType) {
    const get = createUserService(path).get
    return await get()
}

export async function createUserAction(path: PathType, data: Partial<UserType>) {
    const { create } = createUserService(path)
    return await create(data)
}

export async function updateUserAction(path: PathType, data: Partial<UserType>) {
    const { update } = createUserService(path)
    return await update(data)
}

export async function deleteUserAction(path: PathType) {
    const { delete: deleteUser } = createUserService(path)
    return await deleteUser()
}
