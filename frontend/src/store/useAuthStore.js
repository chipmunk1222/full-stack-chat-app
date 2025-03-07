import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'


export const useAuthStore = create((set,get) => ({
  authUser: null,
  
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check')
      set({ authUser: response.data, isCheckingAuth: false })
      // console.log(response.data);
      get().connectSocket()
    } catch (error) {
      console.log("error in check auth", error);
      set({ authUser: null, isCheckingAuth: false })
    }
  },
  signup: async (data) => {
    set({isSigningUp:true})
    try {
      const res = await axiosInstance.post('/auth/signup',data)
      set({authUser: res.data})
      toast.success('Accound created successfully')

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    } finally{
      set({isSigningUp:false})
    }
  },

  login: async (data) => {
    set({isLoggingIn:true})
    try {
      const res = await axiosInstance.post('/auth/login',data)
      set({authUser: res.data})
      toast.success('Logged in successfully')

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
      // console.log(error)
    } finally{
      set({isLoggingIn:false})
    }
  },

  logout: async (data) => {
    try {
      await axiosInstance.post('/auth/logout')
      set({authUser: null})
      toast.success('Logged out successfully')
      get().disConnentSocket()
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  },  
  
  updateProfile: async (data) =>{
    set({isUpdatingProfile:true})
    try {
      const res = await axiosInstance.put('/auth/update-profile',data)
      set({authUser: res.data})
      toast.success('Profile updated successfully')
      
    } catch (error) {
      toast.error(error.response?.data.message || 'upload error')
      console.log(error)
    }
    finally{
      set({isUpdatingProfile:false})
    }
  },

  connectSocket: async () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected ) return


      const socket = io('http://localhost:5001',{
        query: {userId: authUser._id}  // sending userId to the server with every new connection
      })
      socket.connect()
      socket.on('connect', () => {
        console.log('connected to socket server');
      });

      set({socket:socket})
      socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds})
      })

  },
  disConnentSocket: async () => {
    if(get().socket?.connected) get().socket.disconnect()
  }
}))