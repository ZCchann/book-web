import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const getNav = uuid => {
    return http.get(`permissions/get_route/${uuid}/`)
}