import { ApiRequestConfig, ApiRequestError, ApiRequestInitConfig } from "@/types/api/request";
import { failureResult, Result, successResult } from "@/types/common/result";
import { isBodyInit } from "@/utils/request";

const BASE_URL = 'http://localhost:3001'

export async function apiRequest<T>(endpoint: string, options: ApiRequestConfig = {}): Promise<Result<T, ApiRequestError>> {
    const { method = 'GET', body, headers, next, ...customConfig } = options
    const normalizedEndpoint = endpoint.replace(/^\/+/, "")

    const config: ApiRequestInitConfig = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(headers as Record<string, string>)
        },
        next,
        ...customConfig
    }

    if (body !== undefined) {
        config.body = isBodyInit(body) ? body : JSON.stringify(body)
    }

    try {

        const url = new URL(normalizedEndpoint, `${BASE_URL}/`).toString()
        const response = await fetch(url, config)

        if (!response.ok) {
            return failureResult({
                message: `Request failed with status ${response.status}`,
                status: response.status,
                info: await response.text()
            }, response.status)
        }

        const data: T = await response.json()
        return successResult(data, response.status)

    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown fetch error"
        return failureResult({
            message,
            status: 500,
            info: { cause: error }
        }, 500)
    }
}