const multer = require('multer')
const upload = multer
    (
        { // options object
            dest: 'images'
        }
    )
app.post('/upload', upload.single('upload'), (req, res) => // whatever is called via single() just like auth. It is a middleware.
{
    res.send()
}
)