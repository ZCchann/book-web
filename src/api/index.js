import axios from "@/utils/axios"
import {getStorage} from "@/utils/browser";

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

//用户数据
export const login = ({username, password}) => {
    return http.post('/login', {username, password})
}
export const logout = ({username, password}) => {
    return http.post('/logout', {username, password})
}

export const getAllUser = (page, pagesize) => {
    return http.get('/user/getAllUser', {
        params: {
            page: page,
            pagesize: pagesize
        }
    })
}
export const getOneUserData = uuid => {
    return http.get(`/user/getUser/${uuid}/`)
}

export const addUser = (data) => {
    return http.post('/user/addUser', data)
}

export const delUser = uuid => {
    return http.delete(`/user/delUser/${uuid}/`)
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

export const searchData = (title, page, pageSize,start_time,end_time) => {
    return http.get('/book/search/', {
        params: {
            title: title,
            page: page,
            pagesize: pageSize,
            start_time:start_time,
            end_time:end_time
        }
    })
}

export const uploadData = (data) => {
    return http.post('/book/fileUpdate', data)
}

export const createOrder = (data) => {
    const headers = {
        headers: {uuid: getStorage("uuid")}
    };
    return http.post('/order/create', data, headers)
}

export const getOrder = () => {
    return http.get('/order/get_order', {
        headers: {
            uuid: getStorage("uuid")
        }
    })
}
export const getOrderDetails = (orderNumber) => {
    return http.get('/order/get_order_details', {
        params: {
            number: orderNumber
        }
    })
}

export const AddUserAddress = (data) => {
    const headers = {
        headers: {uuid: getStorage("uuid")}
    }
    return http.post('/user/add_user_address', data, headers)
}
export const getUserAllAddress = () => {
    return http.get('/user/get_user_all_address', {
        headers: {
            uuid: getStorage("uuid")
        }
    })
}
export const getUserAddress = (address_id) => {
    return http.get('/user/get_user_address', {
        headers: {
            uuid: getStorage("uuid")
        },
        params: {
            address_id: address_id
        }
    })
}

export const updateUserAddress = (data) => {
    return http.post('/user/update_address', data, {
        headers: {
            uuid: getStorage("uuid")
        }
    })
}
export const deleteUserAddress = (address_id) => {
    return http.delete('/user/del_address', {
        headers: {
            uuid: getStorage("uuid")
        },
        params:{
            address_id:address_id
        }
    })
}