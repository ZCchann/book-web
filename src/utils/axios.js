import axios from 'axios'
import {ElMessage} from "element-plus";
import router from "@/router";
import {getStorage} from "@/utils/browser";


export default ({baseURL}) => {
    const http = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        timeout: 30000,
        // 是否跨站点访问控制请求
        // withCredentials: true,
        responseType: 'json',
    })

    // 请求拦截
    http.interceptors.request.use(
        (config) => {
            const jwt = getStorage('jwt')
            jwt && (config.headers.Authorization = jwt)
            return config
        },
        (err) => {
            console.log('请求拦截err:', err)
            return Promise.error(err)
        }
    )

    // 返回拦截
    http.interceptors.response.use(
        (response) => {
            return response.data
        },
        // 处理异常响应
        (err) => {
            if (err.response) {
                if (err.response.status === 401) {
                    localStorage.clear()
                    router.push('login')
                } else {
                    ElMessage({
                        type: 'error',
                        message: `${err.response.status}，${err.response.data.message}`
                    })
                }
            } else {
                ElMessage({
                    type: 'error',
                    message: `错误:${err.message}`
                })
            }
            return Promise.reject(err)
        }
    )
    return http
}

// const showStatus = (status) => {
//   let message = ''
//   switch (status) {
//     case 400:
//       message = '请求错误(400)'
//       break
//     case 401:
//       message = '未授权，请重新登录(401)'
//       break
//     case 402:
//       message = '拒绝访问(402)'
//       break
//     case 404:
//       message = '请求出错(404)'
//       break
//     case 408:
//       message = '请求超时(408)'
//       break
//     case 500:
//       message = '服务器错误(500)'
//       break
//     case 501:
//       message = '服务未实现(501)'
//       break
//     case 502:
//       message = '网络错误(502)'
//       break
//     case 503:
//       message = '服务不可用(503)'
//       break
//     case 504:
//       message = '网络超时(504)'
//       break
//     case 505:
//       message = 'HTTP版本不受支持(505)'
//       break
//     default:
//       message = `连接出错(${ status })!`
//   }
//   return `${ message }，请检查网络或联系管理员！`
// }
