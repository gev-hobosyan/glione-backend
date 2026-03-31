import { Hono } from "hono";
import { LessonModel } from "./schemas/lesson";
import connectDB from "./db";
import { cors } from "hono/cors";

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

app.get("/lessons", async (c) => {
	try {
		const lessons = await LessonModel.find({ published: true });
		console.log(lessons);
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

app.get("/lessons/display", async (c) => {
	try {
		const lessons = await LessonModel.find(
			{ published: true },
			"title tags authors section",
		);
		return c.json(lessons);
	} catch (e) {
		console.error("Error fetching lessons:", e);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

app.get("/lesson/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const lesson = await LessonModel.findById(id);
		return c.json(lesson);
	} catch (error) {
		console.error("Error fetching lesson");
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

app.post("/lesson", async (c) => {
	const body = await c.req.json();
	try {
		const lesson = body as Lesson;

		const dbLesson = await LessonModel.create({
			title: lesson.title,
			published: lesson.published,
			tags: lesson.tags,
			authors: lesson.authors,
			section: lesson.section,
			steps: lesson.steps,
		});

		return c.json(dbLesson, 201);
	} catch (e) {
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

app.delete("/lesson/:id", async (c) => {
	const id = c.req.param("id");
	try {
		const lesson = await LessonModel.findByIdAndDelete(id);
		return c.json({ message: "Lesson deleted successfully" });
	} catch (e) {
		console.log(e);
		return c.json({ error: "Failed to delete the lesson" }, 500);
	}
});

app.put("/lesson/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();
	try {
		const lesson = body as Lesson;

		const dbLesson = await LessonModel.findByIdAndUpdate(id, lesson);

		return c.json({ message: "Lesson updated successfully" });
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to update the lesson" });
	}
});

app.patch("/lesson/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();
	try {
		const dbLesson = await LessonModel.findByIdAndUpdate(id, body);
		return c.json({ message: "Lesson updated successfully" });
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to update the lesson" });
	}
});

export default app;

interface Step {
	title: string;
	type: string;
	content: string;
	predefinedCode?: string;
	rightAnswer?: string;
	choices?: [];
}

interface Choice {
	text: string;
	isRight: boolean;
}

interface Author {
	name: string;
}

interface Tag {
	name: string;
}

interface Lesson {
	title: string;
	published: boolean;
	tags: Tag[];
	authors: Author[];
	section: string;
	steps?: Step[];
}
