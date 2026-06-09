# Publicar no GitHub Pages

## Antes de publicar

Confirme que estes arquivos estao na raiz do projeto:

- `index.html`
- `brasao-familia.png.png`
- `controle-familiar-app/`

O arquivo `index.html` da raiz redireciona para o app em `controle-familiar-app/index.html`.

## Publicacao pelo site do GitHub

1. Entre em https://github.com
2. Crie um repositorio novo.
3. Sugestao de nome: `controle-familiar`
4. Marque como privado ou publico. Para GitHub Pages gratuito, publico costuma ser o caminho mais simples.
5. Envie todos os arquivos da pasta `Controle financeiro Kauan`.
6. Abra o repositorio no GitHub.
7. Va em `Settings`.
8. Va em `Pages`.
9. Em `Build and deployment`, escolha:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
10. Salve.

Depois de alguns minutos, o GitHub mostra o link do site.

## Observacao importante

Nesta fase, os dados ainda ficam no navegador usando `localStorage`.

Isso significa:

- o app abre online;
- mas os dados nao sincronizam entre computador e celular ainda;
- a sincronizacao real entra na fase Firebase.
