const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require("./routes/routes-url");
const URL = require('./models/Models-url.js');

const app = express();
const PORT = 2005;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("Mongodb connected"))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());


app.use("/url",urlRoute);

app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;

const entry =   await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
        visitHistory: {
            timesstamp: Date.now(),
        }
    },

    }

);
res.redirect(entry.redirectURL)
});



app.listen(PORT, () => console.log('server started at PORT'));