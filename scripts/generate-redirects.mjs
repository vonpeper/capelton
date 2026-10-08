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

// Helper to push redirect
function addRedirect(fromSlug, targetUrl, title, description) {
  redirects.push({
    fromSlug: fromSlug.replace(/^\/+|\/+$/g, ""),
    targetUrl,
    canonicalUrl: `https://capeltonmexico.com${targetUrl.startsWith("/") ? targetUrl : "/" + targetUrl}`,
    title,
    description,
  });
}

// 1. Products (root /slug/, /producto/slug/, /product/slug/)
for (const p of products) {
  if (p.slug) {
    const title = `${p.modelCode || p.title} | ${p.categoryName || "Módulos"} Capelton México`;
    const desc = `${p.tagline || `Modelo ${p.modelCode} de Capelton México.`}`;
    
    // Root URL e.g. /cmb10m/
    addRedirect(p.slug, `/modelos/${p.slug}`, title, desc);
    // WooCommerce URLs e.g. /producto/cmb10m/ and /product/cmb10m/
    addRedirect(`producto/${p.slug}`, `/modelos/${p.slug}`, title, desc);
    addRedirect(`product/${p.slug}`, `/modelos/${p.slug}`, title, desc);
  }
}

// 2. Categories (slug, id, and WordPress taxonomy prefixes)
for (const c of categories) {
  const title = `${c.name} | Catálogo Capelton México`;
  const desc = `${c.tagline || `Catálogo de ${c.name} Capelton México.`}`;
  
  const categoryAliases = new Set([c.slug, c.id].filter(Boolean));
  for (const alias of categoryAliases) {
    addRedirect(alias, `/categorias/${c.id}`, title, desc);
    addRedirect(`categoria/${alias}`, `/categorias/${c.id}`, title, desc);
    addRedirect(`category/${alias}`, `/categorias/${c.id}`, title, desc);
    addRedirect(`categoria-producto/${alias}`, `/categorias/${c.id}`, title, desc);
    addRedirect(`product-category/${alias}`, `/categorias/${c.id}`, title, desc);
  }
}

// 3. Known Legacy WordPress Pages & Plugins
const legacyStatic = [
  { slug: "contacto", target: "/#contacto", title: "Contacto | Capelton México" },
  { slug: "contacto-2", target: "/#contacto", title: "Contacto | Capelton México" },
  { slug: "contacto-capelton", target: "/#contacto", title: "Contacto | Capelton México" },
  { slug: "nosotros-capelton", target: "/nosotros", title: "Nosotros | Capelton México" },
  { slug: "aviso-privacidad", target: "/aviso-de-privacidad", title: "Aviso de Privacidad | Capelton México" },
  { slug: "politica-de-privacidad", target: "/aviso-de-privacidad", title: "Aviso de Privacidad | Capelton México" },
  { slug: "terminos", target: "/terminos-y-condiciones", title: "Términos y Condiciones | Capelton México" },
  { slug: "login", target: "/", title: "Capelton México" },
  { slug: "cuenta-de-membresia", target: "/", title: "Capelton México" },
  { slug: "cuenta-de-membresia/tu-perfil", target: "/", title: "Capelton México" },
  { slug: "cuenta-de-membresia/facturacion-de-membresia", target: "/", title: "Capelton México" },
  { slug: "cuenta-de-membresia/pedidos-de-membresia", target: "/", title: "Capelton México" },
  { slug: "niveles-de-membresia", target: "/", title: "Capelton México" },
  { slug: "equipo-mobiliario", target: "/", title: "Capelton México" },
  { slug: "catalogo", target: "/", title: "Catálogo | Capelton México" },
  { slug: "tienda", target: "/", title: "Capelton México" },
  { slug: "shop", target: "/", title: "Capelton México" },
  { slug: "renta", target: "/#contacto", title: "Renta de Módulos | Capelton México" },
  { slug: "venta", target: "/#contacto", title: "Venta de Módulos | Capelton México" },
  { slug: "comunicado", target: "/aviso-de-privacidad", title: "Comunicado Oficial | Capelton México" },
  { slug: "comunicados", target: "/aviso-de-privacidad", title: "Comunicado Oficial | Capelton México" },
];

for (const leg of legacyStatic) {
  addRedirect(leg.slug, leg.target, leg.title, "Capelton México - Soluciones modulares y casetas.");
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
  
  // Create /public/[fromSlug]/index.html
  const slugDir = path.join(publicDir, r.fromSlug);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(slugDir, "index.html"), html, "utf-8");

  // Also create /public/[fromSlug].html for Nginx try_files $uri.html
  // Only if fromSlug doesn't have slashes
  if (!r.fromSlug.includes("/")) {
    fs.writeFileSync(path.join(publicDir, `${r.fromSlug}.html`), html, "utf-8");
  }
  count++;
}

console.log(`Successfully generated ${count} legacy redirect entrypoints in public/`);
