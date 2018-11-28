<template>
    <div >
        <head-top></head-top>
       <div class="container">
            <h2 style="margin:20px 0 0 0">制章人登录</h2>
            <h3 style="margin-top:0">请插入UKEY后点击按钮进行登录</h3>
            <hr>
            <form action="" id="myForm">
                <div class="form_item">
                    <label for="username">请选择使用的UKEY:</label>
                    <select  id="ukeySelect" name="ukeySelect"></select>
                </div>
                <div class="form_item">
                    <button id="login" type="button" class="btn btn-default">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import HeadTop from "../../components/header"
export default {
    data(){
        return{
           
        }
    },
     components:{
        HeadTop,
        
    },
}
</script>

<style>

</style>