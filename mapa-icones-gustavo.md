# Mapa de Ícones — Dr. Gustavo Pimpão (páginas regionais)

Método completo em `docs/repertorio-icones.md` do repo `calilmf/processo-criacao-lp` (branch `sistema-de-icones`). Um ícone por card, escolhido por revisão visual a 32px (contact sheet), nunca por nome. Chaves de `iconComponents` (`src/App.jsx`) prefixadas por região quando o ícone é anatômico específico; chaves genéricas (`bone`, `walking`, `clock`, `dumbbell`, `running`, `strategy`, `syringe`, `dna`, `rehab`) continuam compartilhadas entre páginas — não são exclusivas de uma região.

Regra: nenhum candidato foi aprovado sem passar pelo contact sheet a 32px. Candidatos rejeitados durante a revisão estão documentados na seção final.

## coluna

| Card | Chave em `iconComponents` | Ícone de origem | Conferido a 32px |
| --- | --- | --- | --- |
| Dor lombar que não melhora com repouso | `colunaLombarIcon` | `healthicons:back-pain-outline` | sim |
| Dor irradiando para perna ou formigamento | `colunaCiaticoIcon` | `hugeicons:body-part-leg` | sim |
| Dor no pescoço com formigamento no braço | `colunaCervicalIcon` | `healthicons:headache-outline` | sim |
| Hérnia de disco e compressão nervosa | `colunaHerniaDiscoIcon` | `healthicons:spine-outline` | sim |
| Desgaste e artrose da coluna | `colunaArtroseIcon` (= `HealthSpineIcon` já existente) | SVG customizado já em uso no repo (linha 851) | sim |
| Sobrecarga muscular / tensão paravertebral | `colunaSobrecargaIcon` | `hugeicons:back-muscle-body` | sim |
| Rigidez ao acordar ou ficar muito tempo na mesma posição | `clock` (genérico, já existente) | Phosphor `Clock` | sim |

## ombro

| Card | Chave | Ícone de origem | Conferido a 32px |
| --- | --- | --- | --- |
| Dor para levantar o braço | `ombroLevantarBracoIcon` | `healthicons:arm-outline` | sim |
| Dor para dormir de lado | `ombroDorNoturnaIcon` | `material-symbols:bed-outline` | sim |
| Lesões do manguito rotador | `ombroManguitoIcon` | `hugeicons:shoulder` | sim |
| Bursite do ombro | `ombroBursiteIcon` | `healthicons:pain-outline` | sim |
| Ombro congelado / capsulite adesiva | `ombroCongeladoIcon` | `game-icons:arm-sling` | sim |
| Instabilidade e luxação do ombro | `ombroInstabilidadeIcon` | `healthicons:traumatism-outline` | sim |
| Dor por esforço repetitivo ou overhead | `dumbbell` (genérico, já existente) | Phosphor `Barbell` | sim |

## quadril

| Card | Chave | Ícone de origem | Conferido a 32px |
| --- | --- | --- | --- |
| Dor na virilha ou lateral do quadril | `quadrilDorIcon` | `healthicons:pain-outline` | sim |
| Mancar ou alterar o jeito de andar | `quadrilMarchaIcon` | `healthicons:cane-outline` | sim |
| Desgaste articular e artrose do quadril | `quadrilArtroseIcon` | `material-symbols:femur-outline` | sim |
| Bursite trocantérica | `quadrilBursiteIcon` | `material-symbols:femur-alt-outline` | sim |
| Dor ao subir escadas ou se levantar da cadeira | `quadrilEscadasIcon` | `material-symbols:stairs-outline` | sim |
| Dor após queda ou trauma no quadril | `quadrilTraumaIcon` | `healthicons:traumatism-outline` | sim |
| Dor referida da coluna lombar | `quadrilNervoIcon` | `healthicons:nerve-outline` | sim |
| Dor por sobrecarga ou impacto no esporte | `dumbbell` (genérico, já existente) | Phosphor `Barbell` | sim |

## mão-punho

| Card | Chave | Ícone de origem | Conferido a 32px |
| --- | --- | --- | --- |
| Formigamento nos dedos | `punhoFormigamentoIcon` | `healthicons:nerve-outline` | sim |
| Síndrome do túnel do carpo | `punhoTunelCarpoIcon` | `material-symbols:back-hand-outline` | sim |
| Dedo travando ao dobrar / dedo em gatilho | `punhoDedoGatilhoIcon` | `mingcute:finger-tap-line` | sim |
| Dor após queda com a mão apoiada / fratura | `punhoTraumaIcon` | `lucide:bone-fracture` | sim |
| Tendinite de De Quervain | `punhoDeQuervainIcon` | `material-symbols:wrist-outline` | sim |
| Artrose de mãos | `punhoArtroseIcon` | `material-symbols:hand-bones-outline` | sim |
| Perda de força / dor ao segurar objetos | `punhoPreensaoIcon` | `material-symbols:front-hand-outline` | sim |

