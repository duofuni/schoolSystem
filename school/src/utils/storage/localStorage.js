import type from '@/utils/_typeOf/type'
/**
 * @description [localStorage]
 * @author duofuni
 */

class Storage {
    _isSupport = !!localStorage
    constructor () {}
    setLocal (key, value) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持local存储！')
        }
        if (!type.isString(key)) {
            return console.error(`${ key } is not string！`)
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
        localStorage.setItem(key, value)
        return true
    }
    getLocal (key) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持sesstion存储！')
        }
        if (!type.isString(key)) {
            return console.error(`${key} is not string！`)
        }
        const result = JSON.parse(localStorage.getItem(key))
        return result ? result : ''
    }
    clearLocal (key) {
        if (!this._isSupport) {
            return console.error('当前浏览器不支持sesstion存储！')
        }
        if (type.isString(key)) {
            localStorage.removeItem(key)
            return true
        }
        localStorage.clear()
        return true
    }
}

const L_Storage = new Storage()
export default L_Storage
