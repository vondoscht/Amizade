# Rádio Amizade — v1.1

Site da Rádio Amizade 98.7 FM.

## Estrutura atual

- `index2.html` — entrada única; escolhe automaticamente a versão conforme a largura da tela.
- `desktop.html` — site completo para telas acima de 900 px.
- `app.html` — interface compacta para telas de 900 px ou menos.
- `assets/` — imagens e ícones usados pelas duas interfaces.

## Regra de exibição

- acima de 900 px: `desktop.html`
- 900 px ou menos: `app.html`

O projeto atual não usa manifest PWA, service worker ou os antigos pacotes de ícones PWA.
