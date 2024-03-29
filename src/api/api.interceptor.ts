import axios from "axios"
import { errrorCatch, getContentType } from "./api.helper"
import { getAccessToken, removeFromStorage } from "@/services/auth/auth.helper"
import { AuthService } from "@/services/auth/auth.service"


const axiosOptions = {
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)


/*Перехватчики - это функции, которые выполняются перед отправкой запроса. Они позволяют модифицировать конфигурацию запроса перед отправкой или обрабатывать ошибки.
reguest - отправлено на бэк*/

instance.interceptors.request.use(async config => {
    const accessToken = getAccessToken()

    if(config && config.headers && accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})


/*Обработчик `config => config` означает, что он принимает объект конфигурации запроса и возвращает его без изменений. */
instance.interceptors.response.use( config => config, 
    async error =>{
        const originalRequest = error.config
        if(
            (error?.response?.status === 401 || 
                errrorCatch(error)==="jwt expired" ||
                errrorCatch(error) ==="jwt must be provided") &&
            error.config &&
            !error.config._isRetry
        ){
            originalRequest._isRetry = true
            try{
                /*Получение новых токенов*/
                await AuthService.getNewTokens()
                return instance.request(originalRequest)
            } catch(error){
                /*В случае ошибки очистить токены */
                if(errrorCatch(error) ==="jwt expired")
                removeFromStorage()
            }
        }
        throw error
    }
)