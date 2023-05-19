import axios from "@/utils/axios"
import {getStorage} from "@/utils/browser";

export const http = axios({
    baseURL: "http://127.0.0.1:5000"
})

//用户数据
export const login = ({username, password}) => {
    return http.post('/login', {username, password})
}
export const logout = () => {
    return http.post('/logout')
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

export const searchData = (title, page, pageSize, start_time, end_time) => {
    return http.get('/book/search/', {
        params: {
            title: title,
            page: page,
            pagesize: pageSize,
            start_time: start_time,
            end_time: end_time
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

export const getOrder = (page, pagesize) => {
    return http.get('/order/get_order', {
        headers: {
            uuid: getStorage("uuid")
        },
        params: {
            page: page,
            pagesize: pagesize
        }
    })
}

// 获取所有订单
export const getAllOrder = (page, pagesize) => {
    return http.get('/order/get_all_order', {
        params: {
            page: page,
            pagesize: pagesize
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
        params: {
            address_id: address_id
        }
    })
}

//权限管理
// get_permissions_id_name 返回所有的权限组名称、ID号
export const get_permissions_id_name = () => {
    return http.get('/permissions/get_permissions_id_name')
}

// get_permissions_by_id 传入权限组ID,返回权限详情
export const get_permissions_by_id = (permissions_id) => {
    return http.get('/permissions/get_permissions_by_id', {
        params: {
            permissions_id: permissions_id
        }
    })
}
// get_permissions_demo 返回一个空的权限组信息
export const get_permissions_demo = () => {
    return http.get('/permissions/get_permissions_demo')
}

// add_permission 添加一个新的权限信息
export const add_permissions_by_id = (data) => {
    return http.post('/permissions/add_permission', data)
}

export const update_permissions_by_id = (data) => {
    return http.post('/permissions/update_permissions_by_id', data)
}

// del_permissions_by_id 删除权限 通过权限组ID信息
export const del_permissions_by_id = (data) => {
    return http.delete('/permissions/del_permissions_by_id',
        {
            data: data
        })
}