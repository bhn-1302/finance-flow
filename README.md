
# 💰 Finance Flow: Seu Gerenciador Financeiro com Poup.ai (Assistente Inteligente)

## 🎯 Visão Geral do Projeto

O **Finance Flow** é uma aplicação web desenvolvida para oferecer uma solução completa e intuitiva para o gerenciamento de finanças pessoais. Construído como um projeto 100% frontend, ele combina o controle financeiro diário com a inteligência artificial do **Poup.ai**, nosso assistente virtual.

O Poup.ai tem a missão de ir além de apenas registrar números, oferecendo educação financeira e conselhos personalizados baseados diretamente nas transações do usuário.

## ✨ Demo e Prova de Conceito (PoC)

Confira o Poup.ai em ação, analisando transações e respondendo a dúvidas financeiras:

| [GIF mostrando o Finance Flow e o Poup.ai em funcionamento] |
| :---: |
| <img src="./public/gifs/gif-poupai2.gif" alt="demonstração do projeto em funcionamento"> |

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Uso no Projeto |
| :--- | :--- | :--- |
| **Frontend** | [React](https://react.dev/) (Vite) | Core da aplicação e ambiente de desenvolvimento. |
| **Estado** | [Zustand](https://zustand-bear.github.io/zustand/) | Gerenciamento de estado leve e rápido (transações, UI). |
| **IA/API** | [Google Gemini API](https://ai.google.dev/) | Conexão com o modelo `gemini-2.5-flash` para o Poup.ai. |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/) | Framework utilitário para design e responsividade rápida. |
| **Animação** | [Framer Motion](https://www.framer.com/motion/) | Transições suaves e animações de entrada/saída (transações e UI). |
| **Gráficos** | [Recharts](https://recharts.org/en-US/) | Componentes declarativos para visualização de dados financeiros (Entradas vs. Saídas). |
| **Linguagem** | TypeScript | Garantia de segurança de tipo e escalabilidade. |

## 💼 Funcionalidades Detalhadas

### Seção Finance Flow (Controle)

* **Registro Completo:** Adicione transações (`income` ou `expense`) com nome, valor, tipo e categoria.
* **Visão de Saldo:** Cálculo dinâmico e em tempo real do **Saldo Atual** e **Saldo Disponível** (Entradas - Saídas).
* **Persistência de Dados:** Todos os dados de transações e histórico de chat são salvos localmente usando o middleware `persist` do Zustand.
* **Organização:** Agrupamento automático de transações por dia ("Hoje", "Ontem", ou data específica).

### Seção Poup.ai (Assistente Virtual)

* **Consultoria Financeira:** Respostas baseadas no `systemPrompt` para educação financeira, planejamento e conceitos.
* **Análise de Dados Personalizada:** O assistente recebe o JSON completo das transações do usuário, permitindo que ele:
    * Calcule o saldo para responder a perguntas como "Qual é o meu saldo atual?".
    * Identifique padrões de gastos para dar dicas personalizadas.
* **UX Otimizada:** Indicador de digitação (Typing Indicator) e rolagem automática para o final do chat.

## ⚙️ Configuração para Desenvolvimento Local

Siga estes passos para rodar o projeto em sua máquina.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 18 ou superior) instalado.

### 1. Clonagem e Instalação

```bash
# Clone o repositório
git clone [https://github.com/SEU_USUARIO/finance-flow.git](https://github.com/SEU_USUARIO/finance-flow.git)
cd finance-flow

# Instale as dependências
npm install
# ou
yarn install
```

### 2. Chave de API do Google Gemini

O assistente Poup.ai requer uma chave de API para comunicação com o Gemini.

- Crie sua chave de API no Google AI Studio.

- Crie um arquivo chamado .env na raiz do seu projeto.

- Adicione a chave neste formato:

```bash
# .env
VITE_GEMINI_API_KEY=SUA_CHAVE_GERADA_AQUI
```

### 3. Execução

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

O aplicativo estará acessível em http://localhost:5173.

## ☁️ Implantação e Segurança (Netlify)

Ao implantar este projeto frontend em um serviço como o Netlify, é CRÍTICO configurar a variável de ambiente.

1. Configuração de Variável de Ambiente no Netlify

    Para que a aplicação tenha acesso à chave durante o processo de build do Vite:

   - Acesse o painel do seu site no Netlify.
   - Vá para Site settings -> Build & deploy -> Environment.

   Adicione a variável:

   - Key: VITE_GEMINI_API_KEY

   - Value: O valor da sua chave de API (a mesma do seu arquivo .env local).

2. Aviso de Segurança (Exposição de Chave)

   AVISO: Como este é um projeto 100% frontend que utiliza o padrão VITE_, o valor da VITE_GEMINI_API_KEY será hardcoded (embutido) nos arquivos JavaScript finais durante o build, expondo sua chave no código fonte público.

   Para uso em produção, onde a chave precisa ser secreta, é estritamente recomendado o uso de Funções Serverless (Netlify Functions) para atuar como um proxy seguro entre o frontend e a API do Gemini.

## ✒️ Autor

### **Brenno Henrique do Nascimento**

**Link do perfil no LinkedIn:** [LinkedIn](https://www.linkedin.com/in/brenno-henrique-nascimento)

**Link do perfil no GitHub:** [GitHub](https://github.com/bhn-1302)

**Portfólio (em atualização):** [Portfólio](https://portfolio-front-end-omega-wheat.vercel.app/)
