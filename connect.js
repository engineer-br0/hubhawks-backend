const mongoose = require("mongoose");
const URI = process.env.MongoURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("connected to mongo"))
.catch((err)=> console.log("error connecting mongo", err));