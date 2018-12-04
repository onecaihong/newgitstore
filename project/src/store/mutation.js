import { RECORD_USERINFO } from './mutation-types'
import { New_loginStatus } from './mutation-types'
import { New_loginPower } from './mutation-types'

import {setStore} from '../config/mUtils'

export default {
    [RECORD_USERINFO] (state,data,Status,power){
        console.log(power);
        state.loginStatus = Status;
        console.log(state.loginStatus);
        state.loginPower = power;
        setStore('user_id', data.id);
    },
    [New_loginStatus](state,data){
        state.loginStatus = data;
    },
    [New_loginPower](state,data){
        state.loginPower = data;
    },
}