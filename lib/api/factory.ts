import { ApiRequestConfig, ApiRequestError } from "@/types/api/request"
import { Result } from "@/types/common/result"
import { apiRequest } from "./request"
import { IdType } from "@/types/common"

export class FactoryRequest<T, TCreate = Required<T>, TUpdate = Partial<T>> {
    #endpoint = ''


    constructor(endpoint: string) {
        this.#endpoint = endpoint
    }

    create = (data: TCreate, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(`${this.#endpoint}`, { method: "POST", body: data, ...options })
    }

    get = (id: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, options)
    }

    getAll = (options: ApiRequestConfig = {}): Promise<Result<T[], ApiRequestError>> => {
        return apiRequest<T[]>(this.#endpoint, options)
    }

    update = (id: IdType, data: TUpdate, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, { method: 'PUT', body: data, ...options })
    }

    updateProp = (id: IdType, data: TUpdate, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, { method: 'PATCH', body: data, ...options })
    }

    delete = (id: IdType, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, { method: 'DELETE', ...options })
    }
}
