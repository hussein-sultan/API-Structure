import {  RequestErrors, RequestOptions } from "@/types/api/request";
import { HTTP_STATUS } from "../constants/statusCode";

const BASE_URL = 'http://localhost:3001'

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}) : Promise<T> {
    const { method = 'GET', body, headers,revalidate, tags, ...customConfig } = options
    const normalizedEndpoint = endpoint.replace(/^\/+/, "")
    
    const config : RequestOptions = {
        method, 
        headers: {
            'Content-Type' : 'application/json',
            ...(headers as Record<string, string>)
        },
        next: {
            tags, revalidate
        },
        ...customConfig
    }

    if (body !== undefined) config.body = typeof body === 'string' ? body : JSON.stringify(body)
    
    try {
        
        const url = new URL(normalizedEndpoint, `${BASE_URL}/`).toString()

        const response = await fetch(url, config)

        if(response.status === HTTP_STATUS.NOT_FOUND) // come back
        
        if (!response.ok) console.log(response) // come back
        
        return await response.json() 

    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown fetch error"
        return new RequestErrors(message, 500, { cause: err }) as T
    }
} 