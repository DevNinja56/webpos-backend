const express = require('express');
const _connect_to_db = require('./src/utils/database');
const cors = require('cors');

const app = express();
const auth = require('./src/routers/auth');
const catalogue = require('./src/routers/catalogue');
const order = require('./src/routers/order');
const exceptionHandler = require('./src/middlewares/exceptionHandler');
const { syncItems } = require('./src/services/catalogue');

app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/catalogue', catalogue);
app.use('/order', order);

app.use(exceptionHandler);

app.get('/', (req, res) => {
    res.send('Hello World');
})

// scheduled job to sync database with catalogue items every day.
setInterval(async () => {
    syncItems()
}, 1000 * 60 * 60 * 24);


app.listen(3000, async () => {
    await _connect_to_db();
    await syncItems();
    console.log(`Server Started at 3000`)
})