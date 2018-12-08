<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">添加制章人</h2>
            <p>请插入制章人UKEY后点击按钮进行添加</p>
            <hr>
            <form action="" id="myForm">
                <div class="form_item">
                    <label for="username">用户名:</label><br>
                    <input type="text" id="username" name="UserName" v-model="UserName">
                </div>
                <div class="form_item">
                    <label for="upwd">备注:</label><br>
                    <input type="text" id="upwd" name="Remark" placeholder="无特殊说明可空" v-model="Remark">
                </div>
                <div  style="display:none">
                    <input type="text"  id="ArrayNo" name="ArrayNo" placeholder="certSN" v-model="ArrayNo">
                </div>
                <div style="display:none">
                    <input type="text"  id="Certificator" name="Certificator" placeholder="certBase64" v-model="Certificator">
                </div>
                <div class="form_item">
                    <label for="upwd">请选择UKEY:</label><br>
                    <select id="ukeySelect" name="ukeySelect" v-model="ukeySelect">
                        <option v-for="(item, index) in  ukeydata" :key="index" :value="item.CertID" >{{item.CertCN}}</option>
                    </select>
                </div>
                <div class="form_item">
                    <button id="login" type="button" class="btn btn-default" @click="Create">添加制章人</button>
                </div>
            </form>


        <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import HeadTop from '../../components/header'
import FootBottom from '../../components/footer'

export default {
    data(){
        return {
            ukeydata:{},
            UserName:null,
            Remark:null,
            ArrayNo:null,
            Certificator:null,
            ukeySelect:null
        }
    },
    components:{
        HeadTop,
        FootBottom
    },
    created(){
        this.EnumKey( (data)=> {
                var datas=JSON.parse(data);
                console.log(datas);     
                this.ukeydata=datas.CertInfolist;
                console.log("--------");     
            },
             ()=> {
                    alert("未安装UKEY支持服务！");
            })
    },
    methods:{
        EnumKey:function (funcBack, errorCallBack) {
            var that=this;
            var socket = new WebSocket("ws://127.0.0.1:2012/CertInfo");
            try {
                socket.onerror = errorCallBack;
                socket.onopen = function () {

                    // alert("连接成功！");
                    socket.send('abc');
                };
                socket.onmessage = function(e) {
                    if (that.isNumber(e.data)) {
                        alert(11);
                        funcBack("");
                    } else {
                        // alert(e.data);
                        funcBack(e.data);
                    }
                };
            }
            catch (ex) {
                funcBack("");
            }
        },
        GetCertAndSeal:function (certSN, funcBack) {
            //alert(certSN);
            var socket = new WebSocket("ws://127.0.0.1:2012/SealAndCertBase64");
            try {

                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(certSN);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        SignByHash:function (strJson, funcBack) {

            //alert(strJson);
            var socket = new WebSocket("ws://127.0.0.1:2012/SignDataEx");
            try {

                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        VerifyPin:function (strJson, funcBack) {

            //alert(strJson);
            var socket = new WebSocket("ws://127.0.0.1:2012/VerifyPin");
            try {

                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        GetPinCode:function (certSN, funcBack) {
            //alert(certSN);
            var socket = new WebSocket("ws://127.0.0.1:2012/PromptPin");
            try {

                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(certSN);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        GetAuth:function (strJson, funcBack) {

            //alert(strJson);
            var socket = new WebSocket("ws://127.0.0.1:2012/Auth");
            try {

                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
         GetSerialId:function (certSN, funcBack) {
            var socket = new WebSocket("ws://127.0.0.1:2012/SerialId");
            try {

                socket.onopen = function () {
                    socket.send(certSN);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        GetProducts:function (certSN, funcBack) {
            var socket = new WebSocket("ws://127.0.0.1:2012/Products");
            try {

                socket.onopen = function () {
                    socket.send(certSN);
                };
                socket.onmessage = function(e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }
        },
        isNumber:function(val) {

            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        },
        Create: function(){
            this.GetCertAndSeal(this.ukeySelect,(certAndSeal)=>{
                this.ArrayNo=this.ukeySelect;
                 var certAndSealJObject = JSON.parse(certAndSeal);
                 if (certAndSealJObject.CertBase64.length != 0) {
                    var certBase64 = certAndSealJObject.CertBase64;
                    // DisplayMessage("正在获取UKEY序列号");
                    // $('#ArrayNo').val(certSN);
                    // $('#Certificator').val(certBase64);
                    this.Certificator=certBase64;
                    // var UserName = $('#UserName').val();
                    // var ArrayNo = $('#ArrayNo').val();
                    // var Certificator = $('#Certificator').val();
                    // var Remark = $('#Remark').val();
                    // var ukeySelect = $('#ukeySelect').val();

                    if (this.UserName == '' || this.UserName == 'undefined') {
                        alert('用户名不能为空');
                        return;
                    }
                    var ukeyInput =
                    {
                        UserName: this.UserName,
                        ArrayNo:  this.ArrayNo,
                        Certificator:  this.Certificator,
                        Remark:  this.Remark,
                        ukeySelect:  this.ukeySelect
                    };
                    var that=this;
                    this.axios({
                        method: 'POST',
                        url: '/SignMaker/Create',
                        data: qs.stringify(ukeyInput),
                        headers:{
                            'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
                        }
                        }).then(function(result){
                            console.log(result);
                            if (result.data.state == 200) {
                                alert("成功添加制章人");
                                that.$router.push("/signmaker");
                            } else {
                                alert(result.message);
                            }
                        }).catch(function(err){
                            if(err.response) {
                                console.log(err.response)
                                //控制台打印错误返回的内容
                            }
                        }
                    )
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
