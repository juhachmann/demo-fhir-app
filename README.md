
<h1 align="center">
  <br>
  <img src="" alt="">
  <br>
  Demo Fhir App
  <br>
</h1>

<h4 align="center">Demo de aplicação na área da saúde com padronização HL7 FHIR, desenvolvida com Angular</h4>

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
  - Padronização HL7 FHIR (fhir r4)
* Mock Data
  - Dados mock para testes
* Idioma: Inglês

## Screenshots

<div align="center">
  <p>Dados Mock</p>
  <img src='docs/screenshots/screen01.png' width="50%" height="50%" alt="Screen 01" />
</div>

<div align="center">
  <p>Visualização de pacientes</p>
  <img src='docs/screenshots/screen02.png' width="50%" height="50%" alt="Screen 02" />
</div>

<div align="center">
  <p>Gerenciando detalhes de um paciente</p>
  <img src='docs/screenshots/screen05.png' width="50%" height="50%" alt="Screen 04" />
</div>

## FHIR

🚧 (... o que é FHIR, documentação, implementações)

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

🚧 (... abordagem, mapping domain data X fhir std)

## Créditos

> Demo derivada de um projeto desenvolvido pelo GECAD/ISEP/IPP. Escolhas de stack e estratégias de implementação são oriundas da equipe do projeto. Agradecimento especial a Rafael Martins, que orientou a implementação inicial das funcionalidades adaptadas para esta demo. 

Este projeto é construído com:

- [HAPI FHIR JPA Server Starter](https://hapifhir.io/hapi-fhir/docs/server_jpa/introduction.html)
- [@types/fhir](https://www.npmjs.com/package/@types/fhir)
- [Angular](https://angular.dev/)
- [PrimeNG](https://primeng.org/)
- [PrimeFlex](https://primeflex.org/)
