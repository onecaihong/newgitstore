<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">管理员登录</h2>
            <hr>
            <form action="" id="myForm">
                <div class="form_item">
                    <label for="username">用户名:</label><br>
                    <input type="text" id="username" name="UserName">
                </div>
                <div class="form_item">
                    <label for="upwd">密码:</label><br>
                    <input type="password" id="upwd" name="UserName">
                </div>
                <div class="form_item">
                    <button id="login" type="button" class="btn btn-default">登录</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
import HeadTop from './components/header'

export default {
    components:{
        HeadTop
    },
}
</script>

<style >
    h2{
        font-size:30px;
        font-weight:500;
    }
    .form_item{
        width:400px;
        height:60px;
    }
    .form_item label{
        font-size:16px;
    }
    .form_item input{
        height:24px;
        width:300px;
        font-size:18px;
        border-radius: 4px;
        border:1px solid black;
    }
    .form_item input:focus{
        border-color:aqua;

    }
    .btn{
        padding:6px 8px;
        border:1px solid #222;
        border-radius: 3px;
        background:#fff;
        cursor:pointer;
    }
    .btn:hover{
        background:greenyellow
    }
</style>
