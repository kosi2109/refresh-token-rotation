const PORT = 8000;
const express = require('express');
const route = require('./routes');
const connectDB = require('./utils/database');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const veryfyJWT = require('./middleware/veryfyJWT');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOption');
const app = express();
// app middleware
app.use(credentials);

app.use(cors(corsOptions))
app.use(express.urlencoded({extended : true}))
app.use(express.json({}))
app.use(cookieParser());


// routes
app.use('/',route.authRouter);

// protected routes
app.use(veryfyJWT)
app.get('/users', (req,res) => {
    return res.status(200).json(['rest','hello']);
})

// initial server
app.listen(PORT , () => {
    connectDB()
    console.log(`Server listerning on ${PORT}`);
})