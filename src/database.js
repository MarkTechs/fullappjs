const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/diario-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( db => console.log('Connection successfully'))
.catch(err => console.log(err));