#!/bin/bash

# Portfolio Debug Script
# Script para verificar e corrigir problemas comuns

echo "🔧 Script de Debug do Portfolio"
echo "================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_debug() { echo -e "${BLUE}[DEBUG]${NC} $1"; }

# Verificar se estamos na pasta correta
if [ ! -f "package.json" ]; then
    log_error "Execute este script na raiz do projeto portfolio"
    exit 1
fi

echo ""
log_info "🔍 Verificando estrutura de arquivos..."

# Verificar arquivos CSS críticos
critical_css=(
    "assets/css/styles.css"
    "assets/css/base/utilities.css"
    "assets/css/base/animations.css"
)

echo ""
log_info "📄 Verificando arquivos CSS..."
for file in "${critical_css[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file"
    else
        log_error "❌ $file - NÃO ENCONTRADO"
        
        # Tentar criar fallback
        if [[ $file == *"utilities.css" ]]; then
            log_warn "Criando utilities.css básico..."
            mkdir -p "$(dirname "$file")"
            cat > "$file" << 'EOF'
/* Utilities CSS Fallback */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-6 { gap: 1.5rem; }
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-xl { font-size: 1.25rem; }
.btn { padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; }
.glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
EOF
            log_info "✅ utilities.css criado"
        elif [[ $file == *"animations.css" ]]; then
            log_warn "Criando animations.css básico..."
            mkdir -p "$(dirname "$file")"
            cat > "$file" << 'EOF'
/* Animations CSS Fallback */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.fade-in-up { animation: fadeInUp 0.6s ease-out; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
.transition-all { transition: all 0.3s ease; }
EOF
            log_info "✅ animations.css criado"
        fi
    fi
done

# Verificar arquivos JavaScript críticos
critical_js=(
    "assets/js/core/main.js"
    "assets/js/core/performance.js"
    "assets/js/components/footer.js"
    "config/portfolio.config.js"
)

echo ""
log_info "📜 Verificando arquivos JavaScript..."
for file in "${critical_js[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file"
    else
        log_error "❌ $file - NÃO ENCONTRADO"
    fi
done

# Verificar Service Worker
echo ""
log_info "⚙️ Verificando Service Worker..."
if [ -f "config/sw.js" ]; then
    log_info "✅ config/sw.js"
    
    # Verificar se os caminhos no SW estão corretos
    if grep -q "assets/css/utilities.css" "config/sw.js"; then
        log_warn "⚠️  Service Worker contém caminhos antigos"
        log_info "Corrigindo caminhos no Service Worker..."
        
        sed -i 's|/assets/css/utilities.css|/assets/css/base/utilities.css|g' config/sw.js
        sed -i 's|/assets/css/animations.css|/assets/css/base/animations.css|g' config/sw.js
        sed -i 's|/assets/js/main.js|/assets/js/core/main.js|g' config/sw.js
        sed -i 's|/assets/js/performance.js|/assets/js/core/performance.js|g' config/sw.js
        sed -i 's|/assets/js/footer.js|/assets/js/components/footer.js|g' config/sw.js
        
        log_info "✅ Caminhos do Service Worker corrigidos"
    fi
else
    log_error "❌ config/sw.js - NÃO ENCONTRADO"
fi

# Verificar arquivos de configuração
echo ""
log_info "🔧 Verificando configurações..."
config_files=(
    "config/manifest.json"
    "config/portfolio.config.js"
)

for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file"
    else
        log_error "❌ $file - NÃO ENCONTRADO"
    fi
done

# Verificar referências no index.html
echo ""
log_info "🌐 Verificando referências no HTML..."

if [ -f "index.html" ]; then
    # Verificar se há referências antigas
    old_refs=$(grep -E "(assets/css/utilities\.css|assets/css/animations\.css|assets/js/main\.js)" index.html | wc -l)
    
    if [ "$old_refs" -gt 0 ]; then
        log_warn "⚠️  Encontradas $old_refs referências antigas no index.html"
        
        # Corrigir automaticamente
        log_info "Corrigindo referências..."
        sed -i 's|assets/css/utilities\.css|assets/css/base/utilities.css|g' index.html
        sed -i 's|assets/css/animations\.css|assets/css/base/animations.css|g' index.html
        sed -i 's|"assets/js/main\.js"|"assets/js/core/main.js"|g' index.html
        sed -i 's|"assets/js/performance\.js"|"assets/js/core/performance.js"|g' index.html
        sed -i 's|"assets/js/footer\.js"|"assets/js/components/footer.js"|g' index.html
        
        log_info "✅ Referências corrigidas no index.html"
    else
        log_info "✅ Referências no HTML estão corretas"
    fi
else
    log_error "❌ index.html não encontrado"
fi

# Verificar dependências npm
echo ""
log_info "📦 Verificando dependências..."
if command -v npm &> /dev/null; then
    if npm list --depth=0 &> /dev/null; then
        log_info "✅ Dependências npm OK"
    else
        log_warn "⚠️  Problemas com dependências npm"
        log_info "Executando npm install..."
        npm install
    fi
else
    log_warn "⚠️  npm não encontrado"
fi

# Testar servidor
echo ""
log_info "🌐 Testando servidor local..."
if command -v python3 &> /dev/null; then
    log_info "✅ Python3 disponível"
    
    # Testar se a porta 8000 está livre
    if ! netstat -tuln | grep -q ":8000 "; then
        log_info "✅ Porta 8000 disponível"
    else
        log_warn "⚠️  Porta 8000 em uso"
    fi
else
    log_warn "⚠️  Python3 não encontrado"
fi

# Resumo final
echo ""
echo "======================================="
log_info "🎯 RESUMO DA VERIFICAÇÃO"
echo "======================================="

if [ -f "assets/js/core/main.js" ] && [ -f "config/sw.js" ] && [ -f "index.html" ]; then
    log_info "✅ Arquivos principais encontrados"
else
    log_error "❌ Alguns arquivos principais estão ausentes"
fi

if [ -f "assets/css/base/utilities.css" ] && [ -f "assets/css/base/animations.css" ]; then
    log_info "✅ Arquivos CSS organizados"
else
    log_warn "⚠️  Alguns arquivos CSS podem estar ausentes"
fi

echo ""
log_info "🚀 Para iniciar o servidor:"
echo "   npm start"
echo "   ou"
echo "   python3 -m http.server 8000"

echo ""
log_info "🔍 Para verificar logs do navegador:"
echo "   Abra as DevTools (F12) e veja o Console"

echo ""
log_info "📚 Documentação:"
echo "   Consulte docs/ESTRUTURA.md para mais detalhes"