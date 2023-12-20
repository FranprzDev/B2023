const app = require('./src/app')
const { SERVER_CONFIG } = require('./src/config')

const { PORT } = SERVER_CONFIG

app.listen(PORT, () => console.log({ message: 'Server listening at port ' + PORT }))