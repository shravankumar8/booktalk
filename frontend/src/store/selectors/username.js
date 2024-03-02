import { userState } from "../atom/admin";
import { selector } from "recoil";
export const userEmailState=selector({
    key:"userEmailState",

    get:({get})=>{
        const state = get(userState)
        return state.userMail;
    }
}) 