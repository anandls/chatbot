import express from "express";

import "dotenv/config";
import middlewareConfig from "./config/middlewareConfig";
import connectionFactory from "./config/database";
connectionFactory();
import routes from "./routes/api/v1";
const app = express();

middlewareConfig(app);

app.use("/api", routes.addClient);
app.use("/api", routes.getClient);
app.use("/api", routes.authClient);
app.use("/api", routes.addAccount);
app.use("/api", routes.getAccount);
app.use("/api", routes.addMessage);
app.use("/api", routes.getMessage);
app.use("/api", routes.getConversation);

app.listen(process.env.PORT, () =>
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  )
);
