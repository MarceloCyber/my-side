Instruções para Inicializar o Projeto Next.js

Bem-vindo ao projeto Next.js! Este README fornece orientações sobre como inicializar e rodar o projeto após clonar o repositório.
Requisitos

    Node.js: v20.17.0 ou superior
    npm ou Yarn: Gerenciador de pacotes para instalar dependências

Passos para Inicializar o Projeto

    Clonar o Repositório

    Primeiro, clone o repositório para o seu ambiente local. No terminal, execute:

    sh

git clone <URL_DO_REPOSITORIO>

Substitua <URL_DO_REPOSITORIO> pela URL do repositório Git.

Navegar para o Diretório do Projeto

Após clonar o repositório, navegue para o diretório do projeto:

sh

cd nome-do-repositorio

Substitua nome-do-repositorio pelo nome do diretório clonado.

Instalar Dependências

Instale as dependências do projeto usando npm ou yarn. Se você estiver usando npm, execute:

sh

npm install

Ou, se preferir usar yarn, execute:

sh

yarn install

Configurar Variáveis de Ambiente

O projeto pode precisar de variáveis de ambiente para funcionar corretamente. Verifique se há um arquivo .env.example ou qualquer documentação sobre as variáveis necessárias e crie um arquivo .env.local na raiz do projeto com as variáveis necessárias.

Se houver um arquivo .env.example, você pode copiá-lo para .env.local e ajustar os valores conforme necessário:

sh

cp .env.example .env.local

Iniciar o Servidor de Desenvolvimento

Após instalar as dependências e configurar as variáveis de ambiente, inicie o servidor de desenvolvimento:

sh

npm run dev

Ou, se estiver usando Yarn:

sh

yarn dev

O servidor estará disponível em http://localhost:3000.

Verificar o Funcionamento

Acesse http://localhost:3000 em seu navegador para verificar se o aplicativo está funcionando conforme o esperado.
