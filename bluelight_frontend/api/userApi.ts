import { User } from "@/types/user";
import { UpdateProfileRequest } from "@/types/user";
import { api, HttpMethod } from "./api";

export const userRoutes = {
  login: () => `user/login`,
  read: () => `user/me`,
  updateProfile: () => `user/updateProfile`
}

export const login = async(userRequest : User, notificationMessage: string, token : string) : Promise<User> => {
  return await api({
    route: userRoutes.login(),
    method: HttpMethod.GET,
    body: userRequest,
    notificationMessage: notificationMessage,
    token: token,
  })
}

export const read = async(token : string) : Promise<User> => {
  return await api({
    route: userRoutes.read(),
    method: HttpMethod.GET,
    token: token
  })
}

export const updateProfile = async(updateProfileRequest : UpdateProfileRequest, notificationMessage: string, token : string) : Promise<User> => {
  return await api({
    route: userRoutes.updateProfile(),
    method: HttpMethod.POST,
    body: updateProfileRequest,
    notificationMessage: notificationMessage,
    token: token
  })
}

export const userApi = {
  login,
  read,
  updateProfile
}