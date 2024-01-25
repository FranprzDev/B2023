const app = require("./src/app");
const db = require("./src/models");

db.sequelize.authenticate().then(() => {
    console.log('Conectado')
    app.listen(3000, () => console.log('Server listening at port', 3000))
}).catch(() => console.log('No conectado'))