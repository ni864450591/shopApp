/**
 * @description 成功返回的数据模型
 */
class SccessModel {
 constructor(data) {
     this.errno = 0
     if (data !== null) {
         this.data = data
     }
 }
}

module.exports=SccessModel


// 外面这么用
// new SccessModel() // ({errno: 0})
// new SccessModel({...})//{errno:0,data:{...} }

