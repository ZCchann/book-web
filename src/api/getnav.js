import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const getNav = () => {
    return http.get('user/get_route')
}