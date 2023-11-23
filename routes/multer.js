const multer=require('multer');
const { v4: uuidv4 } = require('uuid');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/uploads');
    },
    filename:(req,file,cb)=>{
      
     const filename=uuidv4();//uuidv4() is used to generate a random string for image
     cb(null,filename+path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

module.exports=upload;