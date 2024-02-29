const { app } = require('./src/app')
const { PORT, NODE_ENV } = require('./src/constants')

app.listen(PORT, () => console.log('Server running at port', PORT, NODE_ENV))