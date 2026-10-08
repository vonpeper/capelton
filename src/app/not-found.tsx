import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Home, Phone, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Página no encontrada (404)',
  description: 'La página solicitada no existe o ha sido reubicada. Conoce nuestro catálogo de oficinas móviles y casetas de vigilancia en México.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#fafafc] flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/images/logo-capelton.webp"
            alt="Capelton México"
            width={320}
            height={50}
            priority
            className="h-9 sm:h-11 w-auto object-contain mx-auto"
          />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-capelton-green/10 text-capelton-green flex items-center justify-center text-2xl font-bold mb-4">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-3">
          Página no encontrada
        </h1>

        <p className="text-sm text-[#6e6e73] max-w-md mx-auto mb-8 leading-relaxed">
          El enlace que buscas no existe, pertenecía a una versión anterior del sitio web o ha sido reubicado. Explora nuestras soluciones modulares activas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mb-8 text-left">
          <Link
            href="/categorias/casetas"
            className="p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-capelton-green transition-all shadow-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-capelton-green" />
              <div>
                <div className="text-xs font-bold text-neutral-900 group-hover:text-capelton-green transition-colors">Casetas de Vigilancia</div>
                <div className="text-[11px] text-neutral-500">Modelos 1.2m a 3m</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-capelton-green group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/categorias/oficinas"
            className="p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-capelton-green transition-all shadow-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-capelton-green" />
              <div>
                <div className="text-xs font-bold text-neutral-900 group-hover:text-capelton-green transition-colors">Oficinas Móviles</div>
                <div className="text-[11px] text-neutral-500">Modelos 4m a 12m</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-capelton-green group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-black text-white hover:bg-capelton-green transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Ir a la página principal</span>
          </Link>
          <a
            href="tel:5529640104"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-400 transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-capelton-green" />
            <span>Llamar a Ventas (55 2964 0104)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
