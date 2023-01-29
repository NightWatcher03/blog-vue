/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-12-11 22:55:16
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-20 23:42:54
 * @FilePath: \blog-vue\src\untils\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const add0=(m,type)=>{return m<10?'0'+m:m }
export const format=(shijianchuo,type)=>
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
if(type){
    return y+'-'+add0(m)
}else{
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

}