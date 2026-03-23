export interface RequestOptions extends RequestInit {
    body?: string;
    tags?: string[];
    revalidate?: number
}

export class RequestErrors extends Error {
    status?: number;
    info?: object

    constructor(message: string, status: number, info: object) {
        super(message)
        this.status = status;
        this.name = "Request Errors"
        this.info = info
    }
}