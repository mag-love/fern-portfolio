# Site v3 — estado (13/nov/2026)

Primeira versão **local** do portfólio: estrutura do protótipo Gemini (filme em tela cheia, menu `REEL / WORKS / AI LAB / INFO`) com o conteúdo do kit Behance v11. **Nada publicado, nada enviado, custo zero, sem commit.**

## Como abrir

```bash
cd ~/Documents/Claude/fern-portfolio/v3 && python3 -m http.server 4173
```

Depois `http://127.0.0.1:4173/`. Também abre direto pelo arquivo (`index.html`).
Pele pela URL: `?skin=fff` ou `?skin=storm` (o botão "Pele A | B" no topo é controle de protótipo, sai antes de publicar). Projeto direto: `#work-3`.

## Feito

- `index.html`, `css/site.css`, `js/data.js` (todo o conteúdo), `js/site.js`. HTML/CSS/JS puro, sem build.
- REEL: `hero_airsilva_360_camisa` em loop mudo (provisório), com pausa.
- WORKS: 12 projetos do kit, capas reais, título `Cliente — Peça`, função/agência/prêmio; faixa com os 6 prêmios (clicáveis). Cada um abre um player com os vídeos do Vimeo/YouTube ou o projeto no Behance.
- AI LAB: One Take. New Cameras. (loop original × IA + 5 pranchas) e Air_Silva.
- INFO: About EN + ES copiado sem alteração do LinkedIn (`PERFIS-PUBLICOS.md`), e-mail, LinkedIn, Vimeo, Behance, Instagram. Sem telefone, sem retrato.
- Duas peles: A "FFF" (mono, roxo `#5408FF`) e B "Tempestade" (Knockout, grafite, amarelo `#FFD21F`).
- Conferido em 1440×900 e 390×844 nas duas peles: 12 cards, 6 prêmios, sem imagem quebrada, sem rolagem lateral, console limpo, filme do hero e do player tocando. Embed do Vimeo conferido tocando no Chrome real. Capturas: `~/YOUTUBE/site_v3_capturas/`.

## Decisões em aberto (do Fernando)

1. **Pele**: A ou B. A pele A copia de perto o marsheen.com (cor e fonte): é referência, não identidade própria.
2. **Nome na tela**: A mostra "FFF" + "Fernando Freitas · Corte Seco · AI Director"; B mostra "FERNANDO FREITAS" + "Senior Editor / Creative Director / AI Video Pipeline". Outras assinaturas levantadas: CORTE SECO, FRAME · BY · FRAME, FILM EDITOR · AI DIRECTOR, ANALOG GRAIN · AI PIPELINE.
3. **Foto**: INFO está sem retrato. Candidatas: `kit-behance-v11/perfil/avatar_800.jpg`, `out/foto_final_A_amarelo_1000.jpg` (LinkedIn), `out/foto_perfil_aprovada_1000.jpg` (Gemini). Nenhuma foto de rosto gerada por IA.
4. **Anos**: o site usa "Twenty years" (LinkedIn); o kit Behance diz "Fifteen years". Unificar.
5. **Onde publicar**: resolvido em 13/nov. Este v3 é o **site próprio** (filme em tela cheia), a publicar pelo repo `github.com/mag-love/fern-portfolio` quando ele der o OK. O Adobe Portfolio é outra entrega, com o visual de papel/glitch do kit, em outra sessão; nada dele foi criado ou mexido aqui.

## Escopo (correção do Fernando, 13/nov)

"o filme tela cheia eh site proprio, o adobe portifolio eh como tinhamos feito com o fundo de papel mexendo o glitch nas fotos". Do kit v11 este site usa só o conteúdo (12 projetos, capas, títulos, créditos, 6 prêmios). O CSS do site não tem papel, glitch nem vermelho. **Quadros limpos (13/nov, OK do Fernando):** as 12 capas e o AI LAB foram refeitos sem título embutido, sem papel e sem etiqueta vermelha, a partir de material que já estava no Mac (miniaturas do Vimeo/YouTube e quadros usados para montar o kit, vídeo do kit recortado). Nada baixado, nada gerado.
- Capas: quadro único (01, 02, 05, 06, 07, 09), mosaico de quadros (03, 04, 10, 11) e duas páginas da HQ (12).
- One Take: loop lado a lado recortado do vídeo do kit (22 s, original à esquerda, câmera nova à direita, rótulos em HTML) e 4 tiras por take no lugar das 5 pranchas.
- Capa 08 (Seu Estilo, Seu Impacto): quadro real do trailer (43 s), baixado do Vimeo dele com OK em 13/nov. Único download da tarefa; o arquivo do trailer não foi guardado no site.
- Os quadros do Air_Silva na capa 03 têm letreiros que são do próprio filme.

