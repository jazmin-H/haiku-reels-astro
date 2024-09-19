import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const loadHaikus = () => {
  const haikusDirectory = path.join(process.cwd(), 'src/content/haikus'); // Ajusta la ruta
  const fileNames = fs.readdirSync(haikusDirectory);
  
  const allHaikus = fileNames.map(fileName => {
    const filePath = path.join(haikusDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      autoria: data.autoria,
      pubDate: data.pubDate,
      anio: data.anio,
      escuela: data.escuela,
      curso: data.curso,
      content: content.trim(),
    };
  });

  return allHaikus;
};

export default loadHaikus;
