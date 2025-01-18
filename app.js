const bodyParser = require('body-parser')
const cors = require('cors')
const db = require("./models");
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/images', express.static('images'))

require('./routes/user.routes')(app);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
