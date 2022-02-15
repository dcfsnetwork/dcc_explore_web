import axios from 'axios'

axios.defaults.baseURL = `${location.origin}/api/`
axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const STATUS_CODE = {
  SUCCESS: 200,
  ERROR: 500
}

let reqNum: number = 0 //请求总次数

const reqHandler = (type: 'add' | 'minus' = 'add') => {
  'add' === type ? ++reqNum : --reqNum
}

// 全部接口结束 统一报错（防止重复报错）
const showErrorMsg = () => {
  reqHandler('minus')
  if (0 === reqNum) {
  }
}

axios.interceptors.response.use(
  res => {
    if (STATUS_CODE.SUCCESS === res.status) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  async error => {
    return Promise.reject(error)
  }
)

function axiosHandler(type: 'get' | 'post' | 'put' | 'delete' = 'get') {
  return async function (url: string, params = {}) {
    if (!url) return
    reqHandler()
    try {
      const res = await axios[type](url, params)
      showErrorMsg()
      return Promise.resolve((res as any).data)
    } catch (err) {
      showErrorMsg()
      return Promise.reject(err)
    }
  }
}

export const _get = axiosHandler()

export const _post = axiosHandler('post')

export const _put = axiosHandler('put')

export const _delete = axiosHandler('delete')
