import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// ✅ ONLY Stripe route must come before express.json()
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }), // 👈 very important
  stripeWebhook
);

// ✅ Other middlewares AFTER stripe
app.use(express.json());
app.use(cookieParser());

// ✅ Your routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});


// localhost:8000 → This is your backend server (Node.js + Express)
// localhost:5173 → This is your frontend development server (Vite)