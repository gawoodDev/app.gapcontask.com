const multer = require("multer");
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/upload');
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      let extension = file.originalname.split(".").pop()

      let newName = file.fieldname + '-' + uniqueSuffix + "." + extension;

      console.log("New image uploaded", extension, newName)

      cb(null, newName);
   }
})


const upload = multer({ storage: storage });


module.exports = upload 
