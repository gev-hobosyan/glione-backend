import { Hono } from "hono";
import { UserModel } from "../schemas/user";

const userApp = new Hono();

userApp.get("/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const user = await UserModel.findOne({ userId: id });
		return c.json(user);
	} catch (e) {
		console.log(`Error user/:id GET: ${e}`);
		return c.json({ error: "Failed to fetch user data" }, 500);
	}
});

userApp.get("/xp/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const userXp = await UserModel.findOne({ userId: id }, "xp");
		return c.json(userXp);
	} catch (e) {
		console.log(`Error user/xp/:id GET: ${e}`);
		return c.json({ error: "Failed to fetch user xp" }, 500);
	}
});

userApp.get("role/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const user = await UserModel.findOne({ userId: id }, "role");

		return c.json(user);
	} catch (e) {
		console.log(`Error user/role/:id GET: ${e}`);
		return c.json({ error: "Failed to fetch user role" }, 500);
	}
});

userApp.get("energy/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const user = await UserModel.findOne({ userId: id }, "energy");

		return c.json(user);
	} catch (e) {
		console.log(`Error user/energy/:id GET: ${e}`);
		return c.json({ error: "Failed to fetch user energy" }, 500);
	}
});

userApp.get("/streak/:id", async (c) => {
	const id = c.req.param("id");
	const now = new Date();
	now.setHours(now.getHours() + 4);

	try {
		const user: { _id: string; streak: number; updatedAt: Date } =
			await UserModel.findOne({ userId: id }, "streak updatedAt");

		user.updatedAt.setHours(user.updatedAt.getHours() + 4);

		const days = now.getDay() - user.updatedAt.getDay();

		if (days > 1) {
			const updatedUser: { _id: string; streak: number; updatedAt: Date } =
				await UserModel.findByIdAndUpdate(user._id, {
					streak: 0,
				});

			return c.json({ _id: updatedUser._id, streak: 0 });
		} else if (days !== 0 && days <= 1) {
			const updatedUser: { _id: string; streak: number; updatedAt: Date } =
				await UserModel.findByIdAndUpdate(user._id, {
					streak: user.streak + 1,
				});

			return c.json({
				_id: updatedUser._id,
				streak: updatedUser.streak + 1,
			});
		}

		return c.json({ _id: user._id, streak: user.streak });
	} catch (e) {
		console.log(`Error user/streak/:id GET: ${e}`);
		return c.json({ error: "Failed to fetch user streak" }, 500);
	}
});

userApp.post("/", async (c) => {
	try {
		const user = await UserModel.create({
			userId: "1",
		});

		return c.json(user);
	} catch (e) {
		console.log(`Error user/ POST: ${e}`);
		return c.json({ error: "Failed to create user record" }, 500);
	}
});

export default userApp;
