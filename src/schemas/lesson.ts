import { Schema, model, models, type InferSchemaType } from "mongoose";

const lessonSchema = new Schema(
	{
		title: { type: String, required: true },
		published: { type: Boolean, default: false },
		tags: [{ name: { type: String } }],
		authors: [{ name: { type: String } }],
		section: { type: String, required: true },
		steps: [
			{
				title: { type: String },
				type: { type: String },
				content: { type: String },
				predefinedCode: { type: String },
				rightAnswer: { type: String },
				choices: [{ text: { type: String }, isRight: { type: Boolean } }],
			},
		],
	},
	{ timestamps: true },
);

export type Lesson = InferSchemaType<typeof lessonSchema>;

const LessonModel = models.Lesson || model<Lesson>("Lesson", lessonSchema);

export { LessonModel };
export default lessonSchema;
