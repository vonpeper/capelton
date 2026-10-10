#!/usr/bin/env bash
# scripts/deploy-preview.sh — Despliegue automatizado a prev.capeltonmexico.com
set -euo pipefail

echo "=========================================================="
echo "  Desplegando nuevo sitio a prev.capeltonmexico.com"
echo "  Directivas: prelaunchMode=false, noindex=true"
echo "=========================================================="

# 1. Compilación estática Next.js con metadatos noindex y sitio completo activo
echo "-> 1. Compilando aplicación Next.js para entorno de revisión..."
NEXT_PUBLIC_PRELAUNCH_MODE=false \
NEXT_PUBLIC_NO_INDEX=true \
NEXT_PUBLIC_SITE_DOMAIN=prev.capeltonmexico.com \
STATIC_EXPORT=true \
npm run build

# 2. Sincronización a servidor remoto (propodvps1)
REMOTE_HOST="propodvps1"
REMOTE_DEST="/opt/stacks/capelton/site/prev/"

echo "-> 2. Sincronizando archivos estáticos hacia ${REMOTE_HOST}:${REMOTE_DEST}..."
ssh "${REMOTE_HOST}" "mkdir -p ${REMOTE_DEST}"
rsync -avz --delete out/ "${REMOTE_HOST}:${REMOTE_DEST}"

echo "=========================================================="
echo "  ✅ Archivos sincronizados exitosamente a ${REMOTE_DEST}"
echo "=========================================================="
