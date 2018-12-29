const mustBePassword = (value) => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
const mustBeAccount = (value) => /^[a-zA-z]\w{3,15}$/.test(value);
const mustBeChinese = value => /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(value);
const mustBePhone = value => /^(13|15|17|18)\d{9}$/.test(value);

export { mustBePassword, mustBeAccount, mustBeChinese, mustBePhone };