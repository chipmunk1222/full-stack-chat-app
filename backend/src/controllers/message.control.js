import Users from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedinUserId = req.user._id;
		const filterdUsers = await Users.find({
			_id: { $ne: loggedinUserId },
		}).select("-password");
		res.status(200).json(filterdUsers);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ receiverID: userToChatId, senderID: senderId },
				{ senderID: userToChatId, receiverID: senderId },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const sendMessage = async (req, res) => {
  try {
    const {text,image} = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderID: senderId,
      receiverID: receiverId,
      text,
      image:imageUrl
    });

    await newMessage.save();

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("error in send message", error.message);
    res.status(500).json({ message: "Server error" });
  }
};