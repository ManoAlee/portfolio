# Agente local (portfolio)

Este é um agente local simples que indexa arquivos do repositório e permite consultas locais sem rede.

Como usar

1. Abra o terminal na pasta `tools/local-agent`.
2. (Opcional) se quiser, instale dependências — este agente não precisa de dependências externas.
3. Gerar index dos arquivos:

```powershell
node agent.js --index
```

4. Iniciar REPL para consultas:

```powershell
node agent.js --repl
```

5. Consultar diretamente:

```powershell
node agent.js --query "tema"
```

Segurança

Não comite segredos. Para armazenar chaves locais, use `.env` (este repositório ignora `.env`).

Chat local (integração com o site)

1. Gere o índice (se ainda não) `node agent.js --index`
2. Inicie o servidor local (será criado em http://localhost:4545):

```powershell
node server.js
```

3. Abra o site (ex: index.html) e clique no ícone de chat no canto inferior direito. O widget enviará consultas para `http://localhost:4545/api/query` e exibirá as respostas sintetizadas a partir do índice e do `src/data/profile.json`.

Observações:
- O servidor é propositalmente simples e roda sem dependências externas.
- O chat funciona melhor quando o site é aberto localmente (ou quando CORS permitir chamadas para http://localhost:4545).

