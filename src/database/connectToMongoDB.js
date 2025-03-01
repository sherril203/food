import mongoose from 'mongoose';

async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/e-commerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connection Successful");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

export default connectToMongoDB;