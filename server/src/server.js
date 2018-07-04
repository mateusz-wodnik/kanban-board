import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

// Body parser
app.use(bodyParser.json());

// Router
import lanes from './routes/lane.routes'
import notes from './routes/note.routes'
import kanbans from './routes/kanban.routes'
app.use('/api', lanes);
app.use('/api', notes);
app.use('/api', kanbans);

// Database config
import './mongoConfig.js'

// Serve static files
app.use(express.static(`${__dirname}/../public`))

server.listen(port, () => {console.log(`server listens on port: ${port}`)});
