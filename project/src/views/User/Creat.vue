<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">编辑管理员</h2>
            <hr>
            <form action="" id="editAdmin">
                <div class="form_item">
                    <label for="username">用户名:</label><br>
                    <input type="text" id="username" name="UserName" v-model="UserName">
                </div>
                <div class="form_item">
                    <label for="upwd">密码:</label><br>
                    <input type="text" id="upwd" name="Pwd" v-model="Pwd">
                </div>
                <div class="form_item">
                    <label for="username">电话号码:</label><br>
                    <input type="text" id="phonenumber" name="PhoneNumber" v-model="PhoneNumber">
                </div>
                <div class="form_item">
                    <label for="upwd">电子邮箱:</label><br>
                    <input type="text" id="email" name="Email" v-model="Email">
                </div>
                <div class="form_item">
                    <div id="login" class="btn btn-default" @click="add">保存</div>
                </div>
            </form>
          <router-link to="/user">调回列表页面</router-link>
         <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import HeadTop from '../../components/header'
import FootBottom from '../../components/footer'

export default {
    data(){
        return {
            id:'',
            UserName:'',
            Pwd:'',
            PhoneNumber:'',
            Email:'',
        }
    },
    created(){
        this.id = this.$route.query.id;
    },
    components: {
        HeadTop,
        FootBottom
    },
    methods:{
         add(){
             var that=this;
            this.axios.post('/User/Create',{
                Id:this.id,
                UserName:this.UserName,
                Pwd:this.Pwd,
                PhoneNumber:this.PhoneNumber,
                Email:this.Email,
                //  data: formData
            }).then(function(res){
                if(res.status==200){
                    console.log(1);
                    that.$router.push("/user");
                }
                console.log(res.data.data);
            }).catch(function(err){
                if(err.response) {
                    console.log(err.response)
                    //控制台打印错误返回的内容
                }
            })
         }
     }
}

</script>

<style>
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
        width:80px;
        padding:6px 8px;
        border:1px solid #222;
        border-radius: 3px;
        background:#fff;
        cursor:pointer;
    }
    .btn:hover{
        background:rgb(147, 148, 145)
    }
</style>
