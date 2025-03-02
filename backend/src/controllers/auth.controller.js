import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
	const { fullName, email, password } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters long" });
		}

		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: "User already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			await newUser.save();
			generateToken(newUser._id, res);
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profileImage: newUser.profileImage,
			});
		} else {
			res.status(400).json({ message: "invalid user data" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const login = async (req, res) => {
	const { password, email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "invalid creditials" });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "invalid creditials" });

		generateToken(user._id, res);
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			profileImage: user.profileImage,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", {
			maxAge: 0,
		});
		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profileImage } = req.body;
		if (!profileImage) {
			return res.status(400).json({ message: "Profile image is required" });
		}

		const userId = req.user._id;
		const uploadResponse = await cloudinary.uploader.upload(profileImage, {
			folder: "fullstack-chat-app/profile",
		});
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profileImage: uploadResponse.secure_url },
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		console.log("error in update profile", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};
