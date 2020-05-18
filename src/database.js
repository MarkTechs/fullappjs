const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/diario-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( db => console.log('Connection succesful'))
.catch(err => console.log(err));