Projeto Forkify
===

E finalmente, depois de um ano de muito estudo, muitas anotações e resumos, finalizei meu aprendizado sobre o básico da linguagem JavaScript e de lógica de programação num geral. 

Muitos dos conhecimentos adquiridos durante o meu aprendizado estão se mostrando bastante úteis no meu cotidiano, mesmo quando não estou usando o JavaScript! 

Sobre as habilidades adquiridas com o projeto
---

Esse foi um projeto que colocou a grande maioria dos conceitos mostrados ao decorrer do curso em prática. Usamos métodos de arrays, classes, requisições http com fetch, Promises, manipulação avançada do DOM, etc. E além disso, fui introduzido um pouco mais a fundo no mundo da arquitetura de software, e eu diria que essa foi a parte principal do projeto.

Arquitetura de Software
---

Nesse projeto fiz o meu primeiro contato com o planejamento real de um projeto de pequeno / médio porte. Aprendi como que um software sai do mundo das ideias e vai para a tela do monitor. 

Separamos o desenvolvimento do projeto em três fases:

-   Planejamento
    -   User Stories: Pequenas frases que descrevem o que é de se esperar que o software faça.

    -   Features: São as funcionalidades retiradas das descrições das User Stories. Aqui já começamos a a falar em termos mais técnicos e específicos. Decidimos que bibliotecas vamos usar, quais APIs, algoritmos, etc.

    -   Flowchart: Mapeamento das ações que o usuário vai tomar com base nas User Stories e como o sistema deve reagir.

-   Arquitetura: Definimos a estrutura do nosso projeto antes de começar a escrever o código. Assim teremos um esboço e um guia do que fazer. Existem diversos tipos de arquitetura já validados no mercado, a escolhida para esse foi a MVC (Model View Controller).
    -   Model: Parte responsável por guardar dos dados da nossa aplicação. É aqui que recebemos, guardamos e enviamos qualquer tipo de dado. É aqui também que fica armazenado o Estado da nossa aplicação (os dados que o usuário vê e interage).

    -   View: Parte responsável por receber os dados do Model e mostrá-lo para o usuário. É aqui que tratamos da lógica da aplicação, ou seja, como funcionarão as interações, etc.

    -   Controller: A ligação entre o Model e a View, ambos funcionam sem saber que o outro existem, é o Controller que guarda toda a lógica interna da aplicação. Ele que manda o Model atualizar seus dados para então os enviar para a View mostrar ao usuário.
