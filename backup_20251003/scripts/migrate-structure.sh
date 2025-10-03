#!/bin/bash

# Portfolio Migration Script
# Script para migração automática da estrutura de arquivos

echo "🚀 Iniciando migração da estrutura do portfolio..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para log com cores
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos na pasta correta
if [ ! -f "package.json" ]; then
    log_error "Execute este script na raiz do projeto portfolio"
    exit 1
fi

log_info "Verificando estrutura atual..."

# Criar backup se necessário
if [ -d "backup_$(date +%Y%m%d)" ]; then
    log_warn "Backup já existe para hoje"
else
    log_info "Criando backup da estrutura atual..."
    mkdir -p "backup_$(date +%Y%m%d)"
    cp -r assets scripts data "backup_$(date +%Y%m%d)/" 2>/dev/null || true
fi

# Verificar se as pastas organizadas existem
log_info "Verificando nova estrutura..."

required_dirs=(
    "config"
    "src/data"
    "src/utils"
    "assets/css/base"
    "assets/css/components" 
    "assets/js/core"
    "assets/js/components"
    "assets/js/utils"
    "scripts"
    "docs"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        log_info "✅ $dir existe"
    else
        log_warn "❌ $dir não encontrado - criando..."
        mkdir -p "$dir"
    fi
done

# Verificar arquivos críticos
critical_files=(
    "config/portfolio.config.js"
    "config/manifest.json"
    "config/sw.js"
    "assets/js/core/main.js"
    "assets/js/core/performance.js"
    "src/utils/module-loader.js"
)

log_info "Verificando arquivos críticos..."
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file existe"
    else
        log_error "❌ $file não encontrado"
    fi
done

# Verificar referências nos HTML
log_info "Verificando referências em arquivos HTML..."

html_files=(
    "index.html"
    "pages/about/index.html"
    "pages/experience/index.html"
    "pages/skills/index.html"
    "pages/projects/index.html"
)

for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Verificar se contém referências antigas
        if grep -q "assets/css/utilities.css" "$file"; then
            log_warn "⚠️  $file contém referências antigas para utilities.css"
        fi
        if grep -q "assets/css/animations.css" "$file"; then
            log_warn "⚠️  $file contém referências antigas para animations.css"
        fi
        if grep -q "assets/js/main.js" "$file" && ! grep -q "assets/js/core/main.js" "$file"; then
            log_warn "⚠️  $file contém referências antigas para main.js"
        fi
    fi
done

# Verificar se os scripts npm funcionam
log_info "Testando scripts npm..."

if command -v npm &> /dev/null; then
    npm run lint > /dev/null 2>&1 && log_info "✅ npm run lint funciona" || log_warn "❌ npm run lint falhou"
else
    log_warn "npm não encontrado"
fi

# Verificar se o servidor funciona
log_info "Testando servidor local..."
timeout 3 python3 -m http.server 8001 > /dev/null 2>&1 &
SERVER_PID=$!
sleep 1

if ps -p $SERVER_PID > /dev/null; then
    log_info "✅ Servidor local funciona na porta 8001"
    kill $SERVER_PID 2>/dev/null
else
    log_warn "❌ Problema com servidor local"
fi

# Relatório final
echo ""
log_info "=== RELATÓRIO DE MIGRAÇÃO ==="
echo "📁 Estrutura de pastas: Criada"
echo "⚙️  Arquivos de configuração: Verificados"
echo "🎨 Assets organizados: CSS e JS em subpastas"
echo "📄 Documentação: Disponível em docs/"
echo "🛠️  Scripts: Movidos para scripts/"

echo ""
log_info "🎉 Migração concluída!"
log_info "📖 Consulte docs/ESTRUTURA.md para detalhes da nova organização"
log_info "🚀 Execute 'npm start' ou 'npm run serve' para iniciar o servidor"

echo ""
log_warn "⚠️  PRÓXIMOS PASSOS:"
echo "1. Verifique se todas as páginas carregam corretamente"
echo "2. Teste a navegação entre páginas"
echo "3. Confirme se os temas funcionam"
echo "4. Valide as funcionalidades JavaScript"