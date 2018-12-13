<template>
    <div >
        <head-top></head-top>
        <div class="container">
            <h2 style="margin:20px 0">制章</h2>
            <hr>
            <b-card  no-body > 
            <b-tabs  card > 
                <b-tab  no-body  title = "UKEY制章"  active > 
                    <form class="form-horizontal">
                        <div class="form-group ">
                            <label for="sealName" class="col-sm-2 control-label">印章名称</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="sealName" v-model="sealName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealType" class="col-sm-2 control-label">印章类型</label>
                            <div class="col-sm-10" id="typeValue ">
                                <select id="sealType" name="sealType" class="form-control" v-model="sealType">
                                    <option value="">请选择</option>
                                    <option value="1">单位印章</option>
                                    <option value="2">个人印章</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealStartTime" class="col-sm-2 control-label">印章生效时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="sealStartTime" v-model="startTime"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealEndTime" class="col-sm-2 control-label">印章作废时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="sealEndTime" v-model="endTime"/>
                            </div>
                        </div>
                        <!-- <input id="makerCertID" type="text" value="@ViewBag.makerArrayNo" class="form-control" /> -->
                        <div class="form-group " id="ukey">
                            <label class="col-sm-2 control-label">用户UKEY</label>
                            <div class="col-sm-10" style="line-height: 30px;">
                                <select id="userCertID" name="ukeySelect" class="form-control" v-model="userCertSN">
                                    <option v-for="(item, index) in  ukeySelect" :key="index" :value="item.CertID" >{{item.CertCN}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">印章图片</label>
                            <div class="col-md-10">
                                <!-- <input type="hidden" id="picBase64" readonly="readonly" /><br /> -->
                                <img id="pic" :src="picUrl" style="max-width: 100%; border: 1px solid gray;" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">生成方式</label>
                            <div class="col-md-10">
                                <div class="form-inline">
                                    <input type="radio" name="picGenerateType" checked="checked" value="自动生成" @click="autoOrNot = true"/>
                                    <input type="button" id="generate" value="自动生成" :disabled="autoOrNot?false:true" @click="generate" class="btn btn-default" />
                                </div>
                                <br />
                                <div class="form-inline">
                                    <input type="radio" name="picGenerateType" value="手动上传"   @click="autoOrNot = false"/>
                                    <input type="file" name="upimage" id="upload_file" :disabled="autoOrNot?true:false" class="form-control" @change="upload_file"  ref="inputer" style="max-width: 260px" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="sealBase64" />
                        <input type="hidden" id="sealHashBase64" />
                        <input type="hidden" id="sealSigBase64" />
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <input id="btnCreate" type="button" value="创建" @click="btnCreate" :disabled="isDisabled?true:false" class="btn btn-default" />
                            </div>
                        </div>
                    </form>


                </b-tab > 
                <b-tab  no-body  title = "证书制章" > 
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="sealName" class="col-sm-2 control-label">印章名称</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Cer_sealName" v-model="Cer_sealName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealType" class="col-sm-2 control-label">印章类型</label>
                            <div class="col-sm-10" id="Cer_typeValue ">
                                <select id="Cer_sealType" name="sealType" class="form-control" v-model="Cer_sealType">
                                    <option value="">请选择</option>
                                    <option value="1">单位印章</option>
                                    <option value="2">个人印章</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealStartTime" class="col-sm-2 control-label">印章生效时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="Cer_sealStartTime" v-model="Cer_startTime"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sealEndTime" class="col-sm-2 control-label">印章作废时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="Cer_sealEndTime" v-model="Cer_endTime"/>
                            </div>
                        </div>
                        <!-- <input id="makerCertID" type="text" value="@ViewBag.makerArrayNo" class="form-control" /> -->
                        <div class="form-group " id="cer">
                            <label class="col-sm-2 control-label">用户证书</label>
                            <div class="col-sm-10" style="line-height: 30px;">
                                <input @change="uploadPhoto($event)" type="file" id="Cer_ImportConfig">
                                <!-- <button type="button" class="btn btn-default" id="Cer_ImportConfig">点击上传证书</button>
                                <span id="Cer_filename"></span> -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">印章图片</label>
                            <div class="col-md-10">
                                <!-- <input type="hidden" id="picBase64" readonly="readonly" /><br /> -->
                                <img id="Cer_pic" :src="Cer_picUrl" style="max-width: 100%; border: 1px solid gray;" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">生成方式</label>
                            <div class="col-md-10">
                                <div class="form-inline">
                                    <input type="radio" name="picGenerateType" checked="checked" value="自动生成"  @click="Cer_autoOrNot = true"/>
                                    <input type="button" id="Cer_generate" value="自动生成" :disabled="Cer_autoOrNot?false:true" class="btn btn-default" @click="Cer_generate"/>
                                </div>
                                <br />
                                <div class="form-inline">
                                    <input type="radio" name="picGenerateType" value="手动上传"  @click="Cer_autoOrNot = false"/>
                                    <input type="file" name="upimage" id="Cer_upload_file" :disabled="Cer_autoOrNot?true:false" @change="cer_upload_file" ref="inputer" class="form-control"  style="max-width: 260px" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="Cer_sealBase64" />
                        <input type="hidden" id="Cer_sealHashBase64" />
                        <input type="hidden" id="Cer_sealSigBase64" />
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <input id="Cer_btnCreate" type="button" value="创建" @click="Cer_btnCreate" :disabled="Cer_isDisabled?true:false"  class="btn btn-default" />
                            </div>
                        </div>
                    </form>

                </b-tab > 
                
            </b-tabs > 
            </b-card >
            <h6 v-if="title_1">正在获取UKEY证书</h6>
            <h6 v-if="title_2">制章人UKEY与用户UKEY不能为同一个</h6>
            <h6 v-if="title_3">正在验证PIN码</h6>
            <h6 v-if="title_4">未插入制章人UKEY，无法完成操作</h6>
            <h6 v-if="title_5">正在制章...</h6>
            <h6 v-if="title_6">制章成功</h6>
            <a href="" id="target" download="a.stamp"></a>
            <!-- ukey输入密码的弹框 -->
            <div class="dialog" v-if="ifshow">
                <div class="layerPagePinCode">
                    请输入PIN码：<br />
                    <input type="password" name="ukeyPinCode" class="form-control" v-model="ukeyPinCode"/>
                    <span>{{pinError}}</span>
                </div>
                <div class="btnBox">
                    <button class="yes" type="button" @click="btnyes">确认</button>
                </div>
                <div class="closedialog" @click="closedialog">X</div>
            </div>
            <!-- 证书制章 输入密码的弹框 -->
            <div class="dialog" v-if="Cer_ifshow">
                <div class="layerPagePinCode">
                    请输入PIN码：<br />
                    <input type="password" name="ukeyPinCode" class="form-control" v-model="Cer_ukeyPinCode"/>
                    <span>{{Cer_pinError}}</span>
                </div>
                <div class="btnBox">
                    <button class="yes" type="button" @click="Cer_btnyes">确认</button>
                </div>
                <div class="closedialog" @click="Cer_closedialog">X</div>
            </div>
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
            sealName:null,  //印章名称
            sealType:null,  //印章类型
            startTime:null, //印章生效时间
            endTime:null,   //印章作废时间
            Cer_sealName:null,  //证书制章 印章名称
            Cer_sealType:null,  //证书制章 印章类型
            Cer_startTime:null, //证书制章 印章生效时间
            Cer_endTime:null,   //证书制章 印章作废时间
            userCertSN:null,    //userCertID
            makerCertBase64:null,
            userCertBase64:null,
            sealBase64:null,
            picBase64:null,     // 印章图片base64
            picUrl:null,        //ukey制章印章图片url
            Cer_picUrl:null,    //证书制章印章图片url
            sealHashBase64:null,
            sealSigBase64:null,
            ukeySelect:null,
            ifshow:false,       // ukey密码框
            ukeyPinCode:null,
            pinError:null,
            Cer_ifshow:false,       // ukey密码框
            Cer_ukeyPinCode:null,
            Cer_pinError:null,     // ukey密码框
            autoOrNot:true,   // 控制生成方式类型
            Cer_autoOrNot:true, // 控制生成方式类型
            title_1:false,
            title_2:false,
            title_3:false,
            title_4:false,
            title_5:false,
            title_6:false,
            isDisabled:false,
            Cer_isDisabled:false,
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
        generate:function(){
            this.GeneratePic(this.userCertSN,(value)=>{
                var retJObject = JSON.parse(value);
                console.log(retJObject);
                if (retJObject.error == "Ok") {
                    var picBase64 = retJObject.picBase64;
                    this.picUrl="data:image/png;base64," + picBase64;
                    // $("#pic").attr("src", "data:image/png;base64," + picBase64);
                   this.picBase64=picBase64;
                }
            })
        },
        Cer_generate:function(){
            var _this=this;
            var certSN = this.userCertBase64;
            console.log(certSN);
            this.GeneratePic(certSN,
                function (value) {
                    var retJObject = JSON.parse(value);
                    console.log(retJObject);
                    if (retJObject.error == "Ok") {
                        var picBase64 = retJObject.picBase64;
                        console.log(_this);
                        _this.Cer_picUrl="data:image/png;base64," + picBase64;
                        // $("#cer_pic").attr("src", "data:image/png;base64," + picBase64);
                        _this.picBase64=picBase64;
                        // $("#cer_picBase64").val(picBase64);
                    } else {
                        alert(retJObject.error);
                    }
                });
        },
        upload_file:function(){
            // var file = $('#upload_file').get(0).files[0];
            var dom=document.getElementById("upload_file");
            var file=dom.files[0];
            console.log(file);
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return;
            }
            var r = new FileReader();  //本地预览
            r.onload = function() {
                // $("#pic").attr("src", r.result);
                this.picUrl=r.result
                // $("#picBase64").val(r.result.substring(r.result.indexOf(',') + 1));
                this.picBase64=r.result.substring(r.result.indexOf(',') + 1);
                console.log(this.picBase64);
            };
            r.readAsDataURL(file);    //Base64
        },
        cer_upload_file:function(){
            var dom=document.getElementById("Cer_upload_file");
            var file=dom.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return;
            }
            var r = new FileReader();  //本地预览
            r.onload = function () {
                // $("#cer_pic").attr("src", r.result);
                this.Cer_picUrl=r.result;
                // $("#cer_picBase64").val(r.result.substring(r.result.indexOf(',') + 1));
                this.picBase64=r.result.substring(r.result.indexOf(',') + 1);
                console.log(this.picBase64);
            };
            r.readAsDataURL(file);    //Base64
        },
        btnCreate:function(){
            var sealName = this.sealName;
            var sealType = this.sealType;
            var sealStartTime = this.startTime;
            var sealEndTime = this.endTime;
            var imgsrc = this.picUrl;
            if (sealName == '' || (sealType != 1 && sealType != 2) || sealStartTime== "" || sealEndTime=="" || imgsrc == ""){
                alert("请完善信息！")
                return;
            }
            this.isDisabled=true;
            this.title_1=true;
            if (this.userCertSN == this.makerCertSN) {
                this.title_2=true;
                this.isDisabled=false;
                return;
            }
            var certSN = this.makerCertSN;
            console.log(certSN);
            this.GetCertAndSeal(certSN, (certAndSeal) =>{
                console.log(certSN);
                console.log(certAndSeal);
                console.log(this);
                var certAndSealJObject = JSON.parse(certAndSeal);
                if (certAndSealJObject.CertBase64.length != 0) {
                    this.makerCertBase64 = certAndSealJObject.CertBase64;
                }
            }).then(()=>{
                return this.GetCertAndSeal(this.userCertSN, (certAndSeal)=> {
                    var certAndSealJObject = JSON.parse(certAndSeal);
                    console.log(certAndSealJObject);
                    if (certAndSealJObject.CertBase64.length != 0) {
                        this.userCertBase64 = certAndSealJObject.CertBase64;
                    }
                    if (this.makerCertBase64 == "") {
                        this.title_4=true;
                        return;
                    }
                    console.log(this);
                    this.ifshow=true;
                })
            })
        },
        btnyes:function(){
            this.VerifyPin(JSON.stringify({
                CertID: this.makerCertSN,
                Pin: this.ukeyPinCode
            }),
            (verifyPinRet)=> {
                if (verifyPinRet != "Ok") {
                    console.log(this);
                    this.pinError="Pin码错误，请重新输入";
                    this.ukeyPinCode=null;
                } else {
                    // $("input[name='ukeyPinCode']")
                    //     .val(layero.find("input[name='ukeyPinCode']").val());
                    this.ifshow=false;
                    this.title_5=true;
                    // resolve();
                }
            }).then(()=>{
                return this.ComputeSealHash()
            }).then(()=>{
                return this.ComputeSealSig()
            }).then(()=>{
                return this.ComputeSeal()
            }).then(()=>{
                return this.WriteUkey()
            }).then(()=>{
                var data = {
                    sealName: this.sealName,
                    sealType: this.sealType,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    makerCertSN: this.makerCertSN,
                    makerCertBase64: this.makerCertBase64,
                    userCertSN: this.userCertSN,
                    userCertBase64: this.userCertBase64,
                    sealBase64: this.sealBase64
                };
                console.log(this);
                this.axios({
                    method: 'POST',
                    url: '/ProduceSign/Create',
                    data: qs.stringify(data),
                    headers:{
                        'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
                    }
                    }).then(function(res){
                    console.log(res);
                })
                    
                this.isDisabled=false;
            });
        },
        Cer_btnCreate:function(){
            var sealName = this.Cer_sealName;
            var sealType = this.Cer_sealType;
            var sealStartTime = this.Cer_startTime;
            var sealEndTime = this.Cer_endTime;
            var imgsrc = this.Cer_picUrl;
            if (sealName == '' || (sealType != 1 && sealType != 2) || sealStartTime== "" || sealEndTime=="" || imgsrc == ""){
                alert("请完善信息！")
                return;
            }
            this.Cer_isDisabled=true;
            this.title_1=true;
            if (this.userCertSN == this.makerCertSN) {
                this.title_2=true;
                this.Cer_isDisabled=false;
                return;
            }
            var certSN = this.makerCertSN;
            console.log(certSN);
            this.GetCertAndSeal(certSN, (certAndSeal) =>{
                console.log(certSN);
                console.log(certAndSeal);
                console.log(this);
                var certAndSealJObject = JSON.parse(certAndSeal);
                if (certAndSealJObject.CertBase64.length != 0) {
                    this.makerCertBase64 = certAndSealJObject.CertBase64;
                }
            }).then(()=>{
                // return this.GetCertAndSeal(this.userCertSN, (certAndSeal)=> {
                //     var certAndSealJObject = JSON.parse(certAndSeal);
                //     console.log(certAndSealJObject);
                //     if (certAndSealJObject.CertBase64.length != 0) {
                //         this.userCertBase64 = certAndSealJObject.CertBase64;
                //     }
                    if (this.makerCertBase64 == "") {
                        this.title_4=true;
                        return;
                    }
                    console.log(this);
                    this.Cer_ifshow=true;
                // })
            })
        },
        Cer_btnyes:function(){
            this.VerifyPin(JSON.stringify({
                CertID: this.makerCertSN,
                Pin: this.Cer_ukeyPinCode
            }),
            (verifyPinRet)=> {
                if (verifyPinRet != "Ok") {
                    console.log(this);
                    this.Cer_pinError="Pin码错误，请重新输入";
                    this.Cer_ukeyPinCode=null;
                } else {
                    // $("input[name='ukeyPinCode']")
                    //     .val(layero.find("input[name='ukeyPinCode']").val());
                    this.Cer_ifshow=false;
                    this.title_5=true;
                    // resolve();
                }
            }).then(()=>{
                return this.Cer_ComputeSealHash()
            }).then(()=>{
                return this.ComputeSealSig()
            }).then(()=>{
                return this.ComputeSeal()
            }).then(()=>{
                var data = {
                    sealName: this.sealName,
                    sealType: this.sealType,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    makerCertSN: this.makerCertSN,
                    makerCertBase64: this.makerCertBase64,
                    // userCertSN: this.userCertSN,
                    userCertBase64: this.userCertBase64,
                    sealBase64: this.sealBase64
                };
                console.log(this);
                this.axios({
                    method: 'POST',
                    url: '/ProduceSign/Create',
                    data: qs.stringify(data),
                    headers:{
                        'Content-Type':"application/x-www-form-urlencoded;charset=UTF-8"
                    }
                    }).then(function(res){
                    console.log(res);
                })
                this.Cer_isDisabled=false;
            });
        },

        closedialog:function(){
            this.ukeyPinCode=null;
            this.ifshow=false;
        },
        Cer_closedialog:function(){
            this.Cer_ukeyPinCode=null;
            this.Cer_ifshow=false;
        },
        // 上传证书 得到证书的base64
        uploadPhoto(e) {
            console.log(this);
            var _this=this;
            // 利用fileReader对象获取file
            var file = e.target.files[0];
            var filesize = file.size;
            var filename = file.name;
            
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                var result = e.target.result;
                console.log(_this);
                _this.userCertBase64 = result.split("base64,")[1];
            }
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
            return new Promise(function (resolve, reject){
                var socket = new WebSocket("ws://127.0.0.1:2012/VerifyPin");
                try {

                    // socket.onopen = function (msg) {
                    socket.onopen = function () {

                        //alert("连接成功！");
                        socket.send(strJson);

                    };
                    socket.onmessage = function (e) {
                        funcBack(e.data);
                        resolve();
                        socket.close();
                    };
                }
                catch (ex) {
                    funcBack("");
                    socket.close();
                }
            })
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
        GeneratePic: function (certID, funcBack) {

            //alert(strJson);
            var socket = new WebSocket("ws://127.0.0.1:2012/GeneratePic");
            try {

                socket.onopen = function () {
                    socket.send(certID);
                };
                socket.onmessage = function (e) {
                    console.log(e);
                    funcBack(e.data);
                    socket.close();
                }
            }
            catch (ex) {
                console.log(ex);
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
        // ukey计算印章哈希
        ComputeSealHash:function () {
            // var dtd = $.Deferred();
            var _this=this;
            console.log(_this);
            return new Promise(function (resolve, reject){
                var uri = "ws://127.0.0.1:2012/ComputeSealHash";
                var socket = new WebSocket(uri);
                // 建立 web socket 连接成功触发事件
                socket.onopen = function (e) {
                    console.log("connected");
                    var data = {
                        makerCertID: _this.makerCertSN,
                        userCertID: _this.userCertSN,
                        picBase64: _this.picBase64,
                        sealName: _this.sealName,
                        sealType: _this.sealType,
                        sealStartTime:_this.startTime,
                        sealEndTime: _this.endTime
                    };
                    console.log(JSON.stringify(data));
                    // 使用 send() 方法发送数据
                    socket.send(JSON.stringify(data));
                };
                // 断开 web socket 连接成功触发事件
                socket.onclose = function (e) { console.log("closed"); };
                // 接收服务端数据时触发事件socket.close();
                socket.onmessage = function (e) {
                    console.log(e);
                    var retJSONObject = JSON.parse(e.data);
                    if (retJSONObject.error == "Ok") {
                        _this.sealBase64=retJSONObject.sealBase64;
                        _this.sealHashBase64=retJSONObject.digestBase64
                        // $("#sealBase64").val(retJSONObject.sealBase64);
                        // $("#sealHashBase64").val(retJSONObject.digestBase64);
                        resolve();
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
            });
                // return dtd.promise();
        },
        //  证书计算印章哈希
        Cer_ComputeSealHash:function () {
            // var dtd = $.Deferred();
            var _this=this;
            console.log(_this);
            return new Promise(function (resolve, reject){
                var uri = "ws://127.0.0.1:2012/ComputeSealHash";
                var socket = new WebSocket(uri);
                // 建立 web socket 连接成功触发事件
                socket.onopen = function (e) {
                    console.log("connected");
                    var data = {
                        makerCertID: _this.makerCertSN,
                        userCertBase64: _this.userCertBase64,
                        picBase64: _this.picBase64,
                        sealName: _this.Cer_sealName,
                        sealType: _this.Cer_sealType,
                        sealStartTime:_this.Cer_startTime,
                        sealEndTime: _this.Cer_endTime
                    };
                    console.log(JSON.stringify(data));
                    // 使用 send() 方法发送数据
                    socket.send(JSON.stringify(data));
                };
                // 断开 web socket 连接成功触发事件
                socket.onclose = function (e) { console.log("closed"); };
                // 接收服务端数据时触发事件socket.close();
                socket.onmessage = function (e) {
                    console.log(e);
                    var retJSONObject = JSON.parse(e.data);
                    if (retJSONObject.error == "Ok") {
                        _this.sealBase64=retJSONObject.sealBase64;
                        _this.sealHashBase64=retJSONObject.digestBase64
                        // $("#sealBase64").val(retJSONObject.sealBase64);
                        // $("#sealHashBase64").val(retJSONObject.digestBase64);
                        resolve();
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
            });
                // return dtd.promise();
        },
        // ukey计算印章签名
        ComputeSealSig:function () {
            // var dtd = $.Deferred();
            var _this=this;
            return new Promise(function (resolve, reject){
                var uri = "ws://127.0.0.1:2012/SignDataEx";
                var socket = new WebSocket(uri);
                socket.onopen = function () {
                    console.log("connected");
                    var data = {
                        certId: _this.makerCertSN,
                        hashBase64: _this.sealHashBase64,
                        strPin: "111111"
                    };
                    socket.send(JSON.stringify(data));
                };
                socket.onclose = function () { console.log("closed"); };
                socket.onmessage = function (e) {
                    console.log(e.data);
                    var retJSONObject = JSON.parse(e.data);
                    if (retJSONObject.error == "Ok") {
                        _this.sealSigBase64=retJSONObject.SigBase64;
                        // $("#sealSigBase64").val(retJSONObject.SigBase64);
                        resolve(e.data);
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
                // return dtd.promise();
            })
        },
        // 证书计算印章签名
        // Cer_ComputeSealSig:function () {
        //     // var dtd = $.Deferred();
        //     var _this=this;
        //     return new Promise(function (resolve, reject){
        //         var uri = "ws://127.0.0.1:2012/SignDataEx";
        //         var socket = new WebSocket(uri);
        //         socket.onopen = function () {
        //             console.log("connected");
        //             var data = {
        //                 certId: _this.makerCertSN,
        //                 hashBase64: _this.sealHashBase64,
        //                 strPin: "111111"
        //             };
        //             socket.send(JSON.stringify(data));
        //         };
        //         socket.onclose = function () { console.log("closed"); };
        //         socket.onmessage = function (e) {
        //             console.log(e.data);
        //             var retJSONObject = JSON.parse(e.data);
        //             if (retJSONObject.error == "Ok") {
        //                 _this.sealSigBase64=retJSONObject.SigBase64;
        //                 // $("#sealSigBase64").val(retJSONObject.SigBase64);
        //                 resolve(e.data);
        //             }
        //             socket.close();
        //         };
        //         socket.onerror = function (e) { console.log("Error: " + e.data); };
        //         // return dtd.promise();
        //     })
        // },
        // ukey计算最终印章数据
        ComputeSeal:function () {
            // var dtd = $.Deferred();
            var _this = this;
            return new Promise(function (resolve, reject){
                var uri = "ws://127.0.0.1:2012/ComputeSeal";
                var socket = new WebSocket(uri);
                socket.onopen = function () {
                    console.log("connected");
                    var data = {
                        sealWithoutSigBase64: _this.sealBase64,
                        sigBase64: _this.sealSigBase64
                    };
                    socket.send(JSON.stringify(data));
                };
                socket.onclose = function () { console.log("closed"); };
                socket.onmessage = function (e) {
                    console.log(JSON.parse(e.data));
                    var retJSONObject = JSON.parse(e.data);
                    if (retJSONObject.error == "Ok") {
                        _this.sealBase64=retJSONObject.sealBase64;
                        // $("#sealBase64").val(retJSONObject.sealBase64);
                        
                        var blob = _this.getBlob(retJSONObject.sealBase64);
                        
                        //window.open(URL.createObjectURL(blob).blob);
                        var downLoad = document.querySelectorAll('#target')[0];
                        downLoad.setAttribute('href', URL.createObjectURL(blob));
                        _this.load();
                        resolve();
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
                // return dtd.promise();
            })
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
                    }
                    socket.close();
                };
                socket.onerror = function (e) { console.log("Error: " + e.data); };
                // return dtd.promise();
            })
        },
        load: function () {
            document.getElementById("target").click();
        },
        getBlob: function (base64) {
            console.log(this);
            console.log(base64);
            console.log(this.getContentType(base64))
            return this.b64toBlob(base64, this.getContentType(base64));
        },
        getContentType: function (base64) {
            var arr = /data:([^;]*);/i.exec(base64);
            console.log(arr);
            return arr;
        },
        b64toBlob:function (b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            console.log(b64Data);
            var byteCharacters = atob(b64Data);
            console.log(byteCharacters);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
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
