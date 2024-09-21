import dotenv from 'dotenv';
dotenv.config();

import {app} from './index.js';
app.listen(process.env.DB_PORT, () => console.log('Server running on port ' + process.env.DB_PORT));