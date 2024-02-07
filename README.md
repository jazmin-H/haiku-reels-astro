# Haikus ETEC

Características:

- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support
- ✅ Tailwind CSS

## 🚀 Project Structure

Además la estructura básica de cualquier proyecto desarrollado con Astro🚀, se incorporan algunas carpetas propias de esta plantilla.

```
├── public/
├── src/
│   ├── backgrounds/
│   ├── config/
│   ├── content/
│   ├── haiku/
│   ├── layouts/
│   └── pages/
│   └── styles/
├── astro.config.mjs
├── tailwind.config.cjs
├── README.md
├── package.json
└── tsconfig.json
```

## Backgrounds

En la carpeta `backgrounds` se encuentran cada uno de los "fondos" que acompañan a los haikus, separados por carpetas.

Cada `background` debe estar envuelto en el componente `haiku-section.astro` , limitándose a sus dimensiones para no romper con el flujo normal de la interfaz.

Por otro lado, el `background` debe contener a la etiqueta `<slot/>` siendo que este será reemplazado por el haiku correspondiente.

```react
---
import HaikuSection from "@haiku/haiku-section.astro";
---

<HaikuSection>
  <div class="bg-atomic_tangerine h-full"><slot /></div>
</HaikuSection>
```

## Haikus

No es trivial la forma en que se agregan los haikus a la carpeta `src/content/haikus`. Al margen de los metadatos obligatorios para cada documento (expresados en el archivo `src/content/config.ts`), cada haiku suele estar compuesto por tres versos. Dejamos a continuación ejemplos de como debe finalizar cada verso, tal que su salto de línea sea respetado

**Dos espacios al final de cada verso (Recomendado)**

```tex
El sol brilloso
camina con nosotros
y se apaga.
```

**Contra barra al final de cada verso**

```tex
Amor que brilla\
En el calor nocturno\
Tiernas caricias.
```

**Etiqueta `</br>` al final de cada verso (Para nada recom**

```tex
La noche oscura. <br/>
El cielo es muy brillante. <br/>
Amanecer.
```

Autoras de cada uno de los haikus usados como ejemplo:

- Camila Vargas Pinto
- Antonela Ticona
- Mía Ledesma
- Zaira González

## Tailwind Typography

Para otorgar estilos a los haikus dentro de cada `background`, se pueden utilizar las clases de la librería [@tailwind/typography](https://docs.astro.build/en/recipes/tailwind-rendered-markdown/). La documentación oficial provee de suficiente información para su implementación.

```react
---
import HaikuSection from "@haiku/haiku-section.astro";
---

<HaikuSection>
  <div class="bg-atomic_tangerine h-full tablet:rounded-tablet">
    <div class="flex justify-center items-center h-full">
      <div class="prose prose-p:text-delft_blue prose-p:font-bold">
        <slot />
      </div>
    </div>
  </div>
</HaikuSection>

```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

Make with ❤️by Joacko B.
