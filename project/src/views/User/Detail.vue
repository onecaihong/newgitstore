<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">管理员列表</h2>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>电话号码</th>
                        <th>电子邮箱</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in info" :key="index">
                        <td>{{item.userName}}</td>
                        <td>{{item.phoneNumber}}</td>
                        <td>{{item.email}}</td>
                    </tr>
                </tbody>
            </table>
          <router-link to="/user"></router-link>
        </div>
        
    </div>
</template>

<script>
import HeadTop from '../../components/header'
export default {
    data(){
        return {
            info:[],//数据
            id:''
        }
    },
    created(){
        this.getdata();
        this.id = this.$route.query.id;
    },
    components: {
        HeadTop
    },
    methods:{
        //  current_change(currentPage){  //改变当前页
        //      this.currentPage = currentPage
        //  },
         getdata(){
             var that=this;
             console.log(this);
             var formData=new FormData();
            formData.append('id',this.id);
            this.axios({
                method: 'get',
                url: '/User/Detail',
                 data: formData
            }).then(function(res){
                // that.total=res.data.total;
                // that.info=res.data.data;
                console.log(res.data.data);
                // this.RECORD_USERINFO(res.data.data,res.status,1);
            }).catch(function(err){
                if(err.response) {
                    console.log(err.response)
                    //控制台打印错误返回的内容
                }
            })
            // this.axios.get("/User/Detail",function(res){
            //     console.log(res);
            // })
         }
     }
}

</script>

<style>
h2{
        font-size:30px;
        font-weight:500;
    }
    table{
        width:100%;
        box-sizing:border-box;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom:40px;
    }
    tr{
        height:30px;
        
    }
    th{
        font-size:16px;
        font-weight: bold;
        color:#333;
    }
    th,td{
        text-align:center;
        height:30px;
        line-height:30px;
        padding:8px;
        border-bottom:2px solid rgb(189, 185, 185);
    }
    td a{
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        border:1px solid gray;
        color:#333;
    }
    td a:hover{
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
    }
    td button{
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        color:#fff;
        border:1px solid #d9534f;
        background:#d9534f;
        cursor:pointer;
    }
    td button:hover{
        background:#d32923;
        border:1px solid #d32923;
    }
</style>
