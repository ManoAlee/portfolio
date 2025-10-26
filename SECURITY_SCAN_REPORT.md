# Relatório de Varredura de Segurança — Portfólio

Data: 2025-10-26

Resumo rápido
- Atualizei dois arquivos para remover e-mails indicados pelo autor (privacidade):
  - `config/portfolio.config.js` — campo `email` removido (agora string vazia).
  - `assets/js/core/portfolio-manager.js` — email de exemplo removido (string vazia).
- Executei extração/varredura em `docs/` (grep em binários) e varredura no backup e no histórico Git.

1) Mudanças realizadas

- `config/portfolio.config.js`: campo `email` substituído por string vazia para proteger contato não existente.
- `assets/js/core/portfolio-manager.js`: removido email de exemplo e deixado campo vazio.

2) Scan em `docs/` (PDFs / PBIX)

Comando: usei grep em modo binário (grep -a) para procurar e-mails, CPF e CNPJ dentro dos arquivos em `docs/`.

Resultados:

==== docs/CARTA DE AUTORIZAÇÂO.pdf ====
17:K@48G9-.BYBGNPTUT

==== docs/Profile.pdf ====
74:ale_meneses2004@hotmail.com

==== docs/Relatorio Bellacor.pdf ====
REMOVIDO: arquivo `docs/Relatorio Bellacor.pdf` foi excluído do repositório conforme solicitação.

==== docs/Projeto Dashboard.pbix ====
REMOVIDO: arquivo `docs/Projeto Dashboard.pbix` foi excluído do repositório conforme solicitação.

Observação: `docs/Profile.pdf` contém o e-mail `ale_meneses2004@hotmail.com`. Se este contato não deve permanecer público, remova/mascare o e-mail no PDF ou armazene o PDF em local seguro.

3) Inspeção da pasta de backup `backup_20251003/`

Buscas por e-mails e padrões comuns de chave/placeholder não retornaram correspondências textuais relevantes (nenhuma correspondência encontrada nas buscas automáticas feitas aqui). Ainda recomendo revisar manualmente a pasta de backup, pois pode conter binários ou arquivos com dados sensíveis não detectáveis por busca simples.

4) Varredura do histórico Git por padrões de segredos

Comando executado (resumo):
git grep -n -E 'AKIA[0-9A-Z]{16}|-----BEGIN|HG_BRASIL_API_KEY|GEMINI_API_KEY|GOOGLE_API_KEY|password|token|api_key' $(git rev-list --all)

Trecho de saída relevante (exemplos encontrados no histórico):

```
6cccb469161520a59ff519605689069b042e5f08:docs/README-old.md:90:HG_BRASIL_API_KEY=sua_chave_aqui
6cccb469161520a59ff519605689069b042e5f08:tools/local-agent/server-clean.js:20:  const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || nul
... (múltiplos commits mostrando o placeholder HG_BRASIL_API_KEY em README.md e docs/README-old.md) ...
ca81c2087b5f0ac016f8fb2feabc1a5f0ad39ecb:README.md:90:HG_BRASIL_API_KEY=sua_chave_aqui
```

Interpretação:
- Não foram encontradas chaves reais (por exemplo AWS `AKIA...`) nem blocos PEM privados no histórico.
- O que aparece repetidamente no histórico são placeholders/instruções para configurar `HG_BRASIL_API_KEY` e referências a `process.env.GEMINI_API_KEY` nos arquivos do agente local — essas últimas são referências a variáveis de ambiente (boa prática).

5) Riscos principais identificados
- PII visível/publicado: e-mail e telefone pessoal aparecem em múltiplos arquivos e no site (aparentemente intencional). Se for aceitável para o portfólio público, manter é OK; se não, remova/mascare.
- PDFs e arquivos PBIX podem conter dados sensíveis internamente (ex.: relatórios com CNPJs/CPFs). `docs/Profile.pdf` contém um e-mail que já foi detectado.
- Não há evidências de chaves ou segredos reais comitados no repositório atual; placeholders e referências a `process.env.*` predominam.

6) Ações recomendadas (prioridade)
1. Se precisa ocultar contatos não desejados: remova/mascare e-mails/telefones dos arquivos HTML/JSON e PDFs. Para PDFs, edite a fonte (arquivo de origem) e gere uma nova versão sem PII ou armazene o PDF em local privado.
2. Verifique manualmente `docs/Projeto Dashboard.pbix` e `backup_20251003/` — abra em Power BI Desktop e revise por quaisquer PII (PBIX costuma conter dados dentro do arquivo). Se houver PII, mova para repositório privado ou remova antes de comitar.
3. Se porventura existirem segredos no histórico (não detectados aqui), rotacione as credenciais afetadas e remova do histórico com `git filter-repo` ou BFG. Eu posso preparar passos/ comandos para isso.
4. Garanta `.gitignore` cobre `.env`, arquivos de chave (id_rsa), `index.json` gerado pelo agente (já aparece em `tools/local-agent/.gitignore`).

7) Artefatos gerados nesta execução
- Arquivos modificados:
  - `config/portfolio.config.js` (email removido)
  - `assets/js/core/portfolio-manager.js` (email de exemplo removido)
- Relatório: `SECURITY_SCAN_REPORT.md` (este arquivo)

8) Limitações
- Não foi possível instalar `pdftotext` no ambiente (permissões), então usei `grep -a` para extrair texto contido nos PDFs — isso funciona em muitos casos, mas pode perder textos comprimidos/embutidos em formatos complexos.
- Extração de dados de `pbix` não foi realizada (PBIX é arquivo binário complexo). Recomendo abrir no Power BI Desktop para revisão manual.

9) Próximos passos que eu posso executar para você
- Fazer varredura completa no histórico Git por mais padrões (eu já fiz uma varredura básica; posso estender para regex adicionais).
- Preparar comandos e instruções para remover secrets do histórico e rotacionar chaves (se necessário).
- Ajudar a sanitizar PDFs (se você fornecer versão editável ou autorizar substituições automatizadas) ou removê-los do repositório.

---

Se quiser, eu já aplico patches para mascarar outros contatos (por exemplo `ale_meneses2004@hotmail.com`) ou gerar um commit com as remoções; diga quais arquivos quer alterar automaticamente. Também posso anexar a saída completa do comando `git grep` em anexo se preferir.
