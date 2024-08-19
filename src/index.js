import app from './app.js';

import './database/db.js'

app.listen(app.get('port'), ()=>{
    console.log(`app on port: ${app.get('port')}`)
})