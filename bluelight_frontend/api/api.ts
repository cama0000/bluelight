import axios from "axios";
import { toast } from "sonner";

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
    notificationMessage?: string;
}

export const api = async (request: ApiRequest) => {
    const response = await axios({
        url: `${process.env.NEXT_PUBLIC_HOST_NAME}${request.route}`,
        method: request.method,
        data: request.body,
        headers: headers(request.token)
    })

    if(request.notificationMessage){
        toast.success(request.notificationMessage);
    }

    return response.data;
}