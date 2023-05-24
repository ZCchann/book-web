import axios from "@/utils/axios"

export const http = axios({
    baseURL: process.env.VUE_APP_BASE_API
})

export const send_verification_code = (data) => {
    return http.get('/util/send_verification_code', {
        params: {
            email: data
        }
    })
}
