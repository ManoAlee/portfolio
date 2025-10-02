#!/bin/bash

# ===== LINKEDIN PORTFOLIO SYNC =====
# Script simplificado para sincronizar portfólio com LinkedIn

echo "🚀 LINKEDIN PORTFOLIO SYNC"
echo "=========================="
echo

# Verifica se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale o Python primeiro."
    exit 1
fi

echo "Escolha uma opção:"
echo "1) 📝 Atualização Manual (recomendado)"
echo "2) 🔄 Aplicar atualizações existentes"
echo "3) 📊 Ver dados atuais" 
echo "4) 🌐 Subir para GitHub"
echo

read -p "Digite sua escolha (1-4): " choice

case $choice in
    1)
        echo "📝 Iniciando atualização manual..."
        python3 linkedin_sync.py
        echo
        read -p "Deseja aplicar as mudanças aos arquivos HTML? (s/n): " apply
        if [[ $apply == "s" || $apply == "S" ]]; then
            python3 apply_updates.py
            echo
            read -p "Deseja fazer commit das mudanças? (s/n): " commit
            if [[ $commit == "s" || $commit == "S" ]]; then
                git add .
                git commit -m "update: Sincronização com perfil LinkedIn - $(date +'%d/%m/%Y %H:%M')"
                echo "📤 Deseja fazer push para GitHub? (s/n): "
                read push
                if [[ $push == "s" || $push == "S" ]]; then
                    git push origin main
                    echo "✅ Portfolio atualizado no GitHub!"
                fi
            fi
        fi
        ;;
    2) 
        echo "🔄 Aplicando atualizações..."
        python3 apply_updates.py
        ;;
    3)
        echo "📊 Dados atuais do perfil:"
        if [ -f "data/profile.json" ]; then
            python3 -c "
import json
with open('data/profile.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print(f'Nome: {data[\"basic_info\"][\"name\"]}')
print(f'Cargo: {data[\"basic_info\"][\"title\"]}') 
print(f'Empresa: {data[\"basic_info\"][\"company\"]}')
print(f'Última atualização: {data[\"meta\"][\"last_updated\"]}')
print(f'Experiências: {len(data[\"experience\"])}')
print(f'Certificações: {len(data[\"certifications\"])}')
"
        else
            echo "❌ Arquivo de dados não encontrado. Execute a opção 1 primeiro."
        fi
        ;;
    4)
        echo "🌐 Subindo para GitHub..."
        git add .
        git status
        echo
        read -p "Confirma o commit das mudanças? (s/n): " confirm
        if [[ $confirm == "s" || $confirm == "S" ]]; then
            read -p "Digite a mensagem do commit: " message
            if [ -z "$message" ]; then
                message="update: Atualização do portfólio - $(date +'%d/%m/%Y %H:%M')"
            fi
            git commit -m "$message"
            git push origin main
            echo "✅ Portfolio atualizado no GitHub!"
            echo "🌐 Acesse: https://manoalee.github.io/portfolio"
        fi
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo
echo "✅ Operação concluída!"
echo "💡 Execute este script sempre que atualizar seu LinkedIn"