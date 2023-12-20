const app = require("./src/app");
const { SERVER_CONFIG } = require("./src/config");

app.listen(SERVER_CONFIG.PORT, () => console.log({ message: `Server listening at port ${SERVER_CONFIG.PORT}` }))