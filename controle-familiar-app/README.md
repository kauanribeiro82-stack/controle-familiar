# Controle Familiar

Aplicativo web financeiro familiar da familia Lara Ayres Ribeiro.

O objetivo e substituir uma planilha simples por um app pessoal, elegante, responsivo e facil de usar no computador e no celular.

## Estado atual

Esta e a fase inicial do projeto:

- HTML, CSS e JavaScript puro.
- Dados salvos temporariamente no navegador com `localStorage`.
- Dados iniciais importados da planilha 2026, separados por mes.
- Splash screen com brasao da familia.
- Tela de login visual.
- Dashboard.
- Menu principal com Dashboard, Calendario, Financeiro, Movimentacoes e Planejamento.
- Menu lateral em estilo premium com atalho fixo para o Conselheiro Financeiro.
- Busca no topo integrada a Pesquisa.
- Financeiro com sub-abas Kauan, Raissa e Casal.
- Movimentacoes com sub-abas Pesquisa e Lancamentos.
- Dashboard com filtro de visao: familia inteira, Kauan, Raissa ou Casal.
- Indicador de saude financeira.
- Card principal de saldo projetado no Dashboard.
- Bloco executivo do Conselheiro Financeiro no Dashboard.
- Grafico anual de receitas, despesas e saldo.
- Tooltips interativos em graficos, cards e calendario.
- Aba Pesquisa com busca e filtros.
- Aba Planejamento com linha do tempo financeira.
- Formulario de lancamentos.
- Formulario personalizado por tipo: Receita, Despesa ou Investimento.
- Receita com categorias como Salario, Pensao, Freelancer e Renda extra.
- Despesa pergunta se foi parcelada e cria parcelas futuras automaticamente.
- Lancamentos mensais continuam nos proximos anos ate serem alterados.
- Lancamentos usam uma unica data para evitar confusao entre data e vencimento.
- Saldo atual considera somente receitas recebidas e saidas pagas/aplicadas.
- Saldo projetado considera receitas, despesas e investimentos previstos do mes.
- Card principal de Investimentos foi substituido por Resta pagar.
- Dashboard inclui Hoje, Proximos 7 dias e Resta pagar por area.
- Calendario deve diferenciar pago/recebido, pendente e atrasado por cores.
- Editar, excluir e marcar lancamentos como pago.
- Todos os lancamentos podem ser editados, inclusive mensais e recorrentes.
- Perfil ativo Kauan/Raissa com saudacao no topo.
- Perfil sera escolhido no login futuramente; seletor do topo foi removido da interface.
- Configuracoes acessiveis pela engrenagem no topo.
- Conselheiro Financeiro inicial com sugestoes automaticas baseadas nos dados do mes.
- Conselheiro Financeiro com configuracoes iniciais de tom e foco.
- Avatar de perfil com inicial da pessoa.
- Comparacao com mes anterior.
- Projecao do mes.
- Ranking de maiores gastos.
- Alertas de contas vencendo/atrasadas.
- Parcelados da planilha com quantidade de parcelas restantes.
- Gastos mensais continuam projetados para 2027, 2028 e anos seguintes com o ultimo valor conhecido.
- Tema claro/escuro.
- Estrutura inicial de PWA com `manifest` e `service worker`.

## Proximas fases

1. Melhorar filtros por mes/ano em cada aba.
2. Melhorar recorrencia mensal e parcelamento automatico.
3. Conectar Firebase Auth para login real.
4. Conectar Firestore para sincronizar entre dispositivos.
5. Publicar gratuitamente no GitHub Pages.
6. Finalizar PWA instalavel no celular.

## Documentacao

A especificacao completa do produto esta em:

[docs/ESPECIFICACAO.md](./docs/ESPECIFICACAO.md)

## Principio do app

O dinheiro da familia e conjunto. O app separa Kauan, Raissa e Casal apenas para organizacao visual, sem divisao meio a meio e sem calculo de dividas entre os usuarios.
