# Rádio Amizade — v1.6

Site da Rádio Amizade 98.7 FM.

## Estrutura atual

- `index2.html` — versão desktop e entrada temporária do site; em telas de até 900 px redireciona para `app.html`.
- `app.html` — interface mobile e base do PWA.
- `manifest.webmanifest` — manifesto do PWA mobile.
- `service-worker.js` — service worker registrado somente para `app.html`.
- `icons/` — ícones de instalação do PWA.
- `assets/` — imagens e ícones usados pelas interfaces.

## Regra de exibição

- acima de 900 px: permanece no site desktop.
- 900 px ou menos: abre `app.html`.

## PWA

O PWA é anunciado e registrado somente em `app.html`. A página desktop não inclui manifesto nem registra service worker. O service worker usa escopo restrito a `app.html`, evitando interferência na versão desktop.
