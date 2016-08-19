var express =	require('express');
var multer  =   require('multer');
var path 	= 	require('path');

var app 	=   express();

// -- './files' is the storage
// where uploaded files are stored
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

// files with photo tag are uploaded onto storage
var upload = multer({ storage : storage }).single('photo');

// Get would server index.html page
// which would have upload button to upload files
app.get('/',function(req,res){
      console.log("Request.."+__dirname);
        res.sendFile(path.join(__dirname+ '/index.html'));
});

// Post on upload on submit button would call upload function
// to store the file into storage.
app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

// Start the server
app.listen(9001,function(){
    console.log("Working on port 9001");
});
