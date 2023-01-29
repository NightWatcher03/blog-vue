/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-12-02 16:31:31
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-02 16:36:44
 * @FilePath: \blog-vue\src\untils\secret\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CryptoJS from 'crypto-js';

const secretKey="shouyerenzhttty";
//加密
export const EnCrypt=(data)=>{
    return CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
}).toString()
}

//解密
export const DeCrypt=(data)=>{
    return CryptoJS.DES.decrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8);
}