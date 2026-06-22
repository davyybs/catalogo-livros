# Estante Virtual - Gerenciador de Leitura Pessoal

Este é um aplicativo mobile moderno, leve e prático desenvolvido com **Ionic** e **Angular** (Standalone Components) projetado para ajudar leitores a organizarem suas estantes virtuais, buscarem novas obras e acompanharem seu progresso diário de leitura.

O grande diferencial do aplicativo é a simplicidade: ele oferece uma experiência em nuvem totalmente individualizada por dispositivo, dispensando telas burocráticas de cadastro ou login tradicional.

---

## 🚀 Funcionalidades Principais

- **Busca Global de Livros:** Integração em tempo real com o catálogo do Google Books, trazendo títulos, sinopses, autores e capas.
- **Estante Individual por Dispositivo:** Separação completa de dados entre aparelhos (celular, tablet, PC) usando conexões invisíveis e seguras através do ID do usuário.
- **Gerenciamento de Progresso:** Controle de status de leitura (ex: *Quero Ler*, *Lendo*, *Lido*) e atualização dinâmica de páginas lidas em relação ao total de páginas do livro.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### Frontend & Mobile
- **Core:** Ionic Framework (v7+) & Angular (Standalone Components)
- **Lógica e Reatividade:** TypeScript & RxJS
- **Compilação Nativa:** Capacitor (Android/iOS)

### Back-End & Nuvem (BaaS)
- **Firebase Authentication (Acesso Anônimo):** Utilizado para gerar credenciais silenciosas e IDs únicos para cada dispositivo de forma transparente. Isso elimina a necessidade de formulários de e-mail/senha, mantendo a persistência dos dados associada estritamente ao aparelho do usuário.
- **Firebase Firestore:** Banco de dados NoSQL reativo na nuvem. Armazena os livros salvos e o progresso em coleções estruturadas, sincronizando alterações em tempo real através de queries filtradas por `userId`.

### APIs Externas
- **Google Books API:** API pública utilizada para alimentar o motor de busca do aplicativo através de requisições HTTP seguras, tratando metadados e codificação de caracteres de forma dinâmica.

---


## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- Node.js (versão LTS)
- Ionic CLI (`npm install -g @ionic/cli`)

### Instalação
1. Clone o repositório ou baixe os arquivos do projeto.
2. Navegue até a pasta raiz e instale as dependências:
   ```bash
   npm install
3. Após a instalação de dependências, crie os arquivos environment.ts e environment.prod.ts, e adicione a chave da API e as configurações do Firebase.
