let tools = require('../utils/CNTWtransformTools.js')
// 封装Promise
export const toPromise = (fn) => {
  return (obj = {}) => {
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        res = res.data ? res.data : res
        resolve(JSON.parse(tools.transformToTW(JSON.stringify(res))))
      }
      obj.fail = (res) => {
        reject(res)
        // console.log('reject==', res)
      }
      fn(obj)
    })
  }
}

module.export = {
  toPromise
}
