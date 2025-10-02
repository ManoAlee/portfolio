#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LinkedIn Portfolio Sync
Sincroniza dados do LinkedIn com o portfólio
"""

import json
import requests
from datetime import datetime
import os

class LinkedInSync:
    def __init__(self):
        self.portfolio_path = "/workspaces/portfolio"
        self.data_file = f"{self.portfolio_path}/data/profile.json"
        
    def create_data_structure(self):
        """Cria estrutura de dados para armazenar informações do perfil"""
        profile_data = {
            "basic_info": {
                "name": "Alessandro Dos Santos Costa Meneses",
                "title": "Assistente de TI JR",
                "company": "Automotion", 
                "location": "Boituva, SP",
                "phone": "(15) 99801-7732",
                "email": "ale_meneses2004@hotmail.com",
                "linkedin": "https://linkedin.com/in/alessandro-meneses-2425ab231",
                "github": "https://github.com/ManoAlee"
            },
            "experience": [
                {
                    "position": "Assistente de TI JR",
                    "company": "Automotion",
                    "location": "Boituva, SP", 
                    "start_date": "2025-06",
                    "end_date": "presente",
                    "description": "Especialista em infraestrutura de TI com responsabilidades abrangentes...",
                    "skills": ["Windows Server", "Linux", "Active Directory", "PowerShell", "Azure"]
                },
                {
                    "position": "Assistente de produção",
                    "company": "Bellacor Industria E Comercio De Tintas",
                    "location": "Boituva, SP",
                    "start_date": "2024-04",
                    "end_date": "2024-12", 
                    "description": "Ajudante de Produção no Setor de Envase...",
                    "skills": ["Controle de Qualidade", "Processos Industriais"]
                }
            ],
            "education": [
                {
                    "degree": "Gestão da Tecnologia da Informação",
                    "school": "FATEC Tatuí",
                    "start_date": "2022-02",
                    "end_date": "2025-07",
                    "status": "Concluído"
                }
            ],
            "skills": {
                "technical": [
                    {"name": "Windows Server", "level": 85},
                    {"name": "Linux", "level": 80},
                    {"name": "Active Directory", "level": 90},
                    {"name": "PowerShell", "level": 85},
                    {"name": "Python", "level": 75},
                    {"name": "Power BI", "level": 80}
                ],
                "soft_skills": [
                    "Trabalho em Equipe",
                    "Resolução de Problemas", 
                    "Comunicação",
                    "Gestão de Tempo"
                ]
            },
            "certifications": [
                "Microsoft Excel 2016",
                "Power BI Fundamentals",
                "Fundamentos de Data Science e IA",
                "Administração de Banco de Dados"
            ],
            "last_updated": datetime.now().isoformat()
        }
        
        # Cria diretório se não existir
        os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
        
        # Salva dados
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(profile_data, f, indent=2, ensure_ascii=False)
            
        print(f"✅ Arquivo de dados criado: {self.data_file}")
        return profile_data
    
    def update_from_manual_input(self):
        """Atualiza dados através de input manual"""
        print("\n🔄 ATUALIZAÇÃO MANUAL DO PORTFÓLIO")
        print("=" * 50)
        
        # Carrega dados existentes
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            print("📝 Criando estrutura de dados inicial...")
            data = self.create_data_structure()
        
        print("\n1️⃣ Informações Básicas")
        new_title = input(f"Cargo atual [{data['basic_info']['title']}]: ").strip()
        if new_title:
            data['basic_info']['title'] = new_title
            
        new_company = input(f"Empresa atual [{data['basic_info']['company']}]: ").strip()
        if new_company:
            data['basic_info']['company'] = new_company
        
        print("\n2️⃣ Adicionar Nova Experiência? (s/n)")
        if input().lower() == 's':
            exp = {}
            exp['position'] = input("Cargo: ")
            exp['company'] = input("Empresa: ")
            exp['location'] = input("Local: ")
            exp['start_date'] = input("Data início (YYYY-MM): ")
            exp['end_date'] = input("Data fim (YYYY-MM ou 'presente'): ")
            exp['description'] = input("Descrição: ")
            exp['skills'] = input("Skills (separadas por vírgula): ").split(',')
            
            data['experience'].insert(0, exp)  # Adiciona no início
        
        print("\n3️⃣ Adicionar Nova Certificação? (s/n)")
        if input().lower() == 's':
            cert = input("Nome da certificação: ")
            data['certifications'].append(cert)
        
        # Atualiza timestamp
        data['last_updated'] = datetime.now().isoformat()
        
        # Salva dados atualizados
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Dados atualizados em {self.data_file}")
        return data
    
    def generate_html_snippets(self, data):
        """Gera snippets HTML atualizados"""
        
        # Snippet para título principal
        title_snippet = f"""                <h1 class="title text-5xl mb-6">
                    {data['basic_info']['title']} | Graduado em GTI | Especialista em Infraestrutura
                </h1>"""
        
        # Snippet para experiências
        experiences_html = ""
        for i, exp in enumerate(data['experience'][:3]):  # Primeiras 3 experiências
            end_date = "Presente" if exp['end_date'] == 'presente' else exp['end_date']
            
            experiences_html += f"""
            <!-- {exp['company']} -->
            <div class="card group mb-8">
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-server text-2xl text-primary"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-semibold mb-1">{exp['position']}</h3>
                                <p class="text-primary mb-2">{exp['company']}</p>
                                <p class="text-gray-400 text-sm">{exp['start_date']} - {end_date}</p>
                                <p class="text-gray-400 text-sm">{exp['location']}</p>
                            </div>
                        </div>
                        <p class="text-gray-400 mb-4">{exp['description']}</p>
                    </div>
                </div>
            </div>"""
        
        # Snippet para certificações
        certs_html = ""
        for cert in data['certifications']:
            certs_html += f'                    <p class="text-gray-400 text-sm">✓ {cert}</p>\n'
        
        # Salva snippets
        snippets = {
            'title': title_snippet,
            'experiences': experiences_html,
            'certifications': certs_html,
            'last_updated': data['last_updated']
        }
        
        snippets_file = f"{self.portfolio_path}/data/snippets.json"
        with open(snippets_file, 'w', encoding='utf-8') as f:
            json.dump(snippets, f, indent=2, ensure_ascii=False)
        
        print(f"📝 Snippets HTML gerados: {snippets_file}")
        return snippets
    
    def update_portfolio_files(self, snippets):
        """Atualiza arquivos HTML do portfólio"""
        
        print("\n🔄 Atualizando arquivos HTML...")
        
        # Lista de arquivos para atualizar
        files_to_update = [
            f"{self.portfolio_path}/index.html",
            f"{self.portfolio_path}/pages/about/index.html",
            f"{self.portfolio_path}/pages/experience/index.html"
        ]
        
        for file_path in files_to_update:
            if os.path.exists(file_path):
                print(f"   📄 {os.path.basename(file_path)} - Arquivo encontrado")
            else:
                print(f"   ❌ {os.path.basename(file_path)} - Arquivo não encontrado")
        
        print(f"\n💡 Para aplicar as mudanças, execute:")
        print(f"   python3 apply_updates.py")
        
    def run_sync(self):
        """Executa o processo completo de sincronização"""
        print("🚀 LINKEDIN PORTFOLIO SYNC")
        print("=" * 40)
        
        # Atualiza dados
        data = self.update_from_manual_input() 
        
        # Gera snippets
        snippets = self.generate_html_snippets(data)
        
        # Informa sobre atualização de arquivos
        self.update_portfolio_files(snippets)
        
        print(f"\n✅ Sincronização concluída!")
        print(f"📅 Última atualização: {datetime.now().strftime('%d/%m/%Y %H:%M')}")

if __name__ == "__main__":
    sync = LinkedInSync()
    sync.run_sync()