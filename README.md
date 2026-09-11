# 🐶 AlfaTech

> Um aplicativo de alfabetização que transforma o aprendizado em uma jornada interativa, acessível e gamificada.

## 🧠 Sobre o projeto

O **AlfaTech** é um aplicativo desenvolvido com o objetivo de auxiliar no processo de **alfabetização de jovens e adultos**, utilizando elementos de gamificação para tornar o aprendizado mais acessível, intuitivo e motivador.

O projeto é inspirado em plataformas como o **Duolingo**, utilizando uma estrutura de mundos, fases, XP e progresso do usuário. Ao mesmo tempo, busca incorporar princípios relacionados à educação de **Paulo Freire**, valorizando uma aprendizagem mais contextualizada e significativa.

O AlfaTech foi desenvolvido como um projeto acadêmico envolvendo **Desenvolvimento de Sistemas, programação e design de interfaces**.

---

## 🎯 Objetivos

* 📖 Auxiliar no processo de alfabetização.
* 🎮 Tornar o aprendizado mais interativo através da gamificação.
* 📈 Permitir que o usuário acompanhe seu progresso.
* ⭐ Utilizar XP e níveis como elementos de motivação.
* 🧩 Dividir o conteúdo em etapas progressivas.
* 💡 Criar uma experiência simples e intuitiva para o usuário.

---

## 🚀 Funcionalidades

### 👤 Sistema de perfil

O aplicativo permite a criação de um perfil diretamente no dispositivo.

O progresso é armazenado localmente, permitindo que informações como XP, nível e progresso nas atividades sejam mantidas mesmo após fechar o aplicativo.

### 🌎 Mundos de aprendizagem

O conteúdo é organizado em **5 mundos**, cada um contendo **5 atividades**.

Essa estrutura permite que o usuário avance gradualmente pelo conteúdo.

```text
Mundo 1
 ├── Fase 1
 ├── Fase 2
 ├── Fase 3
 ├── Fase 4
 └── Fase 5

Mundo 2
 ├── Fase 1
 ├── ...
```

### ⭐ Sistema de XP

As atividades fornecem experiência ao usuário, permitindo acompanhar sua evolução através de um sistema de níveis.

### 📊 Progresso

O aplicativo registra informações relacionadas ao desempenho do usuário, como:

* XP
* Nível
* Mundo atual
* Precisão nas atividades
* Tempo de realização

### 📱 Interface

A interface foi desenvolvida pensando em uma experiência simples e intuitiva, com navegação organizada entre:

* 🏠 Início
* 🔥 Progresso
* 👤 Perfil

---

## 🛠️ Tecnologias utilizadas

### Front-end

* **React Native**
* **Expo**
* **Expo Router**
* **TypeScript**
* **JavaScript**

### Armazenamento

* **AsyncStorage**

O AsyncStorage é utilizado para armazenar localmente os dados do perfil e do progresso do usuário.

### Design

* **Figma**

O protótipo e a interface do aplicativo foram planejados utilizando o Figma.

---

## 🗂️ Estrutura do projeto

Uma representação simplificada da estrutura:

```text
AlfaTech/
│
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── progresso.tsx
│   │   └── perfil.tsx
│   │
│   ├── trilha/
│   │   └── ...
│   │
│   └── ...
│
├── services/
│   └── ProfileService.ts
│
├── data/
│   └── defaultProfile.ts
│
├── assets/
│   └── ...
│
├── package.json
├── tsconfig.json
└── README.md
```

> A estrutura pode variar conforme a evolução do projeto.


## 🎨 Design

O design do AlfaTech foi desenvolvido no **Figma**, buscando criar uma interface amigável e de fácil compreensão.

A proposta visual utiliza conceitos de aplicativos educacionais e gamificação para transformar o aprendizado em uma experiência mais dinâmica.

---

## 🧩 Arquitetura

De forma simplificada, o funcionamento do aplicativo segue:

```text
              ┌──────────────┐
              │    Usuário   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ React Native │
              │     + Expo   │
              └──────┬───────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
      ┌─────────────┐  ┌─────────────┐
      │   Trilhas   │  │   Perfil    │
      │  e fases    │  │  e progresso│
      └─────────────┘  └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ AsyncStorage│
                       └─────────────┘
```

## 👨‍💻 Desenvolvimento

O AlfaTech foi desenvolvido como um projeto acadêmico de **Desenvolvimento de Sistemas**, envolvendo programação, desenvolvimento mobile, design de interfaces, armazenamento de dados e conceitos de educação e gamificação.

---

## 📜 Licença

Este projeto foi desenvolvido para fins **educacionais e acadêmicos**.

---

<div align="center">

### 📚 AlfaTech

**Aprender • Evoluir • Conquistar**

</div>




# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
