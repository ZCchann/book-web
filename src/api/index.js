import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const login = ({ username, password }) => {
    return http.post('/login', { username, password })
}

export const getalldata = (page,pagesize) => {
    return http.get('/book/getAllData',{
        params:{
        page:page,
        pagesize:pagesize
    }})
}

export const deldata = isbn => {
    return http.delete(`/book/delData/${ isbn }/`)
}