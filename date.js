// 当天零点时间戳
const zeroTime = new Date(new Date().toLocaleDateString()).valueOf(); 

/** Date 对象的 setHours 方法
 * Date.setHours(h,m,s,ms): number
 * hours: number
 * min?: number
 * sec?: number
 * ms?: number
 */
// 设置 2022/4/17 8:00:00, 返回时间戳
const time1 = new Date('2022/04/17').setHours(8,0,0,0); 
// 设定当天00:00:00
const time2 = new Date().setHours(0,0,0,0); 
// 设定当天23:59:59
const end1 = new Date().setHours(23,59,59,999); // 23:59:59时间