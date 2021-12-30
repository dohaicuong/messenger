import { server } from './server'

server.listen(4000, '0.0.0.0').then(url => console.log(`${url}/graphiql`))

process.on('SIGTERM', () => process.exit())
