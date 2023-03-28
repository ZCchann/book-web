import axios from "@/utils/axios"

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

//用户数据
export const login = ({username, password}) => {
    return http.post('/login', {username, password})
}

export const getAllUser = (page, pagesize) => {
    return http.get('/user/getAllUser', {
        params: {
            page: page,
            pagesize: pagesize
        }
    })
}
export const getOneUserData = id => {
    return http.get(`/user/getUser/${id}/`)
}

export const addUser = (data) => {
    return http.post('/user/addUser', data)
}

export const delUser = id => {
    return http.delete(`/user/delUser/${id}/`)
}

export const searchUserData = (username, page, pageSize) => {
    return http.get('/user/search/', {
        params: {
            username: username,
            page: page,
            pagesize: pageSize
        }
    })
}

export const editUser = (data) => {
    return http.post('/user/updateUser', data)
}


//图书数据
export const getAllData = (page, pagesize) => {
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

export const editData = (data) => {
    return http.post('/book/editData', data)
}
export const addData = (data) => {
    return http.post('/book/addData', data)
}

export const searchData = (title, page, pageSize) => {
    return http.get('/book/search/', {
        params: {
            title: title,
            page: page,
            pagesize: pageSize
        }
    })
}