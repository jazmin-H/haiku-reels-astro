import { getCollection } from "astro:content";

const haikus = await getCollection("haikus");

export function filterHaikus(term: string) {
	return haikus.filter(({ data }) => {
		console.log(data);
		data.autoria.toLowerCase().includes(term.toLowerCase());
	});
}
