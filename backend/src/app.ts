import express from "express";

import globalErrorHandler from "./controllers/errorHandler";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.get("/api/v1", (req, res) => {
  res.send("Hello !!!");
});

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
