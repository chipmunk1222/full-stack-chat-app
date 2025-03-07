import React, { useEffect,useRef } from "react";

import { useChatStore } from "../store/useChatStore";

import MessageSkeleton from "./skeletons/MessageSkeleton";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
	const { messages, getMessages, isMessageLoading, selectedUser,subscribeMessages, unSubcribeMessages } =
		useChatStore();
	const { authUser } = useAuthStore();

	const messageRef = useRef(null)

	useEffect(() => {
		 getMessages(selectedUser._id);

		subscribeMessages()

		return () => {
       unSubcribeMessages();
    };
	}, [getMessages, selectedUser._id,subscribeMessages,unSubcribeMessages]);

	useEffect(() => {
		if(messageRef.current && messages) {
			messageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	},[messages])


	if (isMessageLoading)
		return (
			<div className="flex-1 flex flex-col overflow-auto">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);

	return (
		<div className="flex-1 flex flex-col overflow-auto">
			<ChatHeader />

			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message._id}
            className={`chat ${message.senderID === authUser._id ? "chat-end" : "chat-start"}`}
						ref={messageRef}
					>
						<div className="chat-image avatar">
							<div className="size-10 rounded-full border">
								<img
									src={
										message.senderID === authUser._id
											? authUser.profileImage || "/avatar.png"
											: selectedUser.profileImage || "/avatar.png"
									}
									alt="profile pic"
								/>
							</div>
						</div>

						<div className="chat-header mb-1">
							<time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
							</time>
						</div>

						<div className="chat-bubble flex flex-col">
							{message.image && (
								<img
									src={message.image}
									alt="Attachment"
									className="sm:max-w-[200px] rounded-md mb-2"
								/>
							)}
							{message.text && <p>{message.text}</p>}
						</div>
					</div>
				))}
			</div>

			<MessageInput />
		</div>
	);
};

export default ChatContainer;
