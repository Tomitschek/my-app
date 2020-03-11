// import * as functions from 'firebase-functions';

import * as express from 'express';

const cors = require('cors');

const app = express();

app.use(cors({origin: true}));

export {resizeThumbnail} from './image-upload';
