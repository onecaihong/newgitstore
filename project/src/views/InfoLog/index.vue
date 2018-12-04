<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">日志列表</h2>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>用户类别</th>
                        <th>操作类型</th>
                        <th>操作时间</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in info" :key="index">
                        <td>{{item.userName}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.manageType}}</td>
                        <td>{{item.createDate}}</td>
                        <td>{{item.remark}}</td>
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
            <div class="btngroup">
                <div>
                    <input type="button" id="btnBackUp" class="btn" @click="btnBackUp" value="备份" />
                    <span class="btn" style="position: relative;
                        display: inline-block;
                        overflow: hidden;cursor:pointer">
                    <span style="cursor:pointer;font-size:16px;font-weight:400;">上传</span>
                    <input type="file" name="fileRecover" id="fileRecover" style="position:absolute;
                        right: 0px;
                        top: 0px;
                        opacity: 0;cursor:pointer;
                        -ms-filter: 'alpha(opacity=0)';
                        font-size: 200px;">
                    </span>
                    <button id="btnRecover" class="btn"  @click="btnRecover">恢复</button>
                </div>
                <div class="btnline">
                    <input type="button" id="btnBackUpAll" class="btn"  @click="btnBackUpAll" value="备份全库" />
                    <span class=" btn  " style="position: relative;
                        display: inline-block;
                        overflow: hidden;cursor:pointer">
                        <span style="cursor:pointer;font-size:16px;font-weight:400;">上传</span>
                        <input type="file" name="fileRecoverAll" id="fileRecoverAll" style="position:absolute;
                        right: 0px;
                        top: 0px;
                        opacity: 0;cursor:pointer;
                        -ms-filter: 'alpha(opacity=0)';
                        font-size: 200px;">
                    </span>
                    <button id="btnRecoverAll" class="btn " @click="btnRecoverAll">恢复全库</button>
                </div>
            </div>  
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
                url: '/InfoLog/Index',
                data: formData
            }).then(function(res){
                console.log(res);
                that.total=res.data.total;
                that.info=res.data.data;
                // this.RECORD_USERINFO(res.data.data,res.status,1);
            }).catch(function(err){
                if(err.response) {
                    console.log(err.response)
                    //控制台打印错误返回的内容
                }
            })
        },
        myPost:function (url) {
            var form = document.createElement('form');
            form.action = url;
            form.method = 'post';  
            document.body.appendChild(form); 
            form.submit();
            document.body.removeChild(form);
        },
        btnBackUp:function(){
            this.myPost("http://localhost:54905/InfoLog/FileBackUp");
        },
        btnBackUpAll:function(){
            this.myPost("http://localhost:54905/InfoLog/BackUpAll");
        },
        btnRecover:function(){
            var fileObj = document.getElementById("fileRecover").files[0]; // js 获取文件对象
            if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                alert("请选择文件");
                return;
            }
            console.log(fileObj);
            if (fileObj.type == "text/plain") {
                var formFile = new FormData();
                formFile.append("action", "UploadFileRecover");
                formFile.append("file", fileObj);
                var data = formFile;
                console.log(data);
                this.axios({
                    method: 'POST',
                    url: '/InfoLog/FileRecover',
                    data: data,
                    dataType: "json",
                    cache: false,//上传文件无需缓存
                    processData: false,//用于对data参数进行序列化处理 这里必须false
                    contentType: false, //必须
                    }).then(function(result){
                        if (result.state == 'success') {
                            alert(result.message);
                        } else {
                            alert(result.message);
                        }
                    }).catch(function(err){
                        if(err.response) {
                            console.log(err.response)
                            //控制台打印错误返回的内容
                        }
                    })
                
            } else {
                alert("请选择正确的文件！");
            }
        },
        btnRecoverAll:function(){
            var fileObj = document.getElementById("fileRecoverAll").files[0]; // js 获取文件对象
            if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                alert("请选择文件");
                return;
            }
            console.log(fileObj);
            //if (fileObj.type == "text/plain") {
            var formFile = new FormData();
            formFile.append("action", "UploadFileRecover");
            formFile.append("file", fileObj);
            var data = formFile;
            console.log(data);
            this.axios({
                method: 'POST',
                url: '/InfoLog/FileRecoverAll',
                data: data,
                dataType: "json",
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                }).then(function(result){
                    if (result.state == 'success') {
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }
                }).catch(function(err){
                    if(err.response) {
                        console.log(err.response)
                        //控制台打印错误返回的内容
                    }
                })
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

<style scoped>
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
    .btngroup{
        margin:20px;
    }
    .btnline{
        margin-top:10px;
    }
    .btn{
        background:rgb(221,221,221);
        width:84px;
        font-size:16px;
        font-weight: 400;
        margin-right:5px;
        padding:3px 10px;
    }
</style>
