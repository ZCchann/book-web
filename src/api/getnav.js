import axios from "@/utils/axios"

export const http = axios({
    baseURL: process.env.VUE_APP_BASE_API
})

export const getNav = uuid => {
    return http.get(`permissions/get_route/${uuid}/`)
}