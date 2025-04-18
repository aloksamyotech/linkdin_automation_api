import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:7200", "http://localhost:7201"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With","headers"],
  credentials: true,
  preflightContinue: false,
};

const corsConfig = cors(corsOptions);
export default corsConfig;