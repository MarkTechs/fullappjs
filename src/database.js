const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/diario-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then( db => console.log('Connetion successeful'))
.catch(err => console.log(err));