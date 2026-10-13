const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || "capeltonmexico.com";
const isPrelaunch =
  siteDomain === "prev.capeltonmexico.com"
    ? false
    : process.env.NEXT_PUBLIC_PRELAUNCH_MODE === "false"
    ? false
    : true;

export const SITE_CONFIG = {
  // Conmutador principal: 'true' muestra la Landing Previa ("Estamos preparando nuestro nuevo sitio").
  // Cuando NEXT_PUBLIC_PRELAUNCH_MODE es 'false', muestra el nuevo sitio completo.
  prelaunchMode: isPrelaunch,

  name: "Capelton México",
  legalName: "Capelton de México S.A. de C.V.",
  tagline: "Espacios Móviles, Casetas y Oficinas Modulares",
  domain: siteDomain,
  url: `https://${siteDomain}`,
  email: "ventas@capeltonmexico.com",
  location: "Planta y oficinas: Metepec, Estado de México",
  schedule: "Lunes a Sábado hasta las 6:00 pm",

  contact: {
    ventas: {
      label: "Venta Directa",
      subtitle: "Adquisición de Unidades Modulares",
      phone: "55 2964 0104",
      phoneFormatted: "+52 55 2964 0104",
      phoneRaw: "5529640104",
      telHref: "tel:5529640104",
      waLink: "https://wa.link/n81wvt",
      waNumber: "5215529640104",
      waDefaultMessage: "Hola, deseo cotizar la VENTA de un espacio modular Capelton",
    },
    rentas: {
      label: "Renta de Unidades",
      subtitle: "Arrendamiento Flexible",
      phone: "55 7948 3632",
      phoneFormatted: "+52 55 7948 3632",
      phoneRaw: "5579483632",
      telHref: "tel:5579483632",
      waLink: "https://wa.link/x5qgqf",
      waNumber: "5215579483632",
      waDefaultMessage: "Hola, deseo cotizar la RENTA de un espacio modular Capelton",
    },
  },
};
