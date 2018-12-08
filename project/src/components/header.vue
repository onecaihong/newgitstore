<template>
    <header >
        <div class="headerTop">
            <section v-if="this.loginStatus&&(this.loginPower==0)" ref="box" class="container">
                <b-navbar class="navbar" type="dark" variant="dark" toggleable>
                    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav_dropdown_collapse">
                        <b-navbar-nav>
                            <b-nav-item-dropdown text="管理员管理"  right>
                                <b-dropdown-item href="#">
                                    <router-link  to="/user"  class="head_login">
                                        <span class="login_span">查看管理员</span>
                                    </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item href="#">
                                    <router-link  to="/user/creat"  class="head_login">
                                        <span class="login_span">添加管理员</span>
                                    </router-link>
                                </b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="制章人管理" right>
                                <b-dropdown-item href="#">
                                    <router-link  to="/signmaker" class="head_login">
                                        <span class="login_span">查看制章人</span>
                                    </router-link>  
                                </b-dropdown-item>
                                <b-dropdown-item href="#">
                                    <router-link  to="/signmaker/creat"  class="head_login">
                                        <span class="login_span">添加制章人</span>
                                    </router-link>  
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item-dropdown text="日志管理" right>
                                <b-dropdown-item href="#">
                                    <router-link  to="/infolog"  class="head_login">
                                        <span class="login_span">查看日志</span>
                                    </router-link>  
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item  @click="logout">退出系统</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>









                <!-- <ul class="header_ul">
                    <li class="fl header_li">
                        <div @click="showItem('user')">
                           <span >管理员管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg> 
                        </div>
                        <div class="item" v-show="showtype=='user'">
                            <div>
                                <router-link  to="/user"  class="head_login">
                                    <span class="login_span">查看管理员</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/user/creat"  class="head_login">
                                    <span class="login_span">添加管理员</span>
                                </router-link>
                            </div> 
                        </div>
                    </li>
                    <li class="fl header_li" >
                        <div  @click="showItem('SignMaker')">
                            <span>制章人管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        <div class="item" v-show="showtype=='SignMaker'">
                            <div>
                                <router-link  to="/signmaker" class="head_login">
                                    <span class="login_span">查看制章人</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/signmaker/creat"  class="head_login">
                                    <span class="login_span">添加制章人</span>
                                </router-link>
                            </div> 
                        </div>
                    </li>
                    <li class="fl header_li">
                        <div @click="showItem('InfoLog')">
                            <span >日志管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        <div class="item" v-show="showtype=='InfoLog'">
                                <router-link  to="/infolog"  class="head_login">
                                    <span class="login_span">查看日志</span>
                                </router-link> 
                        </div>
                    </li>
                    <li class="fl header_li" @click="logout">
                        <div>
                            <span>退出系统</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </li>
                </ul> -->
            </section>
            <section v-if="this.loginStatus&&(this.loginPower==1)" ref="box" class="container">
                <b-navbar class="navbar" type="dark" variant="dark" toggleable>
                    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav_dropdown_collapse">
                        <b-navbar-nav style="font-size:16px">
                            <b-nav-item-dropdown text="印章管理"  right>
                                <b-dropdown-item href="#">
                                    <router-link  to="/producesign/creat" class="head_login">
                                        <span class="login_span">制章</span>
                                    </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item href="#">
                                    <router-link  to="/producesign/verify" class="head_login">
                                        <span class="login_span">验章</span>
                                    </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item href="#">
                                    <router-link   to="/producesign/restore" class="head_login">
                                        <span class="login_span">恢复印章</span>
                                    </router-link>
                                </b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="日志管理" right>
                                <b-dropdown-item href="#">
                                    <router-link  to="/infolog" class="head_login">
                                        <span class="login_span">查看日志</span>
                                    </router-link>  
                                </b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item  @click="logout">退出系统</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>









                <!-- <ul class="header_ul">
                    <li class="fl header_li">
                        <div @click="showItem('ProduceSign')">   
                            <span >印章管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        <div class="item" v-show="showtype=='ProduceSign'">
                            <div>
                                <router-link  to="/producesign/creat" class="head_login">
                                    <span class="login_span">制章</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/producesign/verify" class="head_login">
                                    <span class="login_span">验章</span>
                                </router-link>
                            </div> 
                            <div>
                                <router-link   to="/producesign/restore" class="head_login">
                                    <span class="login_span">恢复印章</span>
                                </router-link>
                            </div> 
                        </div>
                    </li>
                    <li class="fl header_li">
                        <div @click="showItem('InfoLog')">   
                            <span>日志管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        <div class="item" v-show="showtype=='InfoLog'">
                            <div>
                                <router-link  to="/infolog" class="head_login">
                                    <span class="login_span">查看日志</span>
                                </router-link> 
                            </div>
                        </div>
                    </li>
                    <li class="fl header_li" @click="logout">
                        <div>
                            <span >退出系统</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        
                    </li>
                </ul> -->
            </section>
            <section v-if="!this.loginStatus" ref="box" class="container">
                    <b-navbar class="navbar" type="dark" variant="dark" toggleable>
                        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                        <b-collapse is-nav id="nav_dropdown_collapse">
                            <b-navbar-nav>
                                <b-nav-item-dropdown text="登录系统" right>
                                    <b-dropdown-item href="#">
                                        <router-link to="/login"  class="head_login">
                                            管理员
                                        </router-link> 
                                    </b-dropdown-item>
                                    <b-dropdown-item href="#">
                                        <router-link to="/SignMakerLogin"  class="head_login">
                                            制章人
                                        </router-link>
                                    </b-dropdown-item>
                                </b-nav-item-dropdown>
                            </b-navbar-nav>
                        </b-collapse>
                    </b-navbar>
                <!-- <ul class="header_ul">
                    <li class="fl header_li">
                        <div @click="showItem('login')">
                            <span>登录系统</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg> 
                        </div>
                        <div class="item" v-show="showtype=='login'">
                                <router-link to="/login"  class="head_login">
                                    管理员
                                </router-link> 
                           
                                <router-link to="/SignMakerLogin"  class="head_login">
                                    制章人
                                </router-link>
                        </div>
                    </li>
                </ul> -->
            </section>
        </div>
    </header>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data () {
        return {
            showtype: '',
            login: '',
            SignMakerLogin: ''
        }
    },
    created(){
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("loginStatus") ) {
            this.$store.commit('New_loginStatus',{Status:JSON.parse(sessionStorage.getItem("loginStatus")),power:JSON.parse(sessionStorage.getItem("loginPower"))});
            // this.$store.commit('New_loginPower',JSON.parse(sessionStorage.getItem("loginPower")));
            console.log(this.loginStatus);
        } 
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        // window.addEventListener("beforeunload",()=>{
        //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        // })
        // document.addEventListener('click',(e)=>{
        //     if(!this.$refs.box.contains(e.target)){
        //         this.showtype = '';
        //     }
        // })
    },
    computed: {
        ...mapState([
            'loginStatus',
            'loginPower'
        ])
    },
    methods: {
        ...mapMutations([
            "RECORD_USERINFO",
            "New_loginStatus",
        ]),
        // showItem (type) {
        //     var ul=document.getElementsByClassName("header_ul")[0];
        //     if(ul){
        //         if(!ul.contains(event.target)){
        //             this.showtype='';
        //         }else{
        //             if (this.showtype !== type) {
        //                 this.showtype = type
        //             } else {
        //                 this.showtype = ''
        //             } 
        //         }
               
        //     }
            
        // },
        logout(){
            console.log(11);
            var that=this;
            this.axios.get("/Login/Logout").then(function(data){
                console.log(data);
                if (data.data != null && data.data.state == '200') {
                    if (data.data.logintype == '0') {
                        that.$store.commit('New_loginStatus',{loginStatus:false,loginPower:0});
                        // that.$store.commit('New_loginPower',0);
                        sessionStorage.setItem("loginStatus",false)
                        sessionStorage.setItem("loginPower",0)
                        that.$router.push('/login');
                    } else {
                        that.$store.commit('New_loginStatus',{loginStatus:false,loginPower:1});
                        // that.$store.commit('New_loginStatus',false);
                        // that.$store.commit('New_loginPower',1);
                        sessionStorage.setItem("loginStatus",false)
                        sessionStorage.setItem("loginPower",1)
                        that.$router.push('/signMakerLogin');
                    }
                }
            }).catch(function(res){
                console.log(res);
            })
        },
        initData (){
            // if(this.loginStatus)
        }
    }
}
</script>

<style scoped>
    .headerTop{
        height:80px;
        background:#343a40;
        width:100%;
    }
    .navbar{
        color:aliceblue;
        height:80px;
    }
    ul li div span{
        font-size:18px
    }
    .header_li{
        
        width:100px;
        height:80px;
        position:relative;
        
    }
    .header_li:hover{
        background:#000
    }
    .header_li>div{
        width:100px;
        height:80px;
        line-height:70px;
        text-align:center;
        cursor:pointer;
    }
    .header_li>div span{
        font-size:16px;
    }
    .item{
        position: absolute;
        left:0;
        top:80px;
    }
    .item a{
         font-size:16px;
        display: block;
        width:100px;
        height:40px;
        color:#fff;
        background:#222;
        text-align:center;
        line-height:40px;
    }
    .item a:hover{
        background:#000 ;
    }
</style>