## Rodada de 13/nov (pedidos do Fernando depois de ver o site)

- **Pele A escolhida** ("acho q prefiro pele A"). Já era a padrão; a B continua no botão. O aviso do marsheen.com segue valendo.
- **Tela inicial = filme em play, select de destaques.** `assets/hero/hero_select.mp4` (49 s, mudo, 10 MB, 26 cortes de 20 filmes): abre no 360 da camisa do Silva e passa por Air_Silva, País do Futebol, Greenventory, AmarElo, Menino e o Mundo, Avon, Kia, Negredo, Então Toma, Lux, Riachuelo, T.R.A.P., Seu Estilo, Vivo, Honda, Don L, Xenia, Leite Moça, Brastemp e One Take. Título, crédito e botão trocam a cada filme e o botão abre aquele vídeo (`hero` em `js/data.js`). Fontes: 7 filmes baixados do Vimeo dele com OK (13/nov; o Vimeo recusou os outros 12 com erro 401) e o resto dos originais em `/Volumes/MAGNESIO/ADOBE/PORTFOLIO/`. Dropbox não foi usado. Os cortes foram escolhidos por mim em folhas de quadros: é um primeiro corte para ele ajustar. Alguns trechos têm legenda ou logo queimados (Netflix, Avon, case film).
- **Comerciais e clipes clicáveis um a um:** 11 comerciais e 4 clipes em blocos próprios abaixo da grade, cada um abre o seu vídeo.
- **HQ no site com marca d'água:** o projeto 12 abre uma prévia de 14 das 67 páginas (EN), com marca "FERNANDO FREITAS · ASSOMBRAMENTO · PREVIEW" gravada na imagem (`assets/hq/`). Li o pedido como amostra + link de compra; se ele quiser as 67, é trocar `count`. **Link da Amazon: não existe ainda** (o livro não foi publicado no KDP); o botão "Buy on Amazon" aparece sozinho quando `buy` for preenchido em `js/data.js`.
- **About reescrito (EN e ES):** craft e valor em vez de velocidade ("speed on its own is fast food"). Texto novo é meu rascunho a partir da fala dele; o LinkedIn continua com o texto antigo.
- **Behance (só conferido, nada alterado):** no ar há 2 dos 12 projetos (Music Videos, com os 4 vídeos embutidos, e ASSOMBRAMENTO, páginas sem marca). Faltam 10. Subir o resto e pôr marca nas páginas da HQ é publicação: fica para a sessão do Behance, com OK dele.
- Legendas queimadas do case film aparecem em alguns cortes do hero, atrás do título.

## Falta / avisos antes de publicar

- **Fontes Knockout** (pele B) carregam por `local()` do Mac. Para ir ao ar precisa de licença de webfont; sem ela o visitante vê o reserva (Big Shoulders Display).
- Pele A usa Space Mono no lugar do OCR-A do protótipo: o kit Typekit `lko8ghd` não foi usado porque não confirmei que é do Fernando.
- Google Fonts vem de fora: hospedar as fontes junto ao site (visitantes da UE).
- Hero: select provisório só com material local (ver rodada de 13/nov).
- **Air_Silva**: o case film toca de `assets/local-only/` (14 MB, fora do git pelo `.gitignore`). Não está no Vimeo, nem o documentário de 6:34. Subir ou trocar.
- **Emicida — Então Toma**: o dono bloqueou o embed no YouTube; abre capa + link para o YouTube.
- A conferir com o Fernando: nomes das campanhas Lux e Riachuelo, título do clipe da Xenia, intervalo dos clipes (site 2013–2026, kit 2014–2026).
- Fora do site: Poquito (pedido dele), Tasty Turbo e Perimore (sem arquivo), nota de voz do Emicida, leitor privado da HQ, nome da música inédita do One Take.
- Faixa de prêmios é só texto (o kit tem os símbolos).
- Site em inglês; só o About tem versão em espanhol.
- Tirar `<meta name="robots" content="noindex">` e o botão de pele ao publicar.
- Embeds do Vimeo não foram conferidos um a um (11 comerciais + 4 clipes): só o mapeamento de IDs e uma reprodução real.

