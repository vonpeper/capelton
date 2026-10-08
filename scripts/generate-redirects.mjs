import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const productsPath = path.join(rootDir, "src/data/products.json");
const categoriesPath = path.join(rootDir, "src/data/categories.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));

const redirects = [];

// 1. Products (e.g. /cmb10m/ -> /modelos/cmb10m)
for (const p of products) {
  if (p.slug) {
    redirects.push({
      fromSlug: p.slug,
      targetUrl: `/modelos/${p.slug}`,
      canonicalUrl: `https://capeltonmexico.com/modelos/${p.slug}`,
      title: `${p.modelCode || p.title} | ${p.categoryName || "Módulos"} Capelton México`,
      description: `${p.tagline || `Modelo ${p.modelCode} de Capelton México.`}`,
    });
  }
}

// 2. Categories (e.g. /oficinas-moviles/ and /oficinas/ -> /categorias/oficinas)
for (const c of categories) {
  if (c.slug) {
    redirects.push({
      fromSlug: c.slug,
      targetUrl: `/categorias/${c.id}`,
      canonicalUrl: `https://capeltonmexico.com/categorias/${c.id}`,
      title: `${c.name} | Catálogo Capelton México`,
      description: `${c.tagline || `Catálogo de ${c.name} Capelton México.`}`,
    });
  }
  // Also handle alias if slug != id
  if (c.id && c.slug !== c.id) {
    redirects.push({
      fromSlug: c.id,
      targetUrl: `/categorias/${c.id}`,
      canonicalUrl: `https://capeltonmexico.com/categorias/${c.id}`,
      title: `${c.name} | Catálogo Capelton México`,
      description: `${c.tagline || `Catálogo de ${c.name} Capelton México.`}`,
    });
  }
}

// 3. Common legacy URLs
const legacyStatic = [
  { fromSlug: "contacto", targetUrl: "/#contacto", title: "Contacto | Capelton México" },
  { fromSlug: "contacto-capelton", targetUrl: "/#contacto", title: "Contacto | Capelton México" },
  { fromSlug: "nosotros-capelton", targetUrl: "/nosotros", title: "Nosotros | Capelton México" },
  { fromSlug: "aviso-privacidad", targetUrl: "/aviso-de-privacidad", title: "Aviso de Privacidad | Capelton México" },
  { fromSlug: "politica-de-privacidad", targetUrl: "/aviso-de-privacidad", title: "Aviso de Privacidad | Capelton México" },
  { fromSlug: "terminos", targetUrl: "/terminos-y-condiciones", title: "Términos y Condiciones | Capelton México" },
];

for (const leg of legacyStatic) {
  redirects.push({
    fromSlug: leg.fromSlug,
    targetUrl: leg.targetUrl,
    canonicalUrl: `https://capeltonmexico.com${leg.targetUrl}`,
    title: leg.title,
    description: "Capelton México - Soluciones modulares y casetas.",
  });
}

function createHtml(targetUrl, canonicalUrl, title, description) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  ${description ? `<meta name="description" content="${description}">` : ""}
  <link rel="canonical" href="${canonicalUrl}">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <meta name="robots" content="index, follow">
  <script>
    window.location.replace("${targetUrl}");
  </script>
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 40px;">
  <p>Redirigiendo a <a href="${targetUrl}">${targetUrl}</a>...</p>
</body>
</html>
`;
}

// Write to public/
const publicDir = path.join(rootDir, "public");
let count = 0;

for (const r of redirects) {
  const html = createHtml(r.targetUrl, r.canonicalUrl, r.title, r.description);
  
  // Create /public/[slug]/index.html
  const slugDir = path.join(publicDir, r.fromSlug);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(slugDir, "index.html"), html, "utf-8");

  // Also create /public/[slug].html for Nginx try_files $uri.html
  fs.writeFileSync(path.join(publicDir, `${r.fromSlug}.html`), html, "utf-8");
  count++;
}

console.log(`Successfully generated ${count} legacy redirect entrypoints in public/`);
