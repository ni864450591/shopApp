/**
 * @description 错误返回的数据模型
 */
 class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno
        if (message !== null) {
            this.message = message
        }
    }
   }
   
   module.exports=ErrorModel
   //new ErrorModel(10001,'注册失败')