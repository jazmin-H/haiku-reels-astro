	import matter from "gray-matter";
	import path from "path";
	import fs from "fs";

	// Función que obtiene los metadatos y el contenido de los haikus y los guarda en un archivo JSON en la carpeta `public/`
	export const obtenerMetadatos = (dir = "src/content/haikus") => {
		try {
			// Obtenemos los contenidos de los archivos .md en la carpeta indicada
			const contenido = obtenerContenidoDeCadaArticulo(dir);
			const haikus = parsearMetadatos(contenido);

			// Ruta para guardar el archivo JSON en la carpeta `public/`
			const archivoJson = path.join(process.cwd(), "public", "haikus.json");

			// Escribir los metadatos y el contenido en el archivo JSON
			fs.writeFileSync(archivoJson, JSON.stringify(haikus, null, 2), "utf-8");
			console.log("Metadatos y contenido guardados en 'public/haikus.json'");
		} catch (error) {
			console.error("Error al obtener los resúmenes de los artículos", error);
		}
	};

	// Función que lee los archivos MD en la carpeta `src/content/haikus` y extrae los metadatos y contenido
	const obtenerContenidoDeCadaArticulo = (dir) => {
		const directorioConArticulos = path.join(process.cwd(), dir);
		const nombresDeArticulos = fs.readdirSync(directorioConArticulos);

		// Leemos y extraemos los metadatos y el contenido de cada archivo
		return nombresDeArticulos
			.map((articulo) => {
				const direccionCompleta = path.join(directorioConArticulos, articulo);

				// Solo procesamos archivos .md
				if (articulo.endsWith(".md")) {
					const contenido = fs.readFileSync(direccionCompleta, "utf8");
					const { data, content } = matter(contenido); // `data` son los metadatos, `content` es el texto del haiku
					const contenidoFormateado = content
					.trim()
					.replace(/\n/g, "<br/>\n")
					.replaceAll("\\<br/>", "<br/>");

					return { ...data, content: contenidoFormateado}; // Guardamos tanto los metadatos como el contenido
				}

				// Si el archivo no es .md, lo ignoramos
				return null;
			})
			.filter(Boolean); // Filtramos posibles valores null
	};

	// Función que valida y parsea los metadatos de cada artículo
	const parsearMetadatos = (metadatos) => {
		return metadatos.map((metadato) => {
			// Aquí no hacemos validación, solo devolvemos el objeto tal cual
			return metadato;
		});
	};

	// Ejecutar la función directamente cuando se ejecute este módulo
	obtenerMetadatos(); // Usa la ruta por defecto 'src/content/haikus'
