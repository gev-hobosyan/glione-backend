export interface Step {
	title: string;
	type: string;
	content: string;
	predefinedCode?: string;
	rightAnswer?: string;
	choices?: [];
}

export interface Choice {
	text: string;
	isRight: boolean;
}

export interface Author {
	name: string;
}

export interface Tag {
	name: string;
}

export interface Lesson {
	title: string;
	description: string;
	published: boolean;
	tags: Tag[];
	authors: Author[];
	section: string;
	steps?: Step[];
}
