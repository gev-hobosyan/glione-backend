import { Hono } from "hono";
import { Lesson, LessonModel } from "../schemas/lesson";

const lessonApp = new Hono();

lessonApp.patch("/:id", async (c) => {
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

lessonApp.put("/:id", async (c) => {
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

lessonApp.delete("/:id", async (c) => {
	const id = c.req.param("id");
	try {
		const lesson = await LessonModel.findByIdAndDelete(id);
		return c.json({ message: "Lesson deleted successfully" });
	} catch (e) {
		console.log(e);
		return c.json({ error: "Failed to delete the lesson" }, 500);
	}
});

lessonApp.post("/", async (c) => {
	const body = await c.req.json();
	try {
		const lesson = body as Lesson;

		const dbLesson = await LessonModel.create({
			title: lesson.title,
			description: lesson.description,
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

lessonApp.get("/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const lesson = await LessonModel.findById(id);
		return c.json(lesson);
	} catch (error) {
		console.error("Error fetching lesson");
		return c.json({ error: "Failed to fetch lessons" }, 500);
	}
});

export default lessonApp;
