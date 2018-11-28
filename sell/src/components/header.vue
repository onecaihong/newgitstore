<template>
    <header >
        <div class="headerTop">
            <section v-if="loginStatus&&(loginPower==1)" ref="box" class="container">
                <ul class="header_ul">
                    <li class="fl header_li">
                        <div @click="showItem('user')">
                           <span >管理员管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg> 
                        </div>
                        <div class="item" v-show="showtype=='user'">
                            <div>
                                <router-link  to="/login/login"  class="head_login">
                                    <span class="login_span">查看管理员</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/login/login"  class="head_login">
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
                                <router-link  to="/login/login" class="head_login">
                                    <span class="login_span">查看制章人</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/login/login"  class="head_login">
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
                            
                                <router-link  to="/login/login"  class="head_login">
                                    <span class="login_span">查看日志</span>
                                </router-link> 
                            
                        </div>
                    </li>
                    <li class="fl header_li">
                        <div>
                            <span>退出系统</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </li>
                </ul>
            </section>
            <section v-if="loginStatus&&(loginPower==0)" ref="box" class="container">
                <ul class="header_ul">
                    <li class="fl header_li">
                        <div @click="showItem('ProduceSign')">   
                            <span >印章管理</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        <div class="item" v-show="showtype=='ProduceSign'">
                            <div>
                                <router-link  to="/login/login" class="head_login">
                                    <span class="login_span">制章</span>
                                </router-link> 
                            </div>
                            <div>
                                <router-link  to="/login/login" class="head_login">
                                    <span class="login_span">验章</span>
                                </router-link>
                            </div> 
                            <div>
                                <router-link   to="/login/login" class="head_login">
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
                                <router-link  to="/login/login" class="head_login">
                                    <span class="login_span">查看日志</span>
                                </router-link> 
                            </div>
                        </div>
                    </li>
                    <li class="fl header_li">
                        <div>
                            <span>退出系统</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                        
                    </li>
                </ul>
            </section>
            <section v-if="!loginStatus" ref="box" class="container">
                <ul class="header_ul">
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
                </ul>
            </section>
        </div>
    </header>
</template>

<script>
export default {
    data () {
        return {
            loginStatus: false,  // false:未登录 true：已登录
            loginPower: 1,  // 1:管理员 0:普通用户
            showtype: '',
            login: '',
            SignMakerLogin: ''
        }
    },
    created(){
        document.addEventListener('click',(e)=>{
            console.log(this.$refs.box.contains(e.target));
            if(!this.$refs.box.contains(e.target)){
                this.showtype = '';
            }
        })
    },
    methods: {
        showItem (type) {
            var ul=document.getElementsByClassName("header_ul")[0];
            console.log(ul);
            if(ul){
                if(!ul.contains(event.target)){
                    this.showtype='';
                }else{
                    if (this.showtype !== type) {
                        this.showtype = type
                    } else {
                        this.showtype = ''
                    } 
                }
               
            }
            
        }
    }
}
</script>

<style scoped>
    .headerTop{
        height:80px;
        background:#222;
        width:100%;
    }
    .header_ul{
        color:aliceblue;
        height:100%;
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
