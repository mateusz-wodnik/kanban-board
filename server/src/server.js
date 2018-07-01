import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

// Body parser
app.use(bodyParser.json());

// Router
import examples from './routes/example.routes'
app.use('/api', examples);

// Database config
import './mongoConfig.js'

// Serve static files
app.use(express.static(`${__dirname}/../public`))

server.listen(port, () => {console.log(`server listens on port: ${port}`)});
