/**
 * @description [use new Date () to get the time]
 * @author duofuni
 */

const getTime = ()=> {
  let date = new Date()
  let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return time
}
export default getTime
