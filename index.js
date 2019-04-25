var express=require('express');
var multer = require('multer');
var ejs=require('ejs');
var path=require('path');

var app=express();

var storage = multer.diskStorage({

destination : function(req,file,cb){
	cb(null,'public/uploads')
},

filename : function(req,file,cb){
	cb(null,file.originalname);
	console.log(file);
}

})

// let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//   cb(null, file.fieldname+ext)

// var mystorage = multer.diskStorage({
// 	destination:'./public/uploads',
// 	filename:function(req,res,cb){
// 		cb(null,file.fieldname + '-'+Date.now()+
// 			path.extname(fle.originalname));
// 	}
// });

var upload=multer({
	storage:storage
}).single('imagefile');

app.use(express.static(
	path.join(__dirname, 'resources')
	));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.listen(process.env.PORT);

app.get('/',function (req,res) {
	res.render('index');
})

app.post('/upload',(req,res)=>{
	upload(req,res,(err)=>{
		if (err) {
			res.render('index',{
				msg:err
			});
		}else{
			console.log(req.file);
			res.send('success');
		}
	});
});