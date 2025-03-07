import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	
	isUserLoading: false,
	isMessageLoading: false,

	getUser: async () => {
		set({ isUserLoading: true });
		try {
			const response = await axiosInstance.get("/message/users");
			set({ users: response.data });
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isUserLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isMessageLoading: true });
		try {
			const res = await axiosInstance.get(`/message/${userId}`);
      // console.log(res)
			set({ messages: res.data });
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isMessageLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInstance.post(
				`/message/send/${selectedUser._id}`,
				messageData
			);
			set({ messages: [...messages, res.data] });
		} catch (error) {
			toast.error(error.response.data.message);
		}
	},

	setSelectedUser: (user) => set({ selectedUser: user }),

	subscribeMessages: () =>{
    const { selectedUser } = get();
    if (!selectedUser) return;

		const socket = useAuthStore.getState().socket

		socket.on("newMessage",(newMessage)=>{
			const isMessageSentFromSelectedUser = newMessage.senderID === selectedUser._id
			if(!isMessageSentFromSelectedUser) return
			set({messages:[...get().messages, newMessage]})
		})
	},

	unSubcribeMessages: () =>{
		const socket = useAuthStore.getState().socket
		socket.off("newMessage") 
	}

}));
