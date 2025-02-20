import { defineCollection, z } from "astro:content";

const haikus = defineCollection({
	schema: z.object({
		autoria: z.string(),
		anio: z.string().optional(),
		escuela: z.string().optional(),
		curso: z.string().optional(),
		tags : z.array(z.string()).optional(),
		pubDate: z.string().transform((date) => {
			const fechaEnCrudo = new Date(date);
			if (fechaEnCrudo.toString() === "Invalid Date") {
				throw new Error(`La fecha ${date} no es válida`);
			}
			return fechaEnCrudo;
		}),
	}),
});

export const collections = { haikus };
