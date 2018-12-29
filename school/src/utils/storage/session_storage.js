import type from '@/utils/_type_of/type'

/** 
 * @description [sessionStorage]
 * @author duofuni
 */

class Storage {
    _isSupport = !!sessionStorage
    constructor () {}
    setSession (key, value) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持sesstion存储！')
        }
        if (!type.isString(key)) {
            return console.error(`${key} is not string！`)
        }
        // 存储失败
        if (!type.isObject(value) && 
            !type.isArray(value) && 
            !type.isString(value) && 
            !type.isBoolean(value) &&
            !type.isNumber(value)) {
            return false
        }
        // Object,Array to string
        if (!type.isString(value)) {
            value = JSON.stringify(value)
        }
        // 存储数据
        sessionStorage.setItem(key, value)
        return true
    }
    getSession (key) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持sesstion存储！')
        }
        if (!type.isString(key)) {
            return console.error(`${key} is not string！`)
        }
        const result = JSON.parse(sessionStorage.getItem(key))
        return result ? result : ''
    }
    clearSession (key) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持sesstion存储！')
        }
        if (type.isString(key)) {
            sessionStorage.removeItem(key)
            return true
        }
        sessionStorage.clear()
        return true
    }
}

const S_Storage = new Storage()
export default S_Storage