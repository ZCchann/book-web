import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const login = ({ username, password }) => {
    return http.post('/login', { username, password })
}

export const getalldata = params => {
    return http.get('/book/getAllData')
}

export const deldata = isbn => {
    return http.delete(`/book/delData/${ isbn }/`)
}