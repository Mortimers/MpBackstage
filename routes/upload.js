let express = require('express');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');
let router = express.Router();
let uploadImg = require('../mongodb/uploadImg');

/** 上传文件、图片*/
router.post('/toLocal', (req, res) => {
  console.log('--upload---')
  let form = new formidable.IncomingForm()
  form.parse(req, (error, fields, files) => {
    console.log('path',files.upload.path)
    fs.writeFileSync('public/test.png', fs.readFileSync(files.upload.path));

  })
})

module.exports = router