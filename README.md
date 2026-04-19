# Guia Básico de Angular (Para Iniciantes)

Este guia foi criado para quem nunca teve contato com Angular e quer entender desde o básico até a criação de componentes e serviços.

---

## O que é Angular?

Angular é um framework front-end desenvolvido pelo Google para construção de aplicações web modernas, dinâmicas e escaláveis.

Ele usa **TypeScript** (uma extensão do JavaScript) e segue uma arquitetura baseada em **componentes**.

---

## Pré-requisitos

Antes de instalar o Angular, você precisa ter:

* **Node.js** (recomendado versão LTS)
* **npm** (gerenciador de pacotes, já vem com o Node)

Para verificar se já tem instalado:

```bash
node -v
npm -v
```

---

## Instalando o Angular CLI

O Angular CLI é a ferramenta oficial para criar e gerenciar projetos Angular.

Instale globalmente com:

```bash
npm install -g @angular/cli
```

Verifique a instalação:

```bash
ng version
```

---

## Criando um novo projeto

```bash
ng new meu-projeto
```

Durante a criação, ele vai perguntar:

* Se deseja usar routing → escolha conforme necessidade
* Qual formato de CSS → CSS padrão está ok para começar

Depois entre na pasta:

```bash
cd meu-projeto
```

E rode o projeto:

```bash
ng serve
```

Acesse no navegador:

```
http://localhost:4200
```

---

## Estrutura básica do projeto

```
meu-projeto/
│
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │
│   ├── assets/
│   ├── environments/
│   └── main.ts
│
├── angular.json
├── package.json
└── tsconfig.json
```

### Arquivos importantes:

* **app.module.ts** → Módulo principal da aplicação
* **app.component.ts** → Componente principal
* **main.ts** → Ponto de entrada da aplicação
* **angular.json** → Configurações do projeto

---

## O que são Componentes?

Componentes são a base do Angular. Cada parte da interface é um componente.

Um componente possui:

* HTML (template)
* CSS (estilo)
* TypeScript (lógica)

---

## Criando um componente

```bash
ng generate component nome-do-componente
```

ou

```bash
ng g c nome-do-componente
```

Isso cria:

```
nome-do-componente/
├── nome-do-componente.component.ts
├── nome-do-componente.component.html
├── nome-do-componente.component.css
└── nome-do-componente.component.spec.ts
```

---

## Usando um componente

No HTML de outro componente (componente pai) (ex: `app.component.html`):

```html
<app-nome-do-componente></app-nome-do-componente>
```

---

## Data Binding (Ligação de Dados)

Angular permite conectar dados entre o TS e o HTML.

### Interpolação

```html
<p>{{ titulo }}</p>
```

### Property Binding

```html
<img [src]="imagemUrl">
```

### Event Binding

```html
<button (click)="clicar()">Clique</button>
```

---

## O que são Services?

Services são usados para:

* Compartilhar lógica
* Fazer requisições HTTP
* Reutilizar código

---

## Criando um service

```bash
ng generate service nome-do-service
```

ou

```bash
ng g s nome-do-service
```

---

## Exemplo de Service

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeuService {

  constructor() {}

  getMensagem() {
    return 'Olá do service!';
  }
}
```

---

## Usando um Service em um componente

```ts
import { Component } from '@angular/core';
import { MeuService } from '../meu-service.service';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html'
})
export class ExemploComponent {

  mensagem: string = '';

  constructor(private meuService: MeuService) {}

  ngOnInit() {
    this.mensagem = this.meuService.getMensagem();
  }
}
```

---

## Requisições HTTP

Para consumir APIs, use o módulo HttpClient.

### Importar no módulo:

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]
})
export class AppModule {}
```

### Usar no service:

```ts
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getDados() {
  return this.http.get('https://api.exemplo.com');
}
```

---

## Conceitos importantes

* **Modules** → Organizam a aplicação
* **Components** → UI da aplicação
* **Services** → Regras de negócio e dados
* **Routing** → Navegação entre páginas
* **Dependency Injection** → Injeção de dependências (services nos componentes)

---

## Conclusão

Angular pode parecer **complexo no começo**, mas ele oferece uma base muito sólida para aplicações profissionais.


