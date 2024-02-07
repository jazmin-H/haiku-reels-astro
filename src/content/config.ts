import { defineCollection, z } from "astro:content";

const haikus = defineCollection({
	schema: z.object({
		autoria: z.string(),
		anio: z.string().optional(),
		escuela: z.string().optional(),
		curso: z.string().optional(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
	}),
});

export const collections = { haikus };
