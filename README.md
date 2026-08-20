# Rádio Amizade — v1.3

Estrutura atual:

- `index2.html` — site desktop direto, sem iframe. Em telas de até 900 px redireciona imediatamente para `app.html`.
- `app.html` — interface compacta para intermediário/mobile.
- `assets/` — imagens e ícones usados pelas interfaces.

O iframe foi removido para preservar interação nativa do mouse, hover e cursor no desktop.
