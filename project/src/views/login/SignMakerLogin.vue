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
                    <select  id="ukeySelect" name="ukeySelect" v-model="ukeySelect">
                         <option v-for="(item, index) in  ukeydata" :key="index" :value="item.CertID" >{{item.CertCN}}</option>
                    </select>
                </div>
                <div class="form_item">
                    <div id="login" type="button" class="btn btn-default"  @click="showdialog">登录</div>
                </div>
                <h6 v-if="h4Title">请稍等，正在进行UKEY验证……</h6>
                <h6 v-if="title_1">正在获取UKEY证书</h6>
                <h6 v-if="title_2">Pin码错误，请重新输入</h6>
                <h6 v-if="title_3">正在进行签名挑战</h6>
                <h6 v-if="title_4">计算哈希失败</h6>
                <h6 v-if="title_5">计算签名失败</h6>

                <!-- 输入密码的弹框 -->
                <div class="dialog" v-if="ifshow">
                    <div id="layerPagePinCode">
                        请输入PIN码：<br />
                        <input type="password" name="ukeyPinCode" class="form-control" v-model="ukeyPinCode"/>
                        <span id="pinError"></span>
                    </div>
                    <div class="btnBox">
                        <button id="yes" type="button" @click="btnLogin">确认</button>
                    </div>
                    <div class="closedialog" @click="closedialog">X</div>
                </div>
            </form>
         <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'
import qs from 'qs'
import HeadTop from "../../components/header"
import FootBottom from '../../components/footer'
export default {
    data(){
        return{
           ukeydata:null,
           ukeySelect:null,
           ukeyPinCode:null,
           certSN:null,
           ValidateCode:null,
           ifshow:false,
           h4Title:false,
           title_1:false,
           title_2:false,
           title_3:false,
           title_4:false,
           title_5:false,
        }
    },
     components:{
        HeadTop,
        FootBottom
    },
    created(){
        var that=this;
        //向cookie内存ValidateCode，
        this.axios.get("/Login/SignMakerLogins").then(function(res){
            that.ValidateCode=res.data.data
        })
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
        ...mapMutations([
            "New_makerCertSN",
            "New_loginStatus",
        ]),
        
        btnLogin:function(){
            this.ifshow=false;
            var _this=this;
            this.VerifyPin(JSON.stringify({
                    CertID: this.certSN,
                    Pin: this.ukeyPinCode
                }),(verifyPinRet)=>{
                    console.log(verifyPinRet);
                   if (verifyPinRet != "Ok") {
                        this.title_2=true;
                        this.ukeyPinCode=null;
                    } else {
                        this.title_3=true; 
                        var hashInput = {
                            CertID: _this.certSN,
                            DataBase64:_this.encode(_this.ValidateCode)
                        };
                        console.log(hashInput);
                        this.ComputeHash(JSON.stringify(hashInput),
                            function (hashRet) {
                                var hashRetObject = JSON.parse(hashRet);
                                console.log(hashRetObject);
                                if (hashRetObject.error != "Ok") {
                                    _this.title_4=true; 
                                    return;
                                }
                                var sigInput = {
                                    CertID: _this.certSN,
                                    HashBase64: hashRetObject.hash,
                                    StrPin:_this.ukeyPinCode
                                };
                                console.log(sigInput);
                                _this.SignByHash(JSON.stringify(sigInput),
                                    function (sigRet) {
                                        var sigRetObject = JSON.parse(sigRet);
                                        if (sigRetObject.error != "Ok") {
                                            _this.title_5= true;
                                            return;
                                        }
                                        var dataToPost = {
                                            ArrayNo: _this.certSN,
                                            ValidateCode: _this.ValidateCode
                                        };
                                        console.log(_this.ValidateCode);
                                        _this.$store.commit('New_makerCertSN',{CertSN:_this.certSN,Code:_this.ValidateCode});
                                        sessionStorage.setItem("New_makerCertSN",_this.certSN);
                                        sessionStorage.setItem("New_ValidateCode",_this.ValidateCode);
                                        // myPost("/Login/SignMakerLogin", dataToPost);
                                        _this.axios({
                                            method: 'POST',
                                            url: '/Login/SignMakerLogines',
                                            data: qs.stringify(dataToPost),
                                            headers:{
                                                'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
                                            }
                                            }).then(function(result){
                                                console.log(result);
                                                // _this.$store.commit('RECORD_USERINFO',{data:null,Status:true,power:1});
                                                _this.$store.commit('New_loginStatus',{loginStatus:true,loginPower:1});
                                                // _this.$store.commit('New_loginStatus',true);
                                                // _this.$store.commit('New_loginPower',1);
                                                sessionStorage.setItem("loginStatus",true)
                                                sessionStorage.setItem("loginPower",1)
                                                _this.$router.push('/ProduceSign/Create');
                                            }).catch(function(err){
                                                if(err.response) {
                                                    console.log(err.response)
                                                    //控制台打印错误返回的内容
                                                }
                                            }
                                        )
                                    }
                                );
                            }
                        );
                    }
                })

        },
        showdialog(){
            this.ifshow=true;
            this.h4Title=true;
            this.certSN=this.ukeySelect;
            this.title_1=true;
        },
        closedialog:function(){
            this.ukeyPinCode=null;
            this.ifshow=false;
        },
        EnumKey:function (funcBack, errorCallBack) {
            var that=this;
            var socket = new WebSocket("ws://127.0.0.1:2012/CertInfo");
            try {
                socket.onerror = errorCallBack;
                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send("abc");
                };
                socket.onmessage = function (e) {
                    if (that.isNumber(e.data)) {
                        funcBack("");
                    } else {
                        //alert(e.data);
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

                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(certSN);
                };
                socket.onmessage = function (e) {
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

                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function (e) {
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

                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function (e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        ComputeHash: function (strJson, funcBack) {
            //alert(certSN);
            var socket = new WebSocket("ws://127.0.0.1:2012/Hash");
            try {

                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function (e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }

        },
        GetAuth: function (strJson, funcBack) {

            //alert(strJson);
            var socket = new WebSocket("ws://127.0.0.1:2012/Auth");
            try {

                // socket.onopen = function (msg) {
                socket.onopen = function () {

                    //alert("连接成功！");
                    socket.send(strJson);
                };
                socket.onmessage = function (e) {
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

                // socket.onopen = function (msg) {
                socket.onopen = function () {
                    socket.send(certSN);
                };
                socket.onmessage = function (e) {
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

                // socket.onopen = function (msg) {
                socket.onopen = function () {
                    socket.send(certSN);
                };
                socket.onmessage = function (e) {
                    funcBack(e.data);
                    socket.close();
                };
            }
            catch (ex) {
                funcBack("");
                socket.close();
            }
        },
        isNumber: function (val) {

            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        },
        encode : function (input) {
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) +
                    _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) +
                    _keyStr.charAt(enc4);
            }
            return output;
        },
        // decode : function (input) {
        //     var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        //     var output = "";
        //     var chr1, chr2, chr3;
        //     var enc1, enc2, enc3, enc4;
        //     var i = 0;
        //     input = input.replace(/[^A-Za-z0-9+/=]/g, "");
        //     while (i < input.length) {
        //         enc1 = _keyStr.indexOf(input.charAt(i++));
        //         enc2 = _keyStr.indexOf(input.charAt(i++));
        //         enc3 = _keyStr.indexOf(input.charAt(i++));
        //         enc4 = _keyStr.indexOf(input.charAt(i++));
        //         chr1 = (enc1 << 2) | (enc2 >> 4);
        //         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        //         chr3 = ((enc3 & 3) << 6) | enc4;
        //         output = output + String.fromCharCode(chr1);
        //         if (enc3 != 64) {
        //             output = output + String.fromCharCode(chr2);
        //         }
        //         if (enc4 != 64) {
        //             output = output + String.fromCharCode(chr3);
        //         }
        //     }
        //     output = this._utf8_decode(output);
        //     return output;
        // },
        _utf8_encode : function (string) {
            // var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            if(string){
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
            }
            return utftext;
        },
        // _utf8_decode : function (utftext) {
        //     // var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        //     var string = "";
        //     var i = 0;
        //     var c = 0;
        //     var c2=0,c3=0;

        //     while (i < utftext.length) {
        //         c = utftext.charCodeAt(i);
        //         if (c < 128) {
        //             string += String.fromCharCode(c);
        //             i++;
        //         } else if ((c > 191) && (c < 224)) {
        //             c2 = utftext.charCodeAt(i + 1);
        //             string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        //             i += 2;
        //         } else {
        //             c2 = utftext.charCodeAt(i + 1);
        //             c3 = utftext.charCodeAt(i + 2);
        //             string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        //             i += 3;
        //         }
        //     }
        //     return string;
        // }
           













    }
}
</script>

<style  >
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
    /* 弹框部分 */
    .dialog{
        width:300px;
        height:200px;
        position:absolute;
        top:40%;
        left:40%;
        box-sizing: border-box;
    }
    #layerPagePinCode{
        color:#fff;
        width:100%;
        height:150px;
        background:#393D49;
        box-sizing:border-box;
        padding:40px ;
    }
    #layerPagePinCode input{
        margin-top:10px;
    }
    .btnBox{
        width:100%;
        height:50px;
        box-sizing:border-box;
        background:#eee;
        padding:10px 120px;
    }
    .btnBox #yes{
        width:60px;
        height:30px;
        background:#1E9FFF;
        border:1px solid #1E9FFF;
        color:#fff;
        border-radius: 4px;
        cursor:pointer;
        text-align:center;
    }
    .btnBox #yes:hover{
        background:rgb(10, 128, 218);
    }
    .closedialog{
        width:30px;
        height:30px;
        font-size:24px;
        color:#fff;
        cursor:pointer;
        text-align: center;
        background:#222;
        line-height: 30px;
        position:absolute;
        top:0;
        right:0;
    }
</style>