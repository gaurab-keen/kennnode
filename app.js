const express = require('express');
const connection = require('../webHook/database');
const PORT = 3000;
const webHooks= require('../webHook/webhooks/routes/Webhooks')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/webHooks',webHooks);
app.listen(PORT,()=>{
	console.log(`Server Running123`);
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected123 to MySQL Server!');
});


