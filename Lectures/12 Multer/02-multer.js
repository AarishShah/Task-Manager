const multer = require('multer')
const upload = multer
    (
        { // options object
            dest: 'images',
            limits:
            {
                fileSize: 1000000
            },
            fileFilter(req, file, cb)
            {
                // one method
                // if (!file.originalname.endsWith('.pdf')) // 'endsWith()' is a string method which returns true or false
                if (!file.originalname.match(/\.(doc|docx)$/)) // the expression b/w '//' is a regex expression. Details of regex(Regular expression) are present in this location: (Lectures\12 Multer\multer.js)
                {
                    return cb(new Error('Please upload a Word document'))
                }
                cb(undefined, true)

                // cb(new Error('File must be a PDF')) // if file is not a PDF
                // cb(undefined, true) // no error detected, upload is accepted
                // cb(undefined, false) // silently rejects the upload
            }
        }
    )

app.post('/upload', upload.single('upload'), (req, res) => // whatever is called via single() just like auth. It is a middleware.
{
    res.send()
},

    (error, req, res, next) =>
    {
        res.status(400).send({ error: error.message })
    }
)