## Select da tela inicial no Premiere (13/nov)
Job `~/Studio/261113_Fernando_Site_Select_Tela_Inicial/`: projeto `01_projeto/FERNANDO_SITE_SELECT_TELA_INICIAL.prproj`, sequência `SELECT_TELA_INICIAL_V01_montagem` com os 26 cortes e os 21 arquivos-fonte dentro do job. Quando ele exportar o corte dele: trocar `assets/hero/hero_select.mp4` e refazer os tempos de `hero` em `js/data.js`.

- **13/nov, corte do Fernando no ar local:** `hero_select.mp4` agora é o export dele (2:44, mudo, 1280×720, 26 MB) e `hero_select_mobile.mp4` (640×360, 9 MB) entra em telas até 720 px. Os 29 títulos de `hero` em `js/data.js` foram tirados da sequência dele no Premiere. O corte dele não tem o 360 do Silva nem o One Take. A sequência no Premiere tem 202 s; o export cobre 0–164 s (entrada/saída dele). Peso: 26 MB é alto para abertura de site; se publicar assim, vale encurtar ou baixar a qualidade.

- **13/nov, pedido dele: "role inteiro, com máxima qualidade" e "os de baixo em play".**
  - Tela inicial: o corte dele inteiro (2:44), mudo, em 1920×1080 com qualidade alta: `hero_select.mp4` = **234 MB**; em telas até 720 px entra `hero_select_mobile.mp4` (1280×720, 49 MB). O original dele (318 MB, com som) está em `07_exports/` do job.
  - **Antes de publicar:** 234 MB não cabe no GitHub Pages (limite de 100 MB por arquivo) e pesa em qualquer hospedagem. Saídas: hospedar o filme fora (Vimeo como fundo, ou um CDN de vídeo) ou aceitar uma versão de 1080p mais comprimida (uns 60 a 80 MB).
  - Cards e miniaturas em play: 26 prévias mudas de 6 s (640×360, 11 MB no total) em `assets/prev/`; cada uma carrega e toca só quando o card entra na tela e pausa quando sai. O card da HQ continua parado (é livro). Trechos escolhidos por posição no filme (22%, 45%, 68%), não por olho: ele pode pedir troca.
  - A conferir: o arquivo usado para "Olympikus — Libere a Brincadeira" é `Olympikus Kids - Free to play.mp4` do HD; e "YouTube Shorts — #DaUmGame" usa `Youtube Shorts.mp4` (há outros três de YouTube Shorts no HD).

- **13/nov, decisão dele: "Comprimir p/ 70 MB".** `hero_select.mp4` agora é 1080p em duas passadas, cerca de 70 MB (cabe no GitHub Pages, limite 100 MB); `hero_select_mobile.mp4` é 720p mais leve. A versão de 234 MB saiu do site; o original de 318 MB segue em `07_exports/` do job. Substitui o aviso de peso acima.

