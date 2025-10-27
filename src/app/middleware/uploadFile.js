const path = require('path');
const fs = require('fs');

function upload(files, source) {
    if (files && Object.keys(files).length !== 0) {

        // Uploaded path
        const uploadedFile = files;
        // Logging uploading file

        // Upload path
        const uploadDir = path.join('src/public/img/' + source + '/');
        const uploadPath = path.join(uploadDir) + uploadedFile.name;
        // To save the file using mv() function
        fs.promises.mkdir(uploadDir, { recursive: true });
        uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            console.log(err);
            return err;
        } else return uploadedFile.name;
        });
        return uploadedFile.name;
        
    } 
    else return "No file uploaded !!";
}

module.exports.upload = upload