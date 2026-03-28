import { ApiRequestConfig, ApiRequestError } from "@/types/api/request"
import { Result } from "@/types/common/result"
import { apiRequest } from "./request"
import { IdType, PathType } from "@/types/common"

export class FactoryRequest<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
    #path: PathType


    constructor(path: PathType = {}) {
        this.#path = path
    }
    

    create = (data: TCreate, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(this.#path, { method: "POST", body: data, ...options })
    }

    get = (id?: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>({ ...this.#path, endpoint: `${this.#path.endpoint}/${id ?? ''}` }, options)
    }

    getAll = (options: ApiRequestConfig = {}): Promise<Result<T[], ApiRequestError>> => {
        return apiRequest<T[]>(this.#path, options)
    }

    update = (data: TUpdate, id?: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>({ ...this.#path, endpoint: `${this.#path.endpoint}/${id ?? ''}` }, { method: 'PUT', body: data, ...options })
    }

    updateProp = (data: TUpdate, id?: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>({ ...this.#path, endpoint: `${this.#path.endpoint}/${id ?? ''}` }, { method: 'PATCH', body: data, ...options })
    }

    delete = (id?: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>({ ...this.#path, endpoint: `${this.#path.endpoint}/${id ?? ''}` }, { method: 'DELETE', ...options })
    }
}

// this function is used to create a new service for a given path object, {url?: string, endpoint?: string}
export function createService<T>(path: PathType){
    return new FactoryRequest<T>(path)
}