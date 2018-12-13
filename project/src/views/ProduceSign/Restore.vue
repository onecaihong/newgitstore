<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">恢复印章</h2>
            <hr>
            <b-card  no-body > 
            <b-tabs  card > 
                <b-tab  no-body  title = "UKEY制章" @click="info=true;Cer_info=false" active > 
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">选择恢复的UKEY</label>
                            <div class="col-sm-10" style="line-height: 30px;">
                                <select id="userCertID" name="ukeySelect" class="form-control" v-model="userCertSN">
                                    <option v-for="(item, index) in  ukeySelect" :key="index" :value="item.CertID" >{{item.CertCN}}</option>
                                </select>
                            </div>
                        </div>
                        <input type="hidden" id="sealBase64" />
                        <div class="form-group">
                            <div class="offset-sm-4 col-sm-2">
                                <input id="btnCreate" type="button"  @click="btnCreate"  :disabled="isDisabled?true:false" value="验证印章" class="btn btn-default" />
                            </div>
                        </div>
                    </form>


                </b-tab > 
            </b-tabs > 
            </b-card >
            <div  v-show="info">
                <h6 v-if="title_1">正在从服务器获取印章数据</h6>
                <h6 v-if="title_2">正在恢复印章</h6>
                <h6 v-if="title_3">印章恢复完成</h6>
                <!-- <h6 v-if="title_4">印章验证错误</h6>
                <h6 v-if="title_5">{{returnmsg}}</h6>
                <h6 v-if="title_6">印章验证完成</h6> -->
            </div>
           
           <!-- ukey输入密码的弹框 -->
            <!-- <div class="dialog" v-if="ifshow">
                <div class="layerPagePinCode">
                    请输入PIN码：<br />
                    <input type="password" name="ukeyPinCode" class="form-control" v-model="ukeyPinCode"/>
                    <span>{{pinError}}</span>
                </div>
                <div class="btnBox">
                    <button class="yes" type="button" @click="btnyes">确认</button>
                </div>
                <div class="closedialog" @click="closedialog">X</div>
            </div>  -->
        <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import { mapState ,mapMutations} from 'vuex'
import HeadTop from '../../components/header'
import FootBottom from '../../components/footer'

export default {
    data(){
        return {
            userCertSN:null,    //userCertID
            userCertBase64:null,
            sealBase64:null,
            ukeySelect:null,
            info:true,
            title_1:false,
            title_2:false,
            title_3:false,
            isDisabled:false,   // 验章按钮是否禁用
            // ifshow:false,       // ukey密码框
            // ukeyPinCode:null,
            // pinError:null,
        }
    },
    computed: {
       ...mapState([
           'makerCertSN',
           'ValidateCode'
       ])
    },
    created(){
        if (sessionStorage.getItem("New_makerCertSN") ) {
            this.$store.commit('New_makerCertSN',{CertSN:sessionStorage.getItem("New_makerCertSN"),Code:sessionStorage.getItem("New_ValidateCode")});
            // this.$store.commit('New_loginPower',JSON.parse(sessionStorage.getItem("loginPower")));
        }
        console.log(this.makerCertSN);
        console.log(this.ValidateCode);
        this.EnumKey( (data)=> {
                var datas=JSON.parse(data);
                console.log(datas);     
                this.ukeySelect=datas.CertInfolist;
                console.log("--------");     
            },
             ()=> {
                    alert("未安装UKEY支持服务！");
            })
    },
    components:{
        HeadTop,
        FootBottom
    },
    methods:{
        ...mapMutations([
            "New_makerCertSN",
        ]),
        btnCreate:function(){
            this.isDisabled=true;
            this.title_1=true;
            this.title_2=false;
            this.title_3=false;
            var certSN = this.userCertSN;
            console.log(certSN);
            this.GetCertAndSeal(certSN, (certAndSeal) =>{
                var certAndSealJObject = JSON.parse(certAndSeal);
                if (certAndSealJObject.CertBase64.length != 0) {
                    this.userCertBase64 = certAndSealJObject.CertBase64;
                    this.title_2=true;
                }
            }).then(()=>{
                 return this.getSealBase64()
            }).then(()=>{
                 return this.WriteUkey()
            }).then(()=>{
                         this.axios({
                            method: 'POST',
                            url: '/ProduceSign/Restore',
                            data: qs.stringify(this.userCertSN),
                            headers:{
                                'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
                            }
                            }).then((res)=>{
                                console.log(res);
                                this.userCertBase64=null;
                                this.title_3=true;
                        })
                         this.isDisabled=false;
            })
        },
        getSealBase64:function(){
            var _this=this;
            console.log(this.userCertSN);
            return new Promise(function (resolve, reject){
                _this.axios.get("/ProduceSign/GetRestoreSeal?certSN="+ _this.userCertSN).then(function(data){
                    _this.sealBase64=data.data;
                    _this.title_2=true;
                    resolve();
                })
            })
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
            return new Promise(function (resolve, reject){
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
                        resolve();
                    };
                }
                catch (ex) {
                    funcBack("");
                    socket.close();
                }
                // finally {
                //     return dtd.promise();
                // }
            })
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
        // ukey写入印章数据
        WriteUkey:function () {
            // var dtd = $.Deferred();
            var _this = this;
            return new Promise(function (resolve, reject){
                var uri = "ws://127.0.0.1:2012/WriteUkey";
                var socket = new WebSocket(uri);
                socket.onopen = function () {
                    console.log("connected");
                    var data = {
                        certID: _this.userCertSN,
                        fileName: "_HNCA_GMSEAL_",
                        dataBase64: _this.sealBase64
                    };
                    console.log(data);
                    socket.send(JSON.stringify(data));
                };
                socket.onclose = function () { console.log("closed"); };
                socket.onmessage = function (e) {
                    console.log(e.data);
                    if (e.data == "Ok") {
                        resolve();
                    }else{
                        _this.isDisabled=false;
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
                // return dtd.promise();
            })
        },
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
    .control-label{
        font-size:16px;
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
    .layerPagePinCode{
        color:#fff;
        width:100%;
        height:150px;
        background:#393D49;
        box-sizing:border-box;
        padding:40px ;
    }
    .layerPagePinCode input{
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
