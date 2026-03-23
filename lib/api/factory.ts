import { RequestOptions } from "@/types/api/request"
import { apiRequest } from "./request"
import { IdType } from "@/types/common"

export class FactoryRequest<T, TCreate = Required<T>, TUpdate = Partial<T>> {
    #endpoint = ''

    
    constructor(endpoint: string) {
        this.#endpoint = endpoint
    }
    
    create = (data: TCreate, options: RequestOptions = {}) => {
        return apiRequest<T>(`${this.#endpoint}`, {method: "POST", body: JSON.stringify(data), ...options})
    }
    
    get = (id: IdType, options: RequestOptions = {})  => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, options)
    }
    
    getAll =   (options: RequestOptions = {}) => {
         return apiRequest<T[]>(this.#endpoint,options)
    }

    update = (id: IdType, data: TUpdate, options: RequestOptions = {}) => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, {method: 'PUT', body: JSON.stringify(data), ...options})
    }

    updateProp = (id: IdType, data: TUpdate, options: RequestOptions = {}) => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, {method: 'PATCH', body: JSON.stringify(data), ...options})
    }
    
    delete = (id: IdType, options: RequestOptions = {}) => {
        return apiRequest<T>(`${this.#endpoint}/${id}`, {method: 'DELETE', ...options})
    }
}
