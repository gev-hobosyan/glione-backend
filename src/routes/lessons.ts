import { Hono } from "hono";
import { LessonModel } from "../schemas/lesson";

const lessonsApp = new Hono();

lessonsApp.get("/", async (c) => {
	const body = await c.req.json();

	try {
		const lessons = await LessonModel.find({
			published: true,
			lang: body["lang"] || "en",
		});
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/admin/en", async (c) => {
	try {
		const lessons = await LessonModel.find({ lang: "en" });
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/admin/am", async (c) => {
	try {
		const lessons = await LessonModel.find({ lang: "am" });
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/count/en/:count", async (c) => {
	const count = parseInt(c.req.param("count"));

	try {
		const lessons = await LessonModel.find({
			published: true,
			lang: "en",
		}).limit(count);
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/count/am/:count", async (c) => {
	const count = parseInt(c.req.param("count"));

	try {
		const lessons = await LessonModel.find({
			published: true,
			lang: "am",
		}).limit(count);
		return c.json(lessons);
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/display/en", async (c) => {
	try {
		const lessons = await LessonModel.find(
			{ published: true, lang: "en" },
			"title description tags authors section",
		);
		return c.json(lessons);
	} catch (e) {
		console.error("Error fetching lessons:", e);
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

lessonsApp.get("/display/am", async (c) => {
	try {
		const lessons = await LessonModel.find(
			{ published: true, lang: "am" },
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