- **13/nov (tarde), AI LAB em movimento + som na abertura + corte novo.**
  - Abertura: `hero_select.mp4` agora é o export corrigido dele (`~/Desktop/SELECT_TELA_INICIAL_V01_montagem_1.mp4`, 2:43,04; cópia em `07_exports/..._V03_261113.mp4`), 1080p ~69 MB e 720p ~28 MB. Os 29 títulos foram reajustados ao corte novo.
  - Som: os exports dele saem mudos (A1 vazia na sequência). Remontei o som dos próprios filmes corte a corte a partir da sequência do Premiere (só leitura) e juntei ao vídeo; wav em `04_audio/SITE_SELECT_som_dos_filmes_V02_261113.wav`. O filme abre mudo e o botão "Sound off/on" liga. Nivelamento automático, sem mixagem: é teste.
  - Trilha de base ("tipo BadBadNotGood"): NÃO posta. O site já aceita um arquivo em `heroMusic` (`js/data.js`). Falta ele escolher a fonte: faixa dele, banco licenciado ou geração (custo, pede OK). Gravação do BBNG não pode ir ao ar sem licença.
  - AI LAB Vitória: troca de luz no plano aberto em destaque (antes × depois), coluna de rosas e variação de planos menores embaixo. "Rosa crescendo" = `06_ia/coluna_borboletas/depois · Seedance 2.5 com ref de imagem.mp4` (suposição minha, confirmar).
  - AI LAB Air_Silva: 360 da foto da bicicleta em destaque + 4 animações que ele baixou em 13/nov (`~/Downloads`). Ficou de fora a de 2 s com a silhueta amarela em fundo preto. Os 4 stills antigos (`airsilva_1..4.jpg`) ficaram sem uso na pasta.
  - Conferido nas duas peles, desktop e celular: 8 loops do AI LAB tocando, console limpo, sem rolagem lateral. O som não foi ouvido por mim no navegador, só medido no arquivo.
  - **Trilha de base por IA (13/nov, pedido dele: "meio Skrillex Rick Ross"):** 1 geração no Stable Audio 2.5 pelo Replicate, US$ 0,20, lançada em `~/FernandoOS/custos.csv`. Original em `04_audio/SITE_SELECT_trilha_base_IA_stable-audio-2.5_V01_261113.mp3` do job; no site é `assets/hero/hero_music.mp3` (2:43, 3 MB), ligada em `heroMusic` e tocando junto com o som dos filmes quando o visitante aperta "Sound on" (filme a 70%, trilha a 55%). Prompt sem nome de artista: trap + dubstep, 140 BPM, 808 distorcido, metais. Eu não escuto áudio: o julgamento da faixa e da mistura é dele. Alternativa mais cara se não servir: ElevenLabs Music, cerca de US$ 1,36 por faixa de 2:43 (pede OK). Conferir a licença de uso comercial do Stable Audio antes de publicar.

## 13/nov, fim da tarde — sons abertos no Premiere para o Fernando mixar
- Pedido: separar voz e batida do som dos filmes para mixar com o beat, ou usar só o som original; abrir no Premiere.
- Demucs local (htdemucs, R$ 0) sobre `SITE_SELECT_som_dos_filmes_V02`: `04_audio/SITE_SELECT_filmes_SO_VOZ_V01_261113.wav`, `…filmes_SO_BATIDA_V01_261113.wav`; beat em wav: `SITE_SELECT_beat_IA_V01_261113.wav`.
- Na sequência `SELECT_TELA_INICIAL_V01_montagem` (projeto DAGOMA V09 historias): criadas A2 e A3; A1 = voz, A2 = batida/efeitos dos filmes, A3 = beat IA, tudo em 0s. Bin `SITE_SELECT_audio`. Nenhum clipe de vídeo tocado. Projeto NÃO salvo por mim.
- Próximo passo: ele mixa e exporta; eu troco `hero_select*.mp4` pelo novo export (com o som dele) e esvazio `heroMusic` em `js/data.js` se o beat já vier mixado.

## 13/nov, noite — pele A com três cores e filme sem pausa
- Pedido: "não quero só azul, quero amarelo e vermelho também mudando as cores; o vídeo deve ficar em loop, nunca parar".
- `css/site.css`: `html[data-skin="fff"][data-tone="1|2"]` trocam `--accent`/`--on-accent` (azul #5408FF, amarelo #FFD21F com texto escuro, vermelho #FF2A1C); INFO usa `--accent`; invertidos usam `--on-accent`. Corte seco (a transição com @property travava).
- `js/site.js`: `root.dataset.tone = índice do trecho % 3` a cada filme da abertura; `keepHero()` religa o filme se o navegador pausar; abrir um filme no player só deixa a abertura muda, não pausa. Botão Pause escondido (`hidden`).
- Mantido: quem tem "reduzir movimento" ligado no sistema vê o filme parado. Cache `?v=1113e`.
