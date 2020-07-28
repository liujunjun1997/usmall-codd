import Vue from "vue"
var vm=new Vue();
 

// 弹框成功
export const successAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:"success"
    });
}

//警告弹框
export const warningAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:"warning"
    });
}

//错误框
export const errorAlert=(msg)=>{
    vm.$message.error(msg);
}