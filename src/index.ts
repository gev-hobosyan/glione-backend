import { Hono } from "hono";
import connectDB from "./db";
import { cors } from "hono/cors";
import lessonsApp from "./routes/lessons";
import lessonApp from "./routes/lesson";

const app = new Hono();

app.use(
	"*",
	cors({
		origin: "http://localhost:5173",
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	await connectDB();
	await next();
});

app.route("/lessons", lessonsApp);
app.route("/lesson", lessonApp);

export default app;
