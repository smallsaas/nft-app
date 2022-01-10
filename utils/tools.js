import {globalConfig} from '@/config.js'
export const Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    
    // public method for encoding
    , encode (input) {
      let output = "";
      let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let enc4;
      let i = 0;
    
      input = Base64._utf8_encode(input);
    
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
    
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
    
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
          enc4 = 64;
        }
    
        output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      } // Whend
    
      return output;
    } // End Function encode
    
    
    // public method for decoding
    , decode (input) {
      let output = "";
      let chr1; let chr2; let chr3;
      let enc1; let enc2; let enc3; let enc4;
      let i = 0;
    
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
    
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
    
        output += String.fromCharCode(chr1);
    
        if (enc3 != 64) {
          output += String.fromCharCode(chr2);
        }
    
        if (enc4 != 64) {
          output += String.fromCharCode(chr3);
        }
    
      } // Whend
    
      output = Base64._utf8_decode(output);
    
      return output;
    } // End Function decode
    
    
    // private method for UTF-8 encoding
    , _utf8_encode (string) {
      let utftext = "";
      string = string.replace(/\r\n/g, "\n");
    
      for (let n = 0; n < string.length; n++) {
        const c = string.charCodeAt(n);
    
        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
    
      } // Next n
    
      return utftext;
    } // End Function _utf8_encode
    
    // private method for UTF-8 decoding
    , _utf8_decode (utftext) {
      let string = "";
      let i = 0;
      let c; let c1; let c2; let c3;
      c = c1 = c2 = 0;
    
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
    
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        }
        else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        }
        else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
    
      } // Whend
    
      return string;
    } 
}
    //生成随機 GUID 數
export const guid = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
// 設置定時緩存
export const timeCache=(key,value,seconds = 3600 *24)=>{
		let nowTime = Date.parse(new Date()) / 1000;
		if (key && value) {
			let expire = nowTime + Number(seconds);
			uni.setStorageSync(key,JSON.stringify(value) + '|' +expire)
			// console.log('已經把' + key + '存入緩存,過期時間爲' + expire)
		} else if (key && !value) {
			let val = uni.getStorageSync(key);
			if (val) {
				// 緩存存在，判斷是否過期
				let temp = val.split('|')
				if (!temp[1] || temp[1] <= nowTime) {
					uni.removeStorageSync(key)
					// console.log(key + '緩存已失效')
					return '';
				} else {
					return JSON.parse(temp[0]);
				}
			}
		}
}
// 設置永久緩存 獲取永久緩存 清除永久緩存 清除所偶有緩存
export const cache={
	get(key){
		return uni.getStorageSync(key)
	},
	set(key,value){
		uni.setStorageSync(key,value)
	},
	remove(key){
		uni.removeStorageSync(key)
	},
	clear(){
		uni.clearStorageSync()
	}
}
// 重新加載當前頁面 (帶onload參數)
export const reload=()=>{
	let pages = getCurrentPages()
	let nowPage = pages[pages.length-1];
	uni.redirectTo({
		url:nowPage.$page.fullPath
	})
}
// 公共上傳
export const upload = async(url,file) =>{
	let res = await new Promise(resolve=>{
		let token = cache.get(globalConfig.tokenStorageKey)
		console.log(token)
		uni.uploadFile({
			url:globalConfig.endpoint+url,
			header:{
				Authorization:`Bearer ${token}`
			},
			file:file,
			name:"file",
			complete(webPath){
				let webData = webPath.data
				if(typeof webData === "string"){
					webData = JSON.parse(webPath.data)
				}
				console.log(webData)
				if(webData.code == 200){
						let fileWebPath = webData.data.url
						resolve(fileWebPath)
				}else{
					uni.showToast({
						icon:"error",
						title:"上傳失敗"
					})
					resolve(`data:image/png;base64,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`)
				}
			}
		})
	})
	return res
}
// 無權限返回登錄頁
export const unToken = (code) =>{
	console.log(code)
	if([401,"401",403,"403"].includes(code)){
		uni.showToast({
			title:"請先登錄！",
			success() {
				uni.navigateTo({
					url:`/pages/login_new/login_new`
				})
			}
		})
		return ;
	}
}