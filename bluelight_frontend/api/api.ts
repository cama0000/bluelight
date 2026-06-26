import axios from "axios";

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export const headers = (token?: string) => {
    return {
        "Authorization": `Bearer ${token}`
    }
}

export interface ApiRequest {
    route: string;
    method: HttpMethod;
    body?: any;
    token: string;
}

export const api = async (request: ApiRequest) => {
    const response = await axios({
        url: `${process.env.NEXT_PUBLIC_HOST_NAME}${request.route}`,
        method: request.method,
        data: request.body,
        headers: headers(request.token)
    })

    return response.data;
}