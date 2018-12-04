<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">管理员登录</h2>
            <hr>
            <form action="" id="myForm">
                <div class="form_item">
                    <label for="username">用户名:</label><br>
                    <input type="text" id="username" name="UserName" v-model="UserName">
                </div>
                <div class="form_item">
                    <label for="upwd">密码:</label><br>
                    <input type="text" id="upwd" name="Remark" v-model="Remark">
                </div>
                <div class="form_item">
                    <button id="login" type="button" class="btn btn-default" @click="save">保存</button>
                </div>
            </form>
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
            Id:null,
            UserName:null,
            Remark:null
        }
    },
    created(){
        this.Id=this.$route.query.id;
        this.getdata(this.$route.query.id);  
    },
    components:{
        HeadTop,
        FootBottom
    },
    methods:{
        getdata(id){
             var that=this;
             console.log(this.$route.query.id);
            var formData=new FormData();
            formData.append('Id',id);
            this.axios.get("/SignMaker/Edits/"+id).then(function(res){
                console.log(res);
                that.UserName=res.data.data.userName;
                that.Remark=res.data.data.remark;
                // that.getdata(that.pageNum);
            })
         },
         save(){
             var that=this;
            this.axios.post('/SignMaker/Edit',{
                Id:this.Id,
                UserName:this.UserName,
                Remark:this.Remark,
            }).then(function(res){
                if(res.data.state==200){
                    that.$router.push("/SignMaker")
                }
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

<style scoped>
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
