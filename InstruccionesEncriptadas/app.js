const express = require('express');
const app = express();
const path = require('path');
const {loadFile} = require('./src/file');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public', { 'content-type': 'text/javascript' }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/loadFile', upload.single('file'), async (req, res) => {
    
    try{
        let a = await loadFile(req.file);
        res.send(a.data);
    }catch(e){
        res.status(500).send(e)
    }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});