// 獲取平台信息，小程序、h5、APP
export function getPlatform() {
    let platform
    //#ifdef APP-PLUS
    platform = 'app';
    //#endif
    //#ifdef H5
    platform = 'h5';
    //#endif
    //#ifdef MP-WEIXIN
    platform = 'wechat';
    //#endif
    return platform
}