require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./srcnode/db/db");
const authRouter = require("./srcnode/routers/auth/authrouter");
const blogRouter = require("./srcnode/routers/site/blogrouter");
const projectRouter = require("./srcnode/routers/site/project");
const heroRouter = require("./srcnode/routers/layout/hero");
const aboutRouter = require("./srcnode/routers/layout/about");
const faqRouter = require("./srcnode/routers/site/faq");
const serviceRouter = require("./srcnode/routers/site/service");
const newsRouter = require("./srcnode/routers/site/news");
const announcementRouter = require("./srcnode/routers/site/announcement");
const imgrouter = require("./srcnode/routers/Test/image");
const websiterouter = require("./srcnode/routers/auth/website");
const WebsiteModel = require("./srcnode/models/auth/website");
const salesrouter = require("./srcnode/routers/tele/sales");
const headerrouter = require("./srcnode/routers/header/header");
const homerouter = require("./srcnode/routers/home/home");
const reqrouter = require("./srcnode/routers/more/request");
const taskRouter = require("./srcnode/routers/task/task");
const collectdatarouter = require("./srcnode/routers/collectdata/collectdata");
const routerphone = require("./srcnode/routers/mailer/phonemailer");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Connect to DB
connectDB();

// Use routes
app.use("/api", authRouter);
app.use("/api", blogRouter);
app.use("/api", projectRouter);
app.use("/api", heroRouter);
app.use("/api", aboutRouter);
app.use("/api", faqRouter);
app.use("/api", serviceRouter);
app.use("/api", newsRouter);
app.use("/api", announcementRouter);
app.use("/api", imgrouter);
app.use("/api", websiterouter);
app.use("/api", salesrouter);
app.use("/api", headerrouter);
app.use("/api", homerouter);
app.use("/api", reqrouter);
app.use("/api", taskRouter);
app.use("/api", collectdatarouter);
app.use("/api", routerphone);

const PORT = 4300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
