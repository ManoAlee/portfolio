## Personas para orientar o fluxo "Adicionar Projeto"

Essas personas ajudam a decidir quais campos, validações e experiência de uso o formulário de criação de projetos deve ter.

1) João — Recrutador de TI (HR)
- Idade: 30-45
- Cargo: Recrutador / Talent Acquisition
- Objetivo: Encontrar rapidamente evidências de competências técnicas e projetos aplicados. Quer ver resumo curto, tecnologias, papel no projeto, link para código/demonstração e disponibilidade.
- Frustrações: Portfólios sem links diretos, imagens quebradas, falta de contexto (o que você fez, qual foi o impacto).
- Requisitos para o formulário: campos curtos e obrigatórios — título, resumo, tecnologias, link GitHub, demo (opcional), status.

2) Mariana — Gerente de Contratação / Hiring Manager
- Idade: 35-50
- Cargo: Gerente técnico
- Objetivo: Avaliar profundidade técnica e responsabilidades (papel, duração, desafios/resolução). Procura links para documentação e exemplos reproduzíveis.
- Frustrações: Projetos vagos sem métricas, sem explicação do seu papel, sem código legível.
- Requisitos: campos detalhados — desafios, solução, métricas, duração, papel, documentação.

3) Lucas — Colega Desenvolvedor / Parceiro de Projeto
- Idade: 22-35
- Cargo: Desenvolvedor ou estudante
- Objetivo: Entender stack, reusabilidade, ver snippets e repositórios; testar demo rapidamente.
- Frustrações: Demorado para encontrar o código-fonte, imagens grandes sem thumbnails, demos offline.
- Requisitos: permitir adicionar tecnologias (tags), links para repositório e demo, upload de thumbnail/responsividade.

4) Cliente em Potencial — PM/Founder
- Idade: 28-55
- Cargo: Dono de produto ou PM
- Objetivo: Ver impacto de negócios, rapidez e clareza. Quer ver casos de uso e resultados (KPIs simples).
- Frustrações: Projetos muito técnicos sem foco no negócio.
- Requisitos: adicionar campo 'impacto' ou 'métricas' e uma descrição curta para negócios.

Decisões de design baseadas nas personas
- Campos obrigatórios (essenciais para João): título, resumo curto, tecnologias (tag), link GitHub ou demo, status.
- Campos avançados (para Mariana e Cliente): desafios, solução, métricas/impacto, duração, papel.
- UX: upload opcional de thumbnail (gera thumbnail local), pré-visualização, validação clara e mensagem de sucesso.
- Segurança: formular sem armazenar segredos; links externos devem abrir em nova aba com rel="noopener".

Com essas personas em mente, vou criar uma página funcional `pages/projects/add.html`, o front-end JS para submissão e endpoints server-side para persistência em `data/projects.json`.
