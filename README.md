# Rádio Amizade PWA

Suba **todo o conteúdo desta pasta** para a raiz do repositório GitHub Pages.

Estrutura:
- index.html
- manifest.webmanifest
- service-worker.js
- assets/
- icons/

Depois do commit, aguarde a atualização do GitHub Pages.

Android/Chrome:
- quando o navegador considerar a PWA instalável, o texto "amizade.com.br" no topo muda para "Instalar app";
- ao tocar, abre o prompt nativo de instalação.

iPhone:
- o texto "amizade.com.br" no topo muda para "Instalar app";
- ao tocar, aparece a orientação:
  Compartilhar → Adicionar à Tela de Início.

O layout principal do player foi preservado.

## Atualização do player

Esta versão restaura a mesma estratégia HLS do player original da Rádio Amizade:
hls.js primeiro e HLS nativo como fallback.

O cache da PWA foi atualizado para v2. Depois de subir os arquivos,
feche e reabra o app instalado para receber a versão nova.

## Início mais rápido no iPhone

- preconnect com o servidor de streaming;
- áudio com preload=auto;
- iPhone/iPad priorizam HLS nativo;
- Mac/Android/Desktop mantêm hls.js;
- cache da PWA atualizado para v3.

Observação: o tempo mínimo de início ainda depende da duração dos segmentos HLS
gerados pelo servidor de streaming.
