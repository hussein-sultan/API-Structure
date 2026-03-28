'use server'

import { createService } from "@/lib/api/factory";
import { PathType } from "@/types/common";
import { UserType } from "@/types/features/user";

export async function getUsersAction(path: PathType) {
    const  {getAll} = createService<UserType>(path)
    return await getAll()
}

export async function getUserAction(path: PathType) {
    // return await getUser(id);
    // const get = createService<UserType>({endpoint: `users`}).get
    // return await get(id)
    const get = createService<UserType>(path).get
    return await get()
}

export async function createUserAction(path: PathType, data: Partial<UserType>) {
    // return await createUser()
    const { create } = createService<UserType>(path)
    return await create(data)
}

export async function updateUserAction(path: PathType, data: Partial<UserType>) {
    // return await updateUser(id,formData)
    const { update } = createService<UserType>(path)
    return await update(data)
}

export async function deleteUserAction(path: PathType) {
    // return await deleteUser(id)

    const { delete: deleteUser } = createService<UserType>(path)
    return await deleteUser()
}