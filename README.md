
<h1 align="center">
  <br>
  <img src="" alt="">
  <br>
  Demo Fhir App
  <br>
</h1>

<h4 align="center">Demo para aplicações de dados médicos com padrão FHIR, construído com Angular</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#FHIR">FHIR</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#projeto">Projeto</a> •
  <a href="#créditos">Créditos</a>
</p>


## Features

* Gerenciamento de Pacientes
  - Adicione pacientes e gerencie suas informações
* Interoperabilidade com FHIR
  - Compatibilidade com padronização FHIR (fhir r4)
* Mock Data
  - Dados mock para testes
* Idioma: Inglês

## Screenshots

<figure align="center">
    <img src='docs/screenshots/screen01.png' width="50%" height="50%" alt="Screen 01" />
    <figcaption>Dados Mock</figcaption>
</figure>

<figure align="center">
    <img src='docs/screenshots/screen03.png' width="50%" height="50%" alt="Screen 01" />
    <figcaption>Adicionando paciente</figcaption>
</figure>

<figure align="center">
    <img src='docs/screenshots/screen04.png' width="50%" height="50%" alt="Screen 01" />
    <figcaption>Detalhes de paciente</figcaption>
</figure>

<figure align="center">
    <img src='docs/screenshots/screen05.png' width="50%" height="50%" alt="Screen 01" />
    <figcaption>Adicionando informações médicas</figcaption>
</figure>


## FHIR

🚧 (O que é FHIR, documentação, implementações)

## Instalação

Pré-requesitos
- [Java SDK 17+](https://openjdk.org/projects/jdk/17/)
- [Maven](https://maven.apache.org/)
- [Node.js](https://nodejs.org)  

### Servidor FHIR

Neste projeto utilizamos a implementação HAPI-FHIR JPA-SERVER-STARTER:

```bash
# Clone o repositório da implementação HAPI - FHIR
$ git clone https://github.com/hapifhir/hapi-fhir-jpaserver-starter

# Vá para a pasta do servidor
$ cd hapi-fhir-jpaserver-starter

# Instale e execute (a instalação pode demorar alguns minutos)
$ mvn spring-boot:run
```

### Angular App

```bash
# Clone este repositório
$ git clone https://github.com/juhachmann/demo-fhir-app

# Vá para a pasta do repositório
$ cd demo-fhir-app

# Instale o projeto (a instalação pode demorar alguns minutos)
$ npm install --legacy-peer-deps

# Execute
$ ng serve

# Em seu navegador, acesse: http://localhost:4200
```

## Projeto

🚧 (abordagem, mapping domain data X fhir std)

## Créditos

Este projeto é construído com:

- [HAPI FHIR JPA SERVER STARTER](https://hapifhir.io/hapi-fhir/docs/server_jpa/introduction.html)
- [@types/fhir](https://www.npmjs.com/package/@types/fhir)
- [Angular]()

> Demo derivada de um projeto desenvolvido pelo GECAD/ISEP/IPP. Escolhas de stack e estratégias de implementação são oriundas da equipe do projeto. Agradecimento especial a Rafael Martins, que orientou a implementação inicial das funcionalidades adaptadas para esta demo. 

