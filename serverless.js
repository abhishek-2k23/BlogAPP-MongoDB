import serverless from 'serverless-http';
import {app} from './index.js';

const AppHandler = serverless(app);
export  {AppHandler};