## pé-tornozelo

| Card | Chave | Ícone de origem | Conferido a 32px |
| --- | --- | --- | --- |
| Dor no calcanhar ao pisar / fascite plantar | `peFasciteIcon` | `streamline-ultimate:medical-specialty-feet` | sim |
| Tornozelo que torce com frequência / entorse | `peEntorseIcon` | `game-icons:falling` | sim |
| Dor atrás do tornozelo / tendinite de Aquiles | `peAquilesIcon` | `healthicons:orthotics-outline` | sim |
| Inchaço no tornozelo | `peInchacoIcon` | `material-symbols:foot-bones-outline` | sim |
| Dor no pé após corrida ou tempo em pé | `peSobCargaIcon` | `healthicons:foot-outline` | sim |
| Sobrecarga no esporte | `running` (genérico, já existente) | Phosphor `PersonSimpleRun` | sim |

## Correções de bugs já existentes no repo

Na implementação, uma busca por `heartPulse` revelou 2 ocorrências a mais além das 2 já mapeadas — mesma classe de bug, corrigidas junto por serem triviais e tocarem as mesmas páginas.

| Local | Antes | Depois | Conferido a 32px |
| --- | --- | --- | --- |
| `problemSigns`, App.jsx — "Dor persistente em articulações, tendões ou coluna" (LP principal) | `heartPulse` (coração/pulso cardíaco) | `dorArticularGenericaIcon` → `healthicons:pain-outline` | sim |
| `/infiltracao/`, symptoms — "Dor persistente em articulações" | `heartPulse` (coração/pulso cardíaco) | `dorArticularGenericaIcon` → `healthicons:pain-outline` | sim |
| `/infiltracao-ombro/`, symptoms — "Dor para dormir de lado" | `heartPulse` (coração/pulso cardíaco) | `ombroDorNoturnaIcon` → `material-symbols:bed-outline` | sim |
| `getProofItems()` — badge "Focos" da barra de prova social, em TODAS as páginas | `heartPulse` (coração/pulso cardíaco) | `target` (`CrosshairSimple`, já existente — "foco" é literalmente o conceito certo aqui, abstrato e não anatômico) | sim (ícone já em uso, decisão de reaproveito documentada) |

## Decisão sobre `target: CrosshairSimple`

Mantido **só** onde o conceito é de fato abstrato (indecisão sobre conduta). Removido dos 4 usos anatômicos que motivaram a revisão (síndrome do impacto no ombro, falseio/instabilidade e torções no joelho, infiltração intra-articular) — cada um recebeu ícone literal da própria página nesta entrega, quando existia página nova cobrindo o conceito; usos do `target` fora do escopo desta entrega (dentro de `/infiltracao-joelho/` e `/infiltracao-ombro/`, que não são as páginas regionais criadas agora) ficam de fora e não foram tocados.

## Candidatos rejeitados na revisão visual (documentado, não repetir o erro)

| Conceito | Candidato testado | Por que foi rejeitado |
| --- | --- | --- |
| Desgaste/artrose da coluna | `icon-park-outline:rectangular-vertebra` | A 32px lê como um livro/pasta poligonal, não como vértebra |
| Rigidez ao ficar sentado/em pé (coluna) | `healthicons:walk-supported-outline` | Lê como "andar com apoio/muleta", não bate com o conceito de rigidez postural |
| Síndrome do impacto (ombro) | `healthicons:sling-outline` | A 32px lê como um glifo de "zzz"/soneca distorcido, não como ombro |
| Instabilidade/luxação (ombro) — 1ª tentativa | `hugeicons:body-part-muscle` | É um bíceps — força muscular, não instabilidade articular |
| Dificuldade para calçar sapato / rotação de quadril | `healthicons:walk-supported-outline` | Mostra duas pessoas, uma sendo amparada — não transmite rotação de quadril |
| Tendinopatia glútea (quadril) | `hugeicons:body-part-muscle` | É um bíceps de **braço** numa página de quadril — erro de domínio anatômico, exatamente a classe de bug que este processo existe para evitar |
| Desgaste articular do tornozelo | (busca "ankle joint"/"cartilage") | Zero resultados em toda a Iconify — confirmado, sem ícone literal; conceito substituído por "sobrecarga no esporte" (`healthicons:running`, já validado no Thiago para a mesma região) |

## Nota sobre a trava estrutural

Esta arquitetura (React, dicionário `iconComponents` único) não tem pasta por arquivo como o repo do Thiago. A garantia aqui é: chave prefixada por região + grep manual antes do PR confirmando que cada chave regional só aparece dentro do objeto daquela região em `injectionLandingPages` + este mapa. Não é trava mecânica real.
