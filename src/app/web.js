import express from 'express';
import { publicRouter } from '../routes/public-api.js';
// import { publicRouter } from '../routes/public-api.js';
// import { errorMiddleware } from '../middleware/error-middleware.js';
// import { userRouter } from '../routes/user-api.js';

export const web = express();

web.use(express.json());

web.use(publicRouter);

// web.listen(port, () => {
//   console.log('server running at http://localhost:' + port);
// });
// web.use(publicRouter);
// web.use(userRouter);
// web.use(errorMiddleware);
