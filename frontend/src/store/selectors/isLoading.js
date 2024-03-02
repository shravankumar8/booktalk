import { atom, selector } from "recoil";
import { userState } from "../atom/admin";
export const isLoadingState=selector({
    key: "isLoadingState",
    get:(get)=>{
        const state=userState
        return state.isLoading;
    }
}) 