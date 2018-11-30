/**
 * @description [use new Date () to get the time]
 * @author duofuni
 */
let date = new Date();

const getTime = () => {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  }
module.exports = getTime
  