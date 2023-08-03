const mongoose = require("mongoose");
const URI = "hahahha"

mongoose.connect("mongodb+srv://mridul:u0LFPRhHmgWydgob@cluster0.jw6bp7l.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("connected to mongo"))
.catch((err)=> console.log("error connecting mongo", err));