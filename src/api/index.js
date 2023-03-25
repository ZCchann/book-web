import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

export const login = ({username, password}) => {
    return http.post('/login', {username, password})
}

export const getalldata = (page, pagesize) => {
    return http.get('/book/getAllData', {
        params: {
            page: page,
            pagesize: pagesize
        }
    })
}

export const delData = id => {
    return http.delete(`/book/delData/${id}/`)
}

export const getData = id => {
    return http.get(`/book/getData/${id}/`)
}

// export const editData = ({id, isbn, tittle, price, press, type, restriction, author, publication_date}) => {
//     return http.post('/book/editData', {id, isbn, tittle, price, press, type, restriction, author, publication_date})
// }

export const editData = (data) => {
    return http.post('/book/editData', data)
}