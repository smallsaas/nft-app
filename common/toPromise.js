// let tools = require('../utils/CNTWtransformTools.js')
// 封裝Promise
export const toPromise = (fn) => {
	return (obj = {}) => {
		return new Promise((resolve, reject) => {
			obj.success = (res) => {
				res = res.data ? res.data : res
				//舊代碼
				// if (typeof res === "object") {
				// 	resolve(JSON.parse(tools.transformToTW(JSON.stringify(res))))
				// } else {
				// 	resolve(tools.transformToTW(res))
				// }
				if (typeof res === "object") {
					resolve(JSON.parse(JSON.stringify(res)))
				} else {
					resolve(res)
				}
			}
			obj.fail = (res) => {
				reject(res)
			}
			fn(obj)
		})
	}
}

module.export = {
	toPromise
}
