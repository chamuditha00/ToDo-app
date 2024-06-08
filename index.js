const app = require('./app');
const db = require('./config/db');

const port = 3000;

app.get('/', (req, res) => {
    res.send('Server running....');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});