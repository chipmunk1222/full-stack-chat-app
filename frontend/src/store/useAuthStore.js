import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'


export const useAuthStore = create((set) => ({
  authUser: null,
  
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check')
      set({ authUser: response.data, isCheckingAuth: false })
      // console.log(response.data);
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
  }

}))