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
const app = express();

// const getAllowedOrigins = async () => {
//     try {
//         // Fetch websites where access is true
//         const websites = await WebsiteModel.find({ access: true });
//         return websites.map(website => website.sitename);
//     } catch (error) {
//         console.error('Error fetching websites:', error);
//         return [];
//     }
// };

// // Use CORS middleware
// app.use(async (req, res, next) => {
//     const allowedOrigins = await getAllowedOrigins();
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true); // Allow the request
//             } else {
//                 callback(new Error('Not allowed by CORS')); // Reject the request
//             }
//         },
//         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
//         credentials: true, // Include credentials if needed (cookies, authorization headers)
//     })(req, res, next);
// });

app.use(
  cors({
    origin: "*", // Allow all origins or specify your frontend's domain
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

const PORT = 4300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
