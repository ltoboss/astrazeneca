const express = require('express');
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const { loadFile } = require('./src/scores');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public', { 'content-type': 'text/javascript' }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/loadFile', upload.single('file'), async (req, res) => {
    try{
        let a  = await loadFile(req.file);
        
        if(a.data)
            return res.send(a.data);
        else
            return res.status(500).send(a.error);
            
    }catch(e){
        res.status(500).send(e);
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});