import usermodel from "../Models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import storemodel from "../Models/AddStore.js";
import Addusermodel from "../Models/Adduser.js";
import Adminmodel from "../Models/AddAdmin.js";
import ratingModel from "../Models/Rating.js"

//register
export const register = async (req, res) => {

    const { name, email, address, password } = req.body;
    if (!name, !email, !address, !password) {
        return res.json({ success: false, message: 'missing details' })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.json("user already exist")
        }
        const user = new usermodel({ name, email, address, password: hashedPassword })
        await user.save();

        //JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};


//-------Admin-Login--------//
export const login = async (req, res) => {
    const { AdminId, email, password } = req.body

    if (!AdminId || !email || !password) {
        return res.json({ success: false, message: 'details required' })
    }
    try {
        const Admin = await Adminmodel.findOne({ AdminId });
        const user = await Adminmodel.findOne({ email });
        if (!Admin) {
            return res.json({ success: false, message: 'invalid AdminId' })
        }
        if (!user) {
            return res.json({ success: false, message: 'invalid email' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'incorrect password' })
        }
        //JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
};


//-------Nuser-Login--------//

export const Nuserlogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'details required' })
    }
    try {
        const user = await Addusermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'invalid email' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'incorrect password' })
        }
        //JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
};

//Logout 
export const Logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
        })
        return res.json({ success: true, message: " logged out " })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
};

//--- Adding Store -----//
export const Addstore = async (req, res) => {

    const { storename, address, email } = req.body;
    if (!storename, !address, !email) {
        return res.json({ success: false, message: 'missing details' })
    }
    try {
        const existingemail = await storemodel.findOne({ email });
        if (existingemail) {
            return res.json({ success: false, message: "Email already exists." });
        }

        const store = new storemodel({ storename, address, email })
        await store.save();

        //JWT token
        const token = jwt.sign({ id: email._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// ------ Adding Newuser -------//
export const AddingUser = async (req, res) => {

    const { name, email, address, password } = req.body;
    if (!name, !email, !address, !password) {
        return res.json({ success: false, message: 'missing details' })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existinguser = await Addusermodel.findOne({ email });
        if (existinguser) {
            return res.json("user already exist")
        }
        const user = new Addusermodel({ name, email, address, password: hashedPassword })
        await user.save();

        //JWT token
        const token = jwt.sign({ id: email._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

//Adding Admin
export const AddingAdmin = async (req, res) => {

    const { AdminId, role, email, password, } = req.body;

    if (!AdminId, !role, !email, !password) {
        return res.json({ success: false, message: 'missing details' })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingAdmin = await Adminmodel.findOne({ email });
        if (existingAdmin) {
            return res.json("Admin exist")
        }
        const Admin = new Adminmodel({ AdminId, role, email, password: hashedPassword })
        await Admin.save();

        //JWT token
        const token = jwt.sign({ id: email._id }, process.env.JWT_S, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ?
                'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};



export const rating = async (req, res) => {

    const { productId, rating } = req.body;
    try {
        const newRating = new ratingModel({ productId, rating });
        await newRating.save();
        res.status(201).json({ message: 'Rating saved' });
    } catch (err) {
        res.status(400).json({
            error: 'Error saving rating',
            message: err.message,
            success: false
        });

    }
};