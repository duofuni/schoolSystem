/**
 * @description [use new FileReader () && new Promise to get picture url]
 * @author duofuni
 */

const imgSrc = (e)=> {
    const promises = []
    const _isSupport = !!FileReader
    if (!_isSupport) {
      return console.error('您的浏览器不支持图片上传，请升级您的浏览器')
    }
    [].forEach.call(e.target.files,file=>{//类数组继承[]的原型方法
      const reader = new FileReader();
      reader.readAsDataURL(file)
      const promise = new Promise((reslove)=> {
        reader.onload = (event)=> {
          reslove(event.target.result)
        }
      })
      promises.push(promise)
    })
    return Promise.all(promises)
  }
  export default imgSrc