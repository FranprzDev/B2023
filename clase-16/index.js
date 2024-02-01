const app = require("./src/app");

const PORT = app.get('PORT')

app.listen(PORT, () => console.log('SERVER', PORT))