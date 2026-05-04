import { Hono } from "hono";
import { LessonModel } from "../schemas/lesson";

const lessonsApp = new Hono();

lessonsApp.get("/", async (c) => {
	try {
		const lessons = await LessonModel.find({ published: true });
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/admin/", async (c) => {
	try {
		const lessons = await LessonModel.find();
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/count/:count", async (c) => {
	const count = parseInt(c.req.param("count"));
	try {
		const lessons = await LessonModel.find({ published: true }).limit(count);
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/display", async (c) => {
	try {
		const lessons = await LessonModel.find(
			{ published: true },
			"title description tags authors section",
		);
		return c.json(lessons);
	} catch (e) {
		console.error("Error fetching lessons:", e);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.delete("/", async (c) => {
	try {
		const lesson = await LessonModel.deleteMany({});
		return c.json({ message: "Lessons deleted successfully" });
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

export default lessonsApp;
