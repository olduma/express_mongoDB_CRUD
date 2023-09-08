import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./router.js";               // Import body-parser
import fileUpload from "express-fileupload"     //  npm i express-fileupload


const PORT = 5000
const DB_URL = 'mongodb+srv://user:user@cluster0.6arytfi.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(express.static('view'));
app.use(express.static('static'));
app.use(fileUpload({}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res
        .status(200)
        .sendFile(__dirname + '/view/index.html');
})

app.use("/api", router)

const runApp = async() => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

    } catch (e) {
        console.error(e)
    }
}

runApp();
