import serverless from 'serverless-http';
import {app} from './index.js';
import dbConnection from './Configuration/db.js';
const AppHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    const connection = await dbConnection();
    const response = await serverless(app)(event, context);
    await connection.disconnect();
  
    return response;
  };;
export {AppHandler};