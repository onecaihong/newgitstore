<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">制章人列表</h2>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>序列号</th>
                        <th>证书使用者</th>
                        <th>证书颁发者</th>
                        <th>证书</th>
                        <th>创建日期</th>
                        <th>备注</th>
                        <th>证书开始日期</th>
                        <th>证书过期日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="info">
                        <td>{{signMaker.userName}}</td>
                        <td>{{signMaker.arrayNo}}</td>
                        <td>{{info.subject}}</td>
                        <td>{{info.issuer}}</td>
                        <td>
                            <a :href="'http://localhost:54905/SignMaker/DownCert/'+id" download>点击下载</a>
                        </td>
                        <td>{{signMaker.createDate}}</td>
                        <td>{{signMaker.remark}}</td>
                        <td>{{info.notBefore}}</td>
                        <td>{{info.notAfter}}</td>
                    </tr>
                </tbody>
            </table>
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
            info:{},//数据
            signMaker:{},
            id:null
        }
    },
    created(){
        this.id=this.$route.query.id;
        this.getdata(this.$route.query.id);  
    },
    components: {
        HeadTop,
        FootBottom
    },
    methods:{
         getdata(id){
             var that=this;
             console.log(this.$route.query.id);
            var formData=new FormData();
            formData.append('Id',id);
            this.axios.get("/SignMaker/Details/"+id).then(function(res){
                console.log(res);
                that.info=res.data.data;
                that.signMaker=res.data.data.signMaker;
                // that.getdata(that.pageNum);
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
