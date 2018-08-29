/**
 * @description [form verification]
 * @author duofuni
 */

const regExp = {
  _name: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,
  _account: /^[a-zA-z]\w{3,15}$/,
  _password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,
  _phone: /^(13|15|17|18)\d{9}$/
}
const verify = (user, warning)=> {
  warning = ''
  if ('newPassword' in user && 'reNewPassword' in user) {
    if (user.newPassword !== user.reNewPassword) {
      warning = "两次密码不一致！"
    }
  }
  if ('password' in user && 'rePassword' in user) {
    if (user.password !== user.rePassword) {
      warning = "两次密码不一致！"
    }
  }
  if ('reNewPassword' in user) {
    if (!regExp._password.test(user.reNewPassword)) {
      warning = "请输入6〜14位的字母或数字与字母组合的确认密码！"
    }
  }
  if ('newPassword' in user) {
    if (!regExp._password.test(user.newPassword)) {
      warning = "请输入6〜14位的字母或数字与字母组合的新密码！"
    }
  }
  if ('originalPassword' in user) {
    if (!regExp._password.test(user.originalPassword)) {
      warning = "请输入6〜14位的字母或数字与字母组合的旧密码！"
    }
  }
  if ('phone' in user) {
    if (!regExp._phone.test(user.phone)) {
      warning = "请填写有效的手机号码！"
    }
  }
  if ('sex' in user) {
    if (!user.sex) {
      warning = "请填写性别！"
    }
  }
  if ('rePassword' in user) {
    if (!regExp._password.test(user.rePassword)) {
      warning = "请输入6〜14位的字母或数字与字母组合的确认密码！"
    }
  }
  if ('password' in user) {
    if (!regExp._password.test(user.password)) {
      warning = "请输入6〜14位的字母或数字与字母组合的密码!"
    }
  }
  if ('account' in user) {
    if (!regExp._account.test(user.account)) {
      warning = "请输入4〜14位由字母开头、数字、下划线组成的账号！"
    }
  }
  if ('name' in user) {
    if (!regExp._name.test(user.name)) {
      warning = "请输入正确姓名！"
    }
  }
  return warning
}
export default verify
