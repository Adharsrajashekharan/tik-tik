import axios from "axios";
import { create } from "zustand";
import{persist} from 'zustand/middleware'



const authStore=(set:any)=>({
    userprofile:null,
    addUser:(user:any)=>set({userprofile:user}),
    removeUser:()=>set({userprofile:null})
})

const useAuthStore=create(
    persist(authStore,{
        name:'auth'
    })
)
export default useAuthStore