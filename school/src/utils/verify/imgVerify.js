/** 
 * @description [Picture format verification]
 * @author duofuni
 */

const regExp = {
  _img:/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/
}
const imgVerify = (e,warning)=>{
  warning = ''
  let file = e.target.files[0]
  if (file.size > 1048576) {
    warning='图片大小不得超过1Mb！'
  }
  if (!regExp._img.test(e.target.value)) {
    warning='图片类型仅支持.gif,jpeg,jpg,png,bmp！'
  }
  return warning
}
export default imgVerify
