# 🔄 Sistema de Sincronização LinkedIn → Portfólio

## 📋 Como Usar (Método Simples)

### **Opção 1: Script Automatizado (Recomendado)**

```bash
# Execute o script principal
./sync_portfolio.sh
```

Escolha a opção **1** para atualização manual e siga as instruções.

### **Opção 2: Passo a Passo Manual**

#### 1️⃣ **Atualizar Informações**
```bash
python3 linkedin_sync.py
```

#### 2️⃣ **Aplicar ao Site**
```bash  
python3 apply_updates.py
```

#### 3️⃣ **Subir para GitHub**
```bash
git add .
git commit -m "update: Sync LinkedIn"
git push origin main
```

---

## 🎯 **O Que Você Pode Atualizar Facilmente**

### ✅ **Informações Básicas**
- Cargo atual
- Empresa atual  
- Localização
- Bio/Descrição

### ✅ **Experiências**
- Nova experiência profissional
- Atualizar cargo atual
- Adicionar descrições
- Skills por experiência

### ✅ **Certificações**
- Adicionar novas certificações
- Atualizar status
- Organizar por data

### ✅ **Projetos**
- Novos projetos
- Status de desenvolvimento
- Tecnologias utilizadas

---

## 📊 **Arquivos de Dados**

### `data/profile.json`
Contém todas as informações do seu perfil em formato estruturado.

**Exemplo de atualização rápida:**
```json
{
  "basic_info": {
    "title": "SEU_NOVO_CARGO",
    "company": "SUA_NOVA_EMPRESA"
  }
}
```

---

## 🚀 **Fluxo Recomendado**

### **Quando Atualizar o LinkedIn:**

1. **Execute**: `./sync_portfolio.sh`
2. **Escolha**: Opção 1 (Atualização Manual)
3. **Informe**: Novos dados quando solicitado
4. **Confirme**: Aplicação automática
5. **Aprove**: Upload para GitHub

### **Resultado:**
- ✅ Site atualizado automaticamente
- ✅ Dados sincronizados
- ✅ GitHub atualizado
- ✅ Site online em poucos segundos

---

## 💡 **Dicas Importantes**

### **Frequência Recomendada:**
- 🔄 **Sempre** que atualizar LinkedIn
- 📅 **Mensal** para revisão geral
- 🎯 **Imediato** para novas oportunidades

### **Backup Automático:**
- Todos os dados ficam em `data/profile.json`
- Histórico no Git
- Fácil restauração

### **Modo Dinâmico:**
- Site carrega dados do JSON automaticamente
- Atualizações aparecem em tempo real
- Cache inteligente para performance

---

## 🛠️ **Troubleshooting**

### **Erro: Python não encontrado**
```bash
# Ubuntu/Debian
sudo apt install python3

# CentOS/RedHat  
sudo yum install python3
```

### **Erro: Permissão negada**
```bash
chmod +x sync_portfolio.sh
```

### **Erro: Git não configurado**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 📞 **Suporte**

Se encontrar problemas:

1. **Verifique** se os arquivos existem
2. **Execute** `python3 --version` 
3. **Teste** `git status`
4. **Consulte** os logs de erro

**Em caso de dúvidas, todos os arquivos são seguros para edição manual.**