import cors from 'cors';
import express from 'express';
import mongoose  from 'mongoose';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectToMongoDB from './database/connectToMongoDB.js';
import Userclass from './models/userModel.js';
// import GetUser from './models/getUserModel';
import createCookie from'./cookies/createCookie.js';

import jwt from 'jsonwebtoken'

const port = 4010;
dotenv.config()
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));


app.get('/',(req,res) => {
    res.send("Hi fromsadad backend")
})

// User Schema
const userLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userLoginSchema);

// Register User (Signup)
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if JWT_SECRET is missing
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not set!");
            return res.status(500).json({ message: "Internal server error: JWT Secret missing" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




// Define the Order schema
const orderSchema = new mongoose.Schema({
    name: { type: String, required: false },
    address: { type: String, required: false },
    mobile: { type: String, required: false },
    paymentMethod: { type: String, required: true },
    orderId: { type: String, required: true },
    items: { type: Object, required: true },
});
// Create a model for the orders collection
const Order = mongoose.model('Order', orderSchema, 'orders'); // 'orders' is the collection name

// Function to add a new order
async function addOrder(data) {
    try {
      // Connect to MongoDB
      await mongoose.connect('mongodb://localhost:27017/e-commerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
  
      // Add req.body to the orders collection
      const newOrder = new Order(data);
      const savedOrder = await newOrder.save(); // Save the new order to the collection
  
      console.log('Order added:', savedOrder);
      // Send a response back to the client

      
      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      return savedOrder;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


app.post('/placeOrder', async (req, res) => {
    try {
        console.log('data from frontend: ', req.body);

        const placeNewOrder = await addOrder(req.body);

        if(placeNewOrder) {
            res.status(200).json({ status: "success", message: 'Order added successfully', order: placeNewOrder });
        } else {
            res.status(500).json({ status: "error", message: 'Failed to Order', order: placeNewOrder });
        }
        const allUsers = await fetchAllUsers();
        console.log('get Users: ', allUsers);
        
        res.send(allUsers);
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"})
    }
})


// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"letzcuk@gmail.com",
//         pass:process.env.PASS
//     }
// })
// transporter.verify((err,success)=>{
//     if(err) {
//         console.log(err)
//     }
//     else{
//         console.log("Nodemailer Connection Successful")
//     }
// })
// THIS IS AN ENDPOINT FOR CHECKING REGISTRATION
app.post('/registrationcheck',async(req,res) => {
    const {username,email,password} = req.body
    try {
        const checkEmail =  await Userclass.findOne({email});
        if(checkEmail){
            return res.status(409).json({message:"Email already exists"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new Userclass({
            username:username,
            email:email,
            password:hashedPassword,
            otp:otp
        })
        const mailOptions = {
            from:"patiencecoder@gmail.com",
            to:email,
            subject:"OTP for Registrations",
            html: `
            <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;">
                <p>Hi ${username}</p>
                <p>Your OTP for creating an account is ${otp}</p>
            </div>
            `
        }
        await transporter.sendMail(mailOptions)
            .then(() => res.status(200).json({ message: "OTP Sent" }))
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Error sending OTP" });
            });
        await newUser.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
})

// THIS IS AN ENDPOINT FOR CHECKING THE OTP
app.post('/verificationcheck',async (req,res) => {
    const userOtp = parseInt(req.body.otp);
    try {
        const checkOtp =  await Userclass.findOne({otp:userOtp})
        if(checkOtp && checkOtp.otp!==undefined && checkOtp.otp===userOtp){
            return res.status(200).json({message:"OTP Verified"})
        }
        return res.status(400).json({error:"Incorrect OTP"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
})

// THIS IS AN ENDPOINT FOR CHECKING THE LOGIN
app.post('/logincheck',async (req,res) => {
    const {email,password} = req.body;
    try {
        const findMail = await Userclass.findOne({email});
        const findPassword = await bcrypt.compare(password,findMail.password);
        if(findMail && findPassword){
            const token = createCookie(findMail._id,res)
            return res.status(200).json({message:"User logged in"})
        }
        return res.status(401).json({message:"Invalid email or password"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"})
    }
})

//THIS IS AN ENDPOINT FOR SENDING AN EMAIL MESSAGE TO ALL USERS AT ONCE
app.post('/send-email',async (req,res) => {
    try {
        const users = await Userclass.find({})
        const allUsersEmail = users.map((user) => {
            const mailOptions = {
                from:"patiencecoder@gmail.com",
                to:user.email,
                subject:"Offer Alert",
                html: `
            <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;font-size:20px;">
                <p>Hi ${user.username}👋</p>
                <p>I hope you are doing good we have an offer for you please checkout our app to know more about it 😃😃</p>
            </div>
            `
            }
            return transporter.sendMail(mailOptions)
        })
        console.log(allUsersEmail);
        await Promise.all(allUsersEmail);
        console.log(allUsersEmail)
        return res.status(200).json({message:"Email sent successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
})

//THIS IS AN ENDPOINT FOR RESETTING THE PASSWORD
app.post('/forgotpassword',async (req,res) => {
    const {email,newpassword} = req.body
    try{
        const checkMail = await Userclass.findOne({email});
        if(!checkMail){
            return res.status(401).json({message:"Email not found in our database"})
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newpassword,salt)
        checkMail.password = hashedPassword
        await checkMail.save();
        return res.status(200).json({message:"Password changed successfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"})
    }
})

//THIS IS AN API ENDPOINT FOR LOGOUT THE USER
app.post('/logout',(req,res) => {
    try{
        res.cookie('jwt',"",{
            maxAge:0
        })
        return res.status(200).json({message:"Logged Out"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})
//PORT
app.listen(port,() => {
    console.log("Server started");
    connectToMongoDB()
})