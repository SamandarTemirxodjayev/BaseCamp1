const express = require("express")
const app = express()
const mongoose = require('mongoose')
const router =  require("./routes/router")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");
let port = express - process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ exended: false }))
app.use(methodOverride('_method'))
app.use(cookieParser());

app.use('/', router)

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://Samandar:03210321@cluster0.derdafd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
  console.log(`server started at port ${port}`)
})
})

.catch(error => {
console.log('Error connecting to database:', error.message);
});
