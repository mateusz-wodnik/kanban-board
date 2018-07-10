import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import session from 'express-session'

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

// Body parser
app.use(bodyParser.json());

// Login tracking
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}))

// Router
import lanes from './routes/lane.routes'
import notes from './routes/note.routes'
import kanbans from './routes/kanban.routes'
import users from './routes/user.routes'

app.use('/api', lanes);
app.use('/api', notes);
app.use('/api', kanbans);
app.use('/api', users);

// Database config
import './mongoConfig.js'

// Serve static files
app.use(express.static(`${__dirname}/../public`))

server.listen(port, () => {console.log(`server listens on port: ${port}`)});
