import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    authstatus : false,
    userData :{}
}

// blogInitialState ={
//     posts :[],
//     postStatus:false
// }userData);

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers :{
        login : (state,action)=>{
            state.authstatus = true
            state.userData = action.payload
            
        },

        logout :(state)=>{
            state.authstatus = false
            state.userData = null
        }
    }
})

// const BlogSlice = createSlice({
//     name:'blog',
//     blogInitialState,
//     reducers:{
//         fetchPosts :(state,action)=>{
            
//         }
//     }
// })

export const { login, logout } = AuthSlice.actions

export default AuthSlice.reducer