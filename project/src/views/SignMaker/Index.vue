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
                        <th>证书序列号</th>
                        <th>证书使用者</th>
                        <th>证书颁发者</th>
                        <th>创建日期</th>
                        <th>备注</th>
                        <th>证书开始日期</th>
                        <th>证书过期日期</th>
                        <th>证书</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in info" :key="index">
                        <td>{{item.signMaker.userName}}</td>
                        <td>{{item.signMaker.arrayNo}}</td>
                        <td>{{item.subject}}</td>
                        <td>{{item.issuer}}</td>
                        <td>{{item.signMaker.createDate}}</td>
                        <td>{{item.signMaker.remark}}</td>
                        <td>{{item.notBefore}}</td>
                        <td>{{item.notAfter}}</td>
                        <td>
                            <a :href="'http://localhost:54905/SignMaker/DownCert/'+item.signMaker.id" download>点击下载</a>
                        </td>
                        <td>
                            <router-link :to="{ path: '/signmaker/detail', query: { id: item.signMaker.id }}">查看</router-link>
                            <router-link :to="{ path: '/signmaker/edit', query: { id: item.signMaker.id }}">编辑</router-link>
                            <button @click='del(item.signMaker.id)'>删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-pagination size="md" 
                :total-rows="total"
                prev-text="上一页"
                next-text="下一页"
                align="center"
                @change="getdata"
                hide-goto-end-buttons
                v-model="currentPage"
                :per-page="10" > 
            </b-pagination > 
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
            info:[],//数据
            currentPage:1, //默认当前页为第一页
            total:10,
            pageNum:1,
            isdel:false
        }
    },
    created(){
        this.getdata(this.currentPage);  
    },
    components: {
        HeadTop,
        FootBottom
    },
    methods:{
         getdata(pageNum){
             var that=this;
             that.pageNum=pageNum;
             console.log(this);
            var formData=new FormData();
            formData.append('PageSize',10);
            formData.append('PageIndex',pageNum);
            this.axios({
                method: 'POST',
                url: '/SignMaker/Index',
                data: formData
            }).then(function(res){
                console.log(res.data);
                that.total=res.data.total;
                that.info=res.data.data;
                 that.isdel=false
                // this.RECORD_USERINFO(res.data.data,res.status,1);
            }).catch(function(err){
                if(err.response) {
                    console.log(err.response)
                    //控制台打印错误返回的内容
                }
            })
         },
         del(param){
             var that=this;
            this.axios.get("/SignMaker/Delete/"+param).then(function(res){
                console.log(res);
                that.isdel=true;
                // that.getdata(that.pageNum);
            })
         },
         download(id){
            //  var that=this;
            // this.axios.get("/SignMaker/DownCert/"+id).then(function(res){
            //     console.log(res);
            //     // that.getdata(that.pageNum);
            // })
            var eleForm = ("<form method='get'></form>");

            eleForm.attr("action","/SignMaker/DownCert/"+id);

            (document.body).append(eleForm);

            //提交表单，实现下载
            eleForm.submit();
         }
     },
     watch: {
        isdel:function(value) {
            if(value)
                this.getdata(this.currentPage); 
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
