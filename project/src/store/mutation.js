import { 
    RECORD_USERINFO ,
    New_loginStatus,
    New_makerCertSN,
} from './mutation-types.js'

import {setStore} from '../config/mUtils'

export default {
    [RECORD_USERINFO](state,{data,Status,power}){
        state.loginStatus = Status;
        state.loginPower = power;
        setStore('user_id', data.id);
    },
    [New_loginStatus](state,{Status,power}){
        state.loginStatus = Status;
        state.loginPower = power;
    },
    // [New_loginPower](state,{data}){
        
    // },
    [New_makerCertSN](state,{CertSN,Code}){
        console.log({CertSN,Code});
        state.makerCertSN = CertSN;
        state.ValidateCode = Code;
    }
    
}