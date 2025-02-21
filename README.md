# Guia de Instalação e Execução do Projeto

## **1. Requisitos**
Antes de iniciar a instalação, certifique-se de ter os seguintes requisitos atendidos:

- **Node.js** (versão 14 ou superior) instalado em sua máquina
- **Git** instalado
- Conta no **Firebase** com Firestore habilitado
- Conta na **Vercel** (caso queira fazer o deploy)

## **2. Clonando o Repositório**
Primeiro, clone este repositório para sua máquina local usando o seguinte comando:

```sh
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
```

## **3. Configurando o Firebase**

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto e ative o **Firestore Database**
3. Copie as credenciais do Firebase para o arquivo `firebaseConfig.js`

O arquivo `firebaseConfig.js` deve conter algo como:
```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

export default firebaseConfig;
```

4. **Ajuste as regras do Firestore**
   Vá até Firestore Database > Regras e configure temporariamente para testes:
```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /atividades/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## **4. Instalando as Dependências**

No diretório do projeto, execute:
```sh
    npm install
```
Isso instalará todas as dependências do projeto.

## **5. Rodando o Projeto Localmente**
Para iniciar o projeto em ambiente local, use:
```sh
    npm start
```
O projeto estará disponível em `http://localhost:3000/`.

## **6. Deploy na Vercel**
Se desejar hospedar o projeto na Vercel:

1. Instale o Vercel CLI (caso ainda não tenha instalado):
```sh
    npm install -g vercel
```
2. Faça login na Vercel:
```sh
    vercel login
```
3. Execute o deploy:
```sh
    vercel --prod
```
Isso gerará uma URL onde o projeto estará hospedado.

