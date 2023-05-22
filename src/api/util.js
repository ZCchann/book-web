import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const send_verification_code = (data) => {
    return http.get('/util/send_verification_code', {
        params: {
            email: data
        }
    })
}
