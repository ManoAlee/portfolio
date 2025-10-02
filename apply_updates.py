#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply Profile Updates
Aplica automaticamente atualizações do perfil nos arquivos HTML
"""

import json
import re
import os
from datetime import datetime

class ProfileUpdater:
    def __init__(self):
        self.portfolio_path = "/workspaces/portfolio"
        self.data_file = f"{self.portfolio_path}/data/profile.json"
        
    def load_profile_data(self):
        """Carrega dados do perfil"""
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print("❌ Arquivo de dados não encontrado. Execute linkedin_sync.py primeiro.")
            return None
    
    def update_index_page(self, data):
        """Atualiza a página principal (index.html)"""
        file_path = f"{self.portfolio_path}/index.html"
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Atualiza título principal
            title_pattern = r'<h1 class="title text-5xl mb-6">\s*.*?\s*</h1>'
            new_title = f'''<h1 class="title text-5xl mb-6">
                    {data['basic_info']['title']} | Graduado em GTI | Especialista em Infraestrutura
                </h1>'''
            content = re.sub(title_pattern, new_title, content, flags=re.DOTALL)
            
            # Atualiza descrição/bio
            bio_pattern = r'<p class="text-gray-300 text-lg mb-8">\s*.*?\s*</p>'
            new_bio = f'''<p class="text-gray-300 text-lg mb-8">
                    {data['basic_info']['bio']}
                </p>'''
            content = re.sub(bio_pattern, new_bio, content, flags=re.DOTALL)
            
            # Atualiza status atual
            status_pattern = r'<span class="text-sm font-medium">.*?</span>'
            new_status = f'<span class="text-sm font-medium">{data["basic_info"]["title"]} - {data["basic_info"]["company"]}</span>'
            content = re.sub(status_pattern, new_status, content)
            
            # Salva arquivo atualizado
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ {file_path} atualizado")
            
        except Exception as e:
            print(f"❌ Erro ao atualizar {file_path}: {e}")
    
    def update_about_page(self, data):
        """Atualiza a página sobre"""
        file_path = f"{self.portfolio_path}/pages/about/index.html"
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Atualiza descrição no header
            header_desc_pattern = r'<p class="text-gray-300 text-lg max-w-2xl mx-auto">\s*.*?\s*</p>'
            new_desc = f'''<p class="text-gray-300 text-lg max-w-2xl mx-auto">
                Graduado em GTI com especialização em {data['basic_info']['title'].lower()}.
                Apaixonado por tecnologia e transformação digital.
            </p>'''
            content = re.sub(header_desc_pattern, new_desc, content, flags=re.DOTALL)
            
            # Salva arquivo
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ {file_path} atualizado")
            
        except Exception as e:
            print(f"❌ Erro ao atualizar {file_path}: {e}")
    
    def update_experience_page(self, data):
        """Atualiza página de experiência"""
        file_path = f"{self.portfolio_path}/pages/experience/index.html"
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Gera HTML para experiências atualizadas
            experiences_html = ""
            
            for exp in data['experience']:
                end_date = "Presente" if exp['current'] else exp['end_date']
                icon = "server" if exp['current'] else "industry"
                
                experiences_html += f'''
            <!-- {exp['company']} -->
            <div class="card group mb-8">
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-{icon} text-2xl text-primary"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-semibold mb-1">{exp['position']}</h3>
                                <p class="text-primary mb-2">{exp['company']}</p>
                                <p class="text-gray-400 text-sm">{exp['start_date']} - {end_date}</p>
                                <p class="text-gray-400 text-sm">{exp['location']}</p>
                            </div>
                            <span class="tag tag-primary">
                                <i class="fas fa-{icon}"></i>
                                {'Atual' if exp['current'] else 'Experiência'}
                            </span>
                        </div>
                        <p class="text-gray-400 mb-4">
                            {exp['description']}
                        </p>
                    </div>
                </div>
            </div>'''
            
            # Substitui seção de timeline
            timeline_pattern = r'(<!-- Timeline -->\s*<section class="container py-16">\s*<div class="max-w-4xl mx-auto">)(.*?)(<!-- Formação -->)'
            
            replacement = f'''\\1{experiences_html}

            \\3'''
            
            content = re.sub(timeline_pattern, replacement, content, flags=re.DOTALL)
            
            # Salva arquivo
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ {file_path} atualizado")
            
        except Exception as e:
            print(f"❌ Erro ao atualizar {file_path}: {e}")
    
    def update_metadata(self, data):
        """Atualiza metadados do projeto"""
        
        # Atualiza package.json
        package_file = f"{self.portfolio_path}/package.json"
        try:
            with open(package_file, 'r', encoding='utf-8') as f:
                package_data = json.load(f)
            
            package_data['description'] = f"Portfólio profissional de {data['basic_info']['name']} - {data['basic_info']['title']}"
            package_data['version'] = data['meta']['version']
            
            with open(package_file, 'w', encoding='utf-8') as f:
                json.dump(package_data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ {package_file} atualizado")
            
        except Exception as e:
            print(f"❌ Erro ao atualizar package.json: {e}")
    
    def run_update(self):
        """Executa atualização completa"""
        print("🔄 APLICANDO ATUALIZAÇÕES DO PERFIL")
        print("=" * 45)
        
        # Carrega dados
        data = self.load_profile_data()
        if not data:
            return False
        
        print(f"📅 Dados atualizados em: {data['meta']['last_updated']}")
        print(f"🎯 Cargo atual: {data['basic_info']['title']}")
        print(f"🏢 Empresa: {data['basic_info']['company']}")
        print()
        
        # Atualiza páginas
        self.update_index_page(data)
        self.update_about_page(data)
        self.update_experience_page(data)
        self.update_metadata(data)
        
        # Atualiza timestamp dos metadados
        data['meta']['last_updated'] = datetime.now().isoformat()
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Atualização concluída!")
        print(f"📝 Para aplicar no GitHub, execute:")
        print(f"   git add .")
        print(f"   git commit -m 'update: Sync com dados do LinkedIn'")
        print(f"   git push origin main")
        
        return True

if __name__ == "__main__":
    updater = ProfileUpdater()
    updater.run_update()