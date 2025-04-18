import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/utils/globalException.js';
import logger from './src/core/config/logger.js';
import "dotenv/config"
import responseInterceptor from './src/utils/responseInterceptor.js';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import indexRoute from "./src/routes/user/index.js";
import initializeSocketEvents from './src/socket/index.js';
const app = express();
const PORT = (() => {
    const env = process.env.ENV;
    return env === 'development' ? 7200 : 4545;
})();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(corsConfig);

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

await connectDB()
app.use(responseInterceptor);
app.use(globalExceptionHandler);
app.use("/api/v1/user", indexRoute);

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
    transports: ['websocket'],
  });

app.set('socketio', io);   

initializeSocketEvents(io);

server.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
