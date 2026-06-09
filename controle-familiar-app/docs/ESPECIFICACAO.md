# Controle Familiar - Especificacao Completa

## Visao Geral

Criar um aplicativo web financeiro familiar chamado **Controle Familiar**, com identidade visual baseada no brasao da familia Lara Ayres Ribeiro.

O objetivo do sistema e substituir uma planilha simples de controle financeiro por uma aplicacao web profissional, pessoal, elegante, responsiva e facil de utilizar tanto no computador quanto no celular.

O sistema deve ser desenvolvido com foco em:

- Simplicidade
- Uso real no dia a dia
- Baixa manutencao
- Organizacao financeira familiar
- Custo zero
- Hospedagem gratuita
- Sincronizacao entre dispositivos

O projeto deve evitar complexidade desnecessaria e nao deve funcionar como um sistema bancario ou de conciliacao de contas.

## Conceito Financeiro

### Estrutura familiar

Usuarios principais:

- Kauan
- Raissa

O dinheiro da familia e considerado conjunto.

Nao existe:

- divisao meio a meio
- calculo de divida entre o casal
- compensacao financeira entre usuarios

A separacao serve apenas para fins visuais e organizacionais.

Areas existentes:

### Kauan

Exemplos:

- Salario
- Futebol
- Gastos pessoais

### Raissa

Exemplos:

- Pensao
- Receitas proprias
- Gastos pessoais

### Casal

Exemplos:

- Mercado
- Carro
- Moradia
- Contas da casa
- Gastos da Jade
- Gastos do novo bebe

## Tecnologias

### Front-end

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)

### Banco de dados

- Firebase Firestore

### Autenticacao

- Firebase Auth
- Metodo: email e senha

### Hospedagem

- GitHub Pages

### Aplicacao instalavel

- PWA (Progressive Web App)
- Manifest
- Service Worker
- Instalacao em Android
- Instalacao em desktop

## Identidade Visual

### Nome

Controle Familiar

### Assinatura

Lara Ayres Ribeiro

### Brasao

O brasao da familia e o elemento principal da identidade visual.

Utilizacoes:

- Splash screen
- Tela de login
- Menu lateral
- Icone do aplicativo
- PWA
- Favicon

### Estilo visual

Caracteristicas:

- Elegante
- Profissional
- Familiar
- Moderno
- Limpo

Evitar aparencia generica de sistema corporativo.

### Paleta

Inspirada no brasao:

- Vermelho
- Dourado
- Preto
- Branco

### Temas

- Tema claro
- Tema escuro
- Botao para alternancia
- Salvar preferencia do usuario

## Estrutura de Telas

### 1. Login

Elementos:

- Brasao
- Nome Controle Familiar
- Subtitulo Lara Ayres Ribeiro
- Campo email
- Campo senha
- Botao entrar

Apos implementacao:

- Firebase Auth

### 2. Dashboard

Resumo geral da familia.

Cards:

- Receitas
- Despesas
- Investimentos
- Saldo

Filtros:

- Mes
- Ano

Graficos:

- Gastos por area: Kauan, Raissa e Casal

Proximos vencimentos:

- descricao
- valor
- data

Alertas:

- contas atrasadas
- contas vencendo

### 3. Area Kauan

Resumo:

- receitas
- despesas
- investimentos
- saldo

Lista de lancamentos.

Filtros.

### 4. Area Raissa

Resumo:

- receitas
- despesas
- investimentos
- saldo

Lista de lancamentos.

Filtros.

### 5. Area Casal

Resumo:

- receitas
- despesas
- investimentos
- saldo

Lista de lancamentos.

Filtros.

### 6. Calendario Financeiro

Visual mensal.

Recursos:

- mes anterior
- proximo mes

Mostrar:

- quantidade de lancamentos
- gastos por dia
- receitas por dia

Ao clicar:

- Exibir detalhes completos

Considerar:

- data do lancamento
- data de vencimento

### 7. Lancamentos

Lista completa.

Recursos:

- pesquisa
- filtros
- ordenacao

## Formulario de Lancamento

### Dono

- Kauan
- Raissa
- Casal

