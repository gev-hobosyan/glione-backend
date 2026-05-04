import { Schema, model, models, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
	{
		userId: { type: String, required: true },
		xp: { type: Number, required: true, default: 0 },
		role: { type: String, required: true, default: "user" },
		energy: { type: Number, required: true, default: 25 },
		streak: { type: Number, required: true, default: 0 },
		lessons: [
			{
				lessonId: { type: String, required: true },
				progress: { type: Number, required: true, default: 0 },
				steps_completed: { type: Number, required: true, default: 0 },
				total_steps: { type: Number, required: true, default: 1 },
			},
		],
	},
	{ timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = models.U || model<User>("users", userSchema);

export { UserModel };
export default userSchema;
