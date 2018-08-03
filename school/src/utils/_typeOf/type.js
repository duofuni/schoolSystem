class Type{
  _types = [
    'String',
    'Number',
    'Boolean', 
    'Object', 
    'Array',
    'Function',
    'Undefined',
    'Null'
  ]
  constructor(){
    this._checkType(this._types)
  }
  _checkType(_types){
    _types.forEach((_type) => {
      this[`is${_type}`] = (param) =>{
        return Object.prototype.toString.call(param).slice(8,-1) === _type
      }
    })
  }
}

const type = new Type()

export default  type