### Tipo

- Receita
- Despesa
- Investimento

### Descricao

Texto livre.

### Categoria

Selecionavel.

### Valor

Sempre positivo.

### Data

Data da movimentacao.

### Data de vencimento

Opcional.

### Status

- Pendente
- Pago
- Atrasado

### Recorrencia

- Unico
- Mensal
- Parcelado

### Parcelas restantes

Quando parcelado.

### Quem pagou

Campo apenas informativo.

Nao deve gerar compensacao financeira.

## Categorias Iniciais

- Moradia
- Transporte
- Alimentacao
- Saude
- Lazer
- Educacao
- Familia
- Jade
- Investimentos
- Receitas
- Outros

Permitir criar novas categorias.

## Funcionalidades Essenciais

### Editar lancamento

Editar qualquer registro.

### Excluir lancamento

Com confirmacao.

### Marcar como pago

Atualizacao rapida.

### Busca global

Pesquisar:

- descricao
- categoria

### Contas a vencer

Filtros:

- Hoje
- 7 dias
- 30 dias

### Contas atrasadas

Tela especifica.

Mostrar:

- dias em atraso
- valor
- descricao

### Recorrencia automatica

Mensal.

Exemplo: internet todo dia 10.

Gerar proximos lancamentos automaticamente.

### Parcelamento automatico

Exemplo: 12 parcelas.

Sistema cria automaticamente todas as parcelas.

## Planejamento Financeiro

### Fluxo de caixa futuro

Calcular:

Saldo atual + receitas futuras - despesas futuras = saldo projetado.

### Linha do Tempo Financeira

Exibir proximos eventos financeiros em ordem cronologica.

Exemplos:

- salario
- pensao
- financiamento
- internet
- IPVA
- aniversario
- material escolar

### Planejamento Familiar

Area para compromissos futuros.

Exemplos:

- Enxoval
- Material escolar
- IPVA
- Aniversario da Jade
- Seguro
- Viagem

Campos:

- nome
- data prevista
- valor estimado
- observacoes

## Metas Financeiras

Criar metas.

Exemplos:

- Reserva de emergencia
- Viagem
- Casa
- Novo carro

Campos:

- Nome
- Valor alvo
- Valor atual
- Percentual concluido

Barra visual de progresso.

## Investimentos

Area propria.

Cadastrar:

- ativo
- quantidade
- valor investido

Exemplos:

- MXRF11
- IVVB11

Mostrar:

- aportes
- patrimonio investido
- evolucao

Sem integracao com corretoras.

## Orcamento por Categoria

Definir limite mensal.

Exemplo:

- Alimentacao
- Limite: R$ 800
- Atual: R$ 630
- Utilizado: 78%

Ao exceder:

- Exibir alerta visual

## Relatorios

### Fechamento mensal

Exibir:

- receitas
- despesas
- investimentos
- saldo

Salvar historico.

### Relatorio anual

Grafico dos ultimos 12 meses.

### Ranking de categorias

Mostrar maiores gastos.

## Backup

Exportar:

- JSON
- Excel

Importar posteriormente.

## Notificacoes

Alertas internos para:

- contas vencendo
- contas atrasadas
- metas concluidas

## Regras Importantes

O sistema **nao deve**:

- controlar contas bancarias
- controlar PIX
- controlar cartao de credito por banco
- controlar saldo de contas correntes
- funcionar como internet banking
- calcular dividas entre Kauan e Raissa

O foco deve ser:

- organizacao financeira familiar
- planejamento
- metas
- investimentos
- relatorios
- simplicidade operacional

## Arquitetura de Crescimento

### Fase 1

- LocalStorage
- Prototipo funcional

### Fase 2

- Firebase Auth
- Firestore
- Sincronizacao

### Fase 3

- Publicacao GitHub Pages

### Fase 4

- PWA completo instalavel

## Objetivo Final

Criar um aplicativo financeiro familiar elegante, simples, rapido, gratuito e confiavel, que substitua definitivamente a planilha financeira da familia Lara Ayres Ribeiro e seja utilizado diariamente por Kauan e Raissa em qualquer dispositivo.
