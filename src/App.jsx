import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUp,
  Bandaids,
  Barbell,
  Bone,
  Broadcast,
  Buildings,
  CaretDown,
  CaretUp,
  CheckCircle,
  ClipboardText,
  Clock,
  CreditCard,
  CrosshairSimple,
  Drop,
  Dna,
  Exam,
  FireSimple,
  FirstAidKit,
  Footprints,
  GraduationCap,
  HandHeart,
  HandPalm,
  Hospital,
  IdentificationBadge,
  List,
  ListChecks,
  MapPinArea,
  MapTrifold,
  Needle,
  PersonArmsSpread,
  PersonSimpleRun,
  PersonSimpleWalk,
  Pulse,
  SealCheck,
  ShieldCheck,
  ShootingStar,
  SneakerMove,
  Stairs,
  Stethoscope,
  Strategy,
  Syringe,
  ThermometerHot,
  Warning,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'
import './App.css'
import { posts } from './data/posts'

const doctor = {
  name: 'Dr. Gustavo Lima Almeida Pimpão',
  shortName: 'Dr. Gustavo Pimpão',
  crm: 'CRM/DF 22173',
  rqe: 'RQE 18534',
  specialty: 'Ortopedista e Traumatologista',
  phone: '5561991236212',
  visiblePhone: '(61) 99123-6212',
  city: 'Brasília',
  state: 'DF',
  hours: 'Segunda a sexta, das 08h às 18h',
}

const locations = [
  {
    name: 'IOB Instituto Ortopédico de Brasília',
    region: 'Águas Claras',
    address: 'Av. das Araucárias, 785 - Águas Claras, Brasília - DF, 71936-250',
    note: 'Atendimento em Águas Claras para quem busca cuidado ortopédico próximo.',
    images: [
      './img/clinica-iob-6312.webp',
      './img/clinica-iob-6326.webp',
      './img/clinica-iob-6335.webp',
      './img/clinica-iob-6315.webp',
    ],
    icon: 'hospital',
    mapQuery: 'IOB Instituto Ortopédico de Brasília, Av. das Araucárias, 785, Águas Claras, Brasília - DF, 71936-250',
  },
  {
    name: 'Unique Ortopedia',
    region: 'Asa Sul',
    address: 'SGAS II 610, Centro Médico Lúcio Costa, Sala 07 - Asa Sul, Brasília - DF, 70200-700',
    note: 'Atendimento em centro médico de fácil acesso na Asa Sul.',
    images: [
      './img/clinica-unique-1209.webp',
      './img/clinica-unique-1198.webp',
      './img/clinica-unique-1211.webp',
      './img/clinica-unique-1207-recepcao.webp',
    ],
    icon: 'building',
    mapQuery: 'Unique Ortopedia e Fisioterapia, SGAS II 610, Centro Médico Lúcio Costa, Sala 07, Asa Sul, Brasília - DF, 70200-700',
  },
  {
    name: 'JK Ortopedia',
    region: 'Taguatinga Norte',
    address: 'QNL 30, Conjunto A, Lotes 2, 4 e 6, Loja 3 - Taguatinga Norte, Brasília - DF, 72162-301',
    note: 'Unidade próxima ao Shopping JK.',
    images: [
      './img/clinica-jk-6362.webp',
      './img/clinica-jk-6358.webp',
      './img/clinica-jk-6376.webp',
      './img/clinica-jk-6363.webp',
      './img/clinica-jk-6361.webp',
    ],
    icon: 'mapPinned',
    mapQuery: 'JK Ortopedia e Clínica da Dor, QNL 30, Conjunto A, Lotes 2, 4 e 6, Loja 3, Taguatinga Norte, Brasília - DF, 72162-301',
  },
]

const procedures = [
  {
    title: 'Infiltrações articulares',
    text: 'Ombro, quadril, tornozelo, cotovelo, punho e outras articulações, conforme indicação médica.',
    icon: 'syringe',
  },
  {
    title: 'Bloqueios para dor',
    text: 'Bloqueios periféricos, geniculares, supraescapular, facetário, sacroilíaco e seletivo de raiz nervosa.',
    icon: 'target',
  },
  {
    title: 'Procedimentos para coluna',
    text: 'Avaliação para infiltrações epidurais, bloqueios transforaminais, interlaminares e facetários.',
    icon: 'spine',
  },
  {
    title: 'Radiofrequência',
    text: 'Ramos mediais, região cervical, lombar, sacroilíaca e nervos geniculares, quando há indicação.',
    icon: 'radio',
  },
  {
    title: 'Ortobiológicos',
    text: 'PRP, plasma rico em plaquetas, aspirado de medula óssea, concentrado celular e proloterapia.',
    icon: 'dna',
  },
  {
    title: 'Medicina esportiva e lesões ortopédicas',
    text: 'Avaliação de lesões, sobrecargas, tendinopatias e queixas ligadas ao retorno às atividades.',
    icon: 'bandage',
  },
]

const problemSigns = [
  {
    text: 'Dor articular ao subir ou descer escadas',
    icon: 'stairs',
  },
  {
    text: 'Limitação para caminhar, treinar ou trabalhar',
    icon: 'walking',
  },
  {
    text: 'Dor persistente em articulações, tendões ou coluna',
    icon: 'dorArticularGenericaIcon',
  },
  {
    text: 'Inchaço, estalos ou sensação de instabilidade',
    icon: 'alert',
  },
  {
    text: 'Dúvida entre tratamento conservador, procedimento ou cirurgia',
    icon: 'strategy',
  },
]

const approach = [
  {
    step: '01',
    title: 'Avaliação médica individual',
    text: 'A consulta organiza histórico, exame físico, exames e objetivos reais antes de definir conduta.',
  },
  {
    step: '02',
    title: 'Plano por etapas',
    text: 'O cuidado pode combinar orientações, medicação, reabilitação, infiltrações, bloqueios ou cirurgia, conforme o caso.',
  },
  {
    step: '03',
    title: 'Procedimentos com critério',
    text: 'Infiltrações, radiofrequência e terapias regenerativas só entram quando há indicação clínica e expectativa realista.',
  },
  {
    step: '04',
    title: 'Acompanhamento claro',
    text: 'Você entende os próximos passos, sinais de atenção e como seguir com segurança após a avaliação.',
  },
]

const differentials = [
  {
    title: 'Registro médico e especialidade',
    text: `${doctor.crm} • ${doctor.rqe}, para você confirmar a identificação profissional do especialista.`,
    icon: 'idBadge',
  },
  {
    title: 'Formação completa',
    text: 'Graduação em Medicina, residência em Ortopedia e Traumatologia, membro da SBOT e especialização complementar em esporte e intervenção da dor.',
    icon: 'graduation',
  },
  {
    title: 'Três regiões de atendimento',
    text: 'Águas Claras, Asa Sul e Taguatinga, facilitando o acesso de diferentes regiões do DF.',
    icon: 'map',
  },
  {
    title: 'Procedimentos quando indicados',
    text: 'Avaliação para infiltrações, bloqueios, radiofrequência e ortobiológicos, quando indicados.',
    icon: 'needle',
  },
  {
    title: 'Convênios e particular',
    text: 'Atendimento com confirmação de cobertura por unidade e plano antes do agendamento.',
    icon: 'creditCard',
  },
  {
    title: 'Conduta clara para o próximo passo',
    text: 'Explicação sobre possibilidades e caminhos de cuidado, com conduta definida conforme a avaliação.',
    icon: 'strategy',
  },
]

const convenioHighlights = [
  'AFEB BRASAL',
  'AFFEGO',
  'ANAFE SAÚDE',
  'ASSEFAZ',
  'ASTE / ASETE',
  'BACEN',
  'BRADESCO',
  'CAEME',
  'CAESAN',
  'CAMED',
  'CARE PLUS',
  'CASEC',
  'CASEMBRAPA',
  'CASSI',
  'CNTI',
  'CONAB',
  'EMBRATEL',
  'FAPES',
  'FASCAL',
  'GDF SAÚDE – INAS',
  'GEAP',
  'GRAVIA',
  'LIFE EMPRESARIAL',
  'LUMINAR SAÚDE',
  'NOTRE DAME',
  'OMINT',
  'PF SAÚDE',
  'PLAN ASSISTE',
  'PLAS/JMU',
  'PMDF',
  'PRÓ-SAÚDE – CÂM. DOS DEPUTADOS',
  'PRÓ-SAÚDE – TJDFT',
  'PRÓ-SER',
  'PRÓ-SER – STJ',
  'PRÓ-SOCIAL',
  'PROASA',
  'REAL GRANDEZA',
  'SAÚDE CAIXA',
  'SAÚDE PETROBRAS',
  'SERPRO',
  'SIS SENADO',
  'STF-MED',
  'TRE',
  'TRT',
  'UNAFISCO',
]

const faqs = [
  {
    q: 'Em quais casos devo procurar um ortopedista?',
    a: 'Procure avaliação quando a dor limita movimento, trabalho, treino ou sono; quando há inchaço, trauma, perda de força, instabilidade ou quando a dor persiste apesar de cuidados iniciais.',
  },
  {
    q: 'Quais queixas ortopédicas o Dr. Gustavo atende?',
    a: 'O atendimento contempla dores articulares, limitações de movimento, lesões, queixas relacionadas à prática esportiva e procedimentos para dor, sempre após avaliação individual.',
  },
  {
    q: 'Infiltração substitui cirurgia?',
    a: 'Não necessariamente. A infiltração pode fazer parte do plano em alguns casos, mas a indicação depende de diagnóstico, exames, histórico, objetivos e resposta a tratamentos anteriores.',
  },
  {
    q: 'O que fazer quando a dor não melhora com remédios ou fisioterapia?',
    a: 'Quando a dor persiste ou volta com frequência, é importante investigar a causa com avaliação clínica e exames. A partir disso, o médico pode orientar reabilitação, ajustes de atividade, infiltrações, bloqueios, radiofrequência ou outras opções quando houver indicação.',
  },
  {
    q: 'Atende convênios?',
    a: 'Há atendimento por convênios selecionados e particular. A cobertura pode variar conforme unidade, plano e procedimento; por isso a equipe confirma antes do agendamento.',
  },
  {
    q: 'Posso agendar em qual unidade?',
    a: 'O atendimento pode ocorrer em Águas Claras, Asa Sul ou Taguatinga Norte, conforme agenda, convênio e necessidade do caso.',
  },
]

const injectionLandingPages = {
  '/infiltracao/': {
    slug: 'infiltracao',
    title: 'Infiltração para Dor em Brasília',
    metaTitle: 'Infiltração para Dor em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com Dr. Gustavo Pimpão para entender se infiltração pode ser indicada para dores, articulações, tendões, bursites e perda de mobilidade.',
    eyebrow: 'Infiltração ortopédica',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista com foco em procedimentos para alívio da dor. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofFormationText: 'Especialização em intervenção da dor',
    video: {
      title: 'Veja como funciona a infiltração guiada por ultrassom',
      description: 'Assista ao procedimento sendo realizado em ambiente clínico e veja como a técnica é aplicada com segurança e precisão, sempre após avaliação individual do paciente.',
      src: './videos/infiltracao-geral.mp4',
    },
    symptomsTitle: 'Quando a dor começa a limitar movimento, trabalho ou rotina',
    symptomsIntro: 'A infiltração pode ser considerada quando existe uma indicação clínica clara e a dor interfere na função do dia a dia.',
    symptoms: [
      { text: 'Dor persistente em articulações', icon: 'dorArticularGenericaIcon' },
      { text: 'Inflamação em tendões ou bursas', icon: 'fire' },
      { text: 'Dor que dificulta fisioterapia ou reabilitação', icon: 'rehab' },
      { text: 'Limitação para caminhar, treinar ou trabalhar', icon: 'walking' },
      { text: 'Dúvida sobre o próximo passo do tratamento', icon: 'strategy' },
    ],
    indicationTitle: 'Um procedimento feito com indicação, objetivo e acompanhamento',
    indicationText: 'A infiltração consiste na aplicação de uma medicação ou substância em uma articulação, tendão, bursa ou região relacionada à dor. A escolha do tipo de infiltração depende do diagnóstico e da estrutura envolvida.',
    contextsTitle: 'A infiltração pode ser avaliada em diferentes regiões do corpo',
    contexts: [
      { title: 'Ombro', text: 'Dor, bursite, tendinopatias, impacto ou rigidez em avaliação.', icon: 'personArms' },
      { title: 'Joelho', text: 'Dor, inchaço, rigidez, desgaste articular ou limitação funcional.', icon: 'stairs' },
      { title: 'Quadril, tornozelo e pé', text: 'Queixas articulares ou periarticulares que precisam de diagnóstico.', icon: 'bone' },
      { title: 'Cotovelo, punho e mão', text: 'Dor em articulações, tendões e estruturas próximas.', icon: 'hand' },
      { title: 'Coluna e regiões relacionadas à dor', text: 'Casos selecionados em que procedimentos podem ser discutidos.', icon: 'spine' },
    ],
    typesTitle: 'Nem toda infiltração é igual',
    types: [
      { title: 'Corticosteroide', text: 'Pode ser considerado quando há componente inflamatório e indicação clínica.', icon: 'syringe' },
      { title: 'Ácido hialurônico', text: 'Pode ser avaliado em situações específicas, principalmente em contexto articular.', icon: 'drop' },
      { title: 'Ortobiológicos', text: 'PRP e outras opções podem ser discutidos quando há indicação individual.', icon: 'dna' },
    ],
    stepsTitle: 'Da dor ao plano de cuidado',
    steps: [
      'Avaliação da queixa, histórico e limitações',
      'Exame físico e revisão de exames disponíveis',
      'Definição se há indicação de infiltração',
      'Procedimento quando indicado',
      'Orientações de acompanhamento e próximos passos',
    ],
    faqTitle: 'Perguntas frequentes sobre infiltração',
    faqs: [
      { q: 'Infiltração serve para qualquer dor?', a: 'Não. A indicação depende do diagnóstico, da estrutura envolvida, dos exames e do objetivo do tratamento.' },
      { q: 'A infiltração substitui cirurgia?', a: 'Em alguns casos pode fazer parte do tratamento conservador, mas não substitui cirurgia quando há indicação cirúrgica clara.' },
      { q: 'Dói para fazer infiltração?', a: 'O desconforto varia conforme a região e o tipo de procedimento. A equipe orienta o paciente sobre o que esperar antes e depois.' },
      { q: 'Quantas infiltrações posso fazer?', a: 'Depende do diagnóstico, do tipo de medicação e da resposta ao tratamento. Essa decisão é individual.' },
      { q: 'Preciso levar exames?', a: 'Se tiver exames anteriores, leve para a consulta. Eles ajudam na avaliação e na decisão da conduta.' },
    ],
  },
  '/infiltracao-joelho/': {
    slug: 'infiltracao-joelho',
    title: 'Infiltração no Joelho em Brasília',
    metaTitle: 'Infiltração no Joelho em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica para dor no joelho, inchaço, rigidez, suspeita de desgaste e perda de mobilidade em Brasília.',
    eyebrow: 'Dor no joelho',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, especialista em joelho, com foco em procedimentos para alívio da dor. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofFormationText: 'Especialização em joelho e intervenção da dor',
    video: {
      title: 'Veja um exemplo de infiltração no joelho guiada por ultrassom',
      description: 'Assista ao procedimento sendo realizado em ambiente clínico e veja como a técnica é aplicada com segurança e precisão, sempre após avaliação individual do paciente.',
      src: './videos/infiltracao-joelho.mp4',
    },
    symptomsTitle: 'Quando a dor no joelho começa a mudar sua rotina',
    symptomsIntro: 'Dor, inchaço e rigidez no joelho podem ter causas diferentes. A avaliação ajuda a entender se a infiltração faz sentido no plano de cuidado.',
    symptoms: [
      { text: 'Dor ao subir ou descer escadas', icon: 'stairs' },
      { text: 'Dor para caminhar ou ficar muito tempo em pé', icon: 'walking' },
      { text: 'Inchaço ou sensação de joelho “cheio”', icon: 'drop' },
      { text: 'Rigidez ao levantar', icon: 'clock' },
      { text: 'Dificuldade para treinar ou trabalhar', icon: 'running' },
    ],
    indicationTitle: 'A indicação depende da causa da dor',
    indicationText: 'A infiltração no joelho pode ser considerada em casos selecionados, como processos inflamatórios, desgaste articular, dor persistente ou limitação funcional. Antes de indicar, o médico avalia exame físico, exames de imagem, histórico e tratamentos já realizados.',
    contextsTitle: 'Pode ser uma alternativa quando a dor impede o avanço do tratamento',
    contexts: [
      { title: 'Artrose ou desgaste em avaliação', text: 'O grau de desgaste, sintomas e exames orientam a conduta.', icon: 'bone' },
      { title: 'Inflamação articular', text: 'Casos com componente inflamatório podem exigir controle de sintomas.', icon: 'fire' },
      { title: 'Dor relacionada a sobrecarga', text: 'Treino, trabalho e rotina podem influenciar a dor no joelho.', icon: 'dumbbell' },
      { title: 'Dificuldade na reabilitação', text: 'A dor pode limitar evolução em fisioterapia e retomada de função.', icon: 'rehab' },
      { title: 'Decisão antes de cirurgia', text: 'A consulta ajuda a entender opções e próximos passos.', icon: 'strategy' },
    ],
    typesTitle: 'Nem toda infiltração no joelho é igual',
    types: [
      { title: 'Corticosteroide', text: 'Pode ser considerado quando há componente inflamatório importante e indicação clínica.', icon: 'syringe' },
      { title: 'Ácido hialurônico', text: 'Pode ser avaliado em casos selecionados de desgaste articular, considerando perfil, exames e objetivos.', icon: 'drop' },
      { title: 'PRP e ortobiológicos', text: 'Podem ser discutidos em situações específicas, com alinhamento claro sobre indicação e expectativas.', icon: 'dna' },
    ],
    stepsTitle: 'Antes da infiltração, vem o diagnóstico',
    steps: [
      'Entender a dor, a rotina e as limitações',
      'Examinar estabilidade, mobilidade e pontos de dor',
      'Revisar raio-x, ressonância ou ultrassom quando houver',
      'Definir se infiltração faz sentido',
      'Orientar próximos passos e acompanhamento',
    ],
    faqTitle: 'Perguntas frequentes sobre infiltração no joelho',
    faqs: [
      { q: 'Infiltração no joelho é indicada para artrose?', a: 'Pode ser considerada em alguns casos, mas depende do grau de desgaste, sintomas, exames e tratamentos anteriores.' },
      { q: 'A infiltração no joelho regenera cartilagem?', a: 'Não deve ser entendida como regeneração garantida. O objetivo varia conforme o tipo de infiltração e o diagnóstico.' },
      { q: 'A infiltração substitui cirurgia no joelho?', a: 'Nem sempre. Em alguns casos pode ajudar no controle de sintomas; em outros, a cirurgia pode continuar sendo a melhor indicação.' },
      { q: 'Preciso fazer exame antes?', a: 'A avaliação clínica é essencial. Exames como raio-x, ressonância ou ultrassom podem ajudar na decisão.' },
      { q: 'Posso caminhar depois da infiltração?', a: 'As orientações variam conforme o procedimento e o caso. O médico informa os cuidados após a avaliação.' },
    ],
  },
  '/infiltracao-ombro/': {
    slug: 'infiltracao-ombro',
    title: 'Infiltração no Ombro em Brasília',
    metaTitle: 'Infiltração no Ombro em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica para dor no ombro, bursite, tendinites, rigidez, perda de mobilidade e dificuldade para levantar o braço.',
    eyebrow: 'Dor no ombro',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista com foco em procedimentos para alívio da dor. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofFormationText: 'Especialização em intervenção da dor',
    video: {
      title: 'Veja um exemplo de infiltração no ombro guiada por ultrassom',
      description: 'Assista ao procedimento sendo realizado em ambiente clínico e veja como a técnica é aplicada com segurança e precisão, sempre após avaliação individual do paciente.',
      src: './videos/infiltracao-ombro.mp4',
    },
    symptomsTitle: 'Quando o ombro começa a limitar movimentos simples',
    symptomsIntro: 'Dor para levantar o braço, dormir de lado ou vestir roupa pode envolver diferentes estruturas do ombro. A conduta depende da causa.',
    symptoms: [
      { text: 'Dor para levantar o braço', icon: 'personArms' },
      { text: 'Dor para dormir de lado', icon: 'ombroDorNoturnaIcon' },
      { text: 'Dificuldade para vestir roupa ou pentear o cabelo', icon: 'hand' },
      { text: 'Dor após treino ou esforço repetitivo', icon: 'running' },
      { text: 'Rigidez e perda de mobilidade', icon: 'walking' },
    ],
    indicationTitle: 'A infiltração depende da causa da dor',
    indicationText: 'A infiltração no ombro pode ser avaliada em casos de dor com componente inflamatório, bursite, tendinopatias, impacto ou rigidez, sempre após exame físico e análise do histórico do paciente.',
    contextsTitle: 'Cada diagnóstico muda a conduta',
    contexts: [
      { title: 'Bursite', text: 'Pode causar dor ao levantar o braço e ao deitar sobre o ombro.', icon: 'fire' },
      { title: 'Tendinopatias', text: 'Nem toda dor no tendão deve ser tratada da mesma forma.', icon: 'pulse' },
      { title: 'Síndrome do impacto', text: 'A avaliação identifica movimentos e estruturas relacionados à dor.', icon: 'target' },
      { title: 'Ombro congelado', text: 'Pode causar dor e rigidez progressiva, exigindo plano de cuidado.', icon: 'clock' },
      { title: 'Reabilitação limitada pela dor', text: 'A dor pode atrapalhar ganho de movimento e força.', icon: 'rehab' },
    ],
    typesTitle: 'Controle da dor para recuperar função',
    types: [
      { title: 'Infiltração subacromial', text: 'Pode ser discutida em quadros de bursite, impacto ou dor relacionada ao manguito rotador.', icon: 'syringe' },
      { title: 'Infiltração intra-articular', text: 'Pode ser considerada quando a origem da dor envolve a articulação.', icon: 'target' },
      { title: 'Plano associado à reabilitação', text: 'O procedimento, quando indicado, entra dentro de uma estratégia de retomada de mobilidade.', icon: 'rehab' },
    ],
    stepsTitle: 'Ombro dolorido pode ter diferentes causas',
    steps: [
      'Identificar onde dói e quais movimentos pioram',
      'Avaliar mobilidade, força e testes específicos',
      'Revisar exames quando disponíveis',
      'Definir se a infiltração é indicada',
      'Orientar cuidados e acompanhamento',
    ],
    faqTitle: 'Perguntas frequentes sobre infiltração no ombro',
    faqs: [
      { q: 'Infiltração no ombro serve para bursite?', a: 'Pode ser considerada em alguns casos de bursite, principalmente quando há dor e inflamação persistentes. A indicação depende da avaliação.' },
      { q: 'Infiltração ajuda no ombro congelado?', a: 'Pode ser discutida em alguns casos para controle de dor, dentro de um plano que também considera mobilidade e reabilitação.' },
      { q: 'Dor no ombro é sempre tendinite?', a: 'Não. Pode envolver bursite, tendões, cápsula articular, impacto, articulação ou outras causas. Por isso a avaliação é importante.' },
      { q: 'Preciso de ultrassom ou ressonância?', a: 'Depende do caso. Exames podem ajudar, mas a avaliação clínica orienta a necessidade.' },
      { q: 'Posso voltar a treinar depois?', a: 'A retomada depende do diagnóstico, do procedimento e da resposta individual. O médico orienta o retorno gradual.' },
    ],
  },
  '/medico-especialista-joelho/': {
    slug: 'medico-especialista-joelho',
    title: 'Especialista em Joelho em Brasília',
    metaTitle: 'Especialista em Joelho em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor no joelho, lesões, artrose, instabilidade, inchaço e perda de mobilidade em Brasília.',
    eyebrow: 'Especialista em joelho',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, especialista em joelho, com foco em procedimentos para alívio da dor. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Joelho, esporte e dor',
    proofFormationText: 'Especialização em joelho e intervenção da dor',
    symptomsTitle: 'Quando procurar um especialista em joelho',
    symptomsIntro: 'Dor no joelho pode surgir por sobrecarga, lesões, desgaste articular ou alterações de movimento. A avaliação ajuda a identificar a causa e definir o caminho de cuidado.',
    symptoms: [
      { text: 'Dor ao subir ou descer escadas', icon: 'stairs' },
      { text: 'Inchaço, travamento ou estalos com dor', icon: 'drop' },
      { text: 'Sensação de falseio ou instabilidade', icon: 'target' },
      { text: 'Dificuldade para caminhar, correr ou treinar', icon: 'running' },
      { text: 'Dor persistente após queda, torção ou esforço', icon: 'bandage' },
    ],
    indicationTitle: 'Avaliação focada na causa da dor no joelho',
    indicationText: 'A consulta organiza histórico, exame físico, exames disponíveis e objetivos do paciente. A partir disso, o plano pode envolver orientações, reabilitação, medicações, infiltrações, procedimentos para dor ou cirurgia quando houver indicação.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Dor e sobrecarga', text: 'Queixas que aparecem ao caminhar, subir escadas, treinar ou permanecer muito tempo em pé.', icon: 'running' },
      { title: 'Lesões ortopédicas', text: 'Torções, trauma, suspeita de lesão meniscal, ligamentar ou dor após atividade física.', icon: 'bandage' },
      { title: 'Artrose e desgaste', text: 'Dor, rigidez, limitação e alterações articulares que precisam de avaliação individual.', icon: 'bone' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de joelho',
    contexts: [
      { title: 'Artrose e desgaste', text: 'Avaliação do grau de desgaste, sintomas, exames e impacto na rotina.', icon: 'bone' },
      { title: 'Lesões esportivas', text: 'Dor após treino, corrida, futebol, academia ou esforço repetitivo.', icon: 'dumbbell' },
      { title: 'Dor anterior no joelho', text: 'Dor na frente do joelho ao subir escadas, agachar ou levantar.', icon: 'stairs' },
      { title: 'Inchaço ou travamento', text: 'Sinais que podem indicar irritação articular, lesão ou outra causa mecânica.', icon: 'drop' },
      { title: 'Torções e instabilidade', text: 'Sensação de falseio, insegurança ou perda de confiança no apoio.', icon: 'target' },
    ],
    stepsTitle: 'Uma avaliação para definir o caminho com clareza',
    stepsIntro: 'O objetivo é entender a origem da dor e construir uma conduta proporcional ao diagnóstico, à rotina e aos objetivos do paciente.',
    steps: [
      'Entender início da dor, evolução, rotina e limitações',
      'Examinar mobilidade, força, estabilidade e pontos de dor',
      'Correlacionar sintomas com raio-x, ressonância ou ultrassom quando houver',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Acompanhar evolução e orientar retorno seguro às atividades',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em joelho',
    faqs: [
      { q: 'Quando devo procurar um especialista em joelho?', a: 'Procure avaliação quando a dor limita caminhada, escadas, treino, trabalho ou sono; quando há inchaço, travamento, falseio, trauma ou dor persistente apesar de cuidados iniciais.' },
      { q: 'Dor no joelho precisa sempre de ressonância?', a: 'Não. A necessidade de exame depende da avaliação clínica. Em alguns casos, raio-x, ultrassom ou ressonância podem ajudar a confirmar o diagnóstico e orientar a conduta.' },
      { q: 'Estalos no joelho são preocupantes?', a: 'Estalos isolados podem acontecer sem gravidade. Quando vêm com dor, inchaço, travamento, falseio ou perda de função, merecem avaliação.' },
      { q: 'Todo desgaste no joelho precisa de cirurgia?', a: 'Não. Muitos casos podem ser conduzidos com ajustes de atividade, reabilitação, controle de dor e procedimentos quando indicados. A cirurgia é avaliada conforme gravidade, sintomas e objetivos.' },
      { q: 'O especialista também avalia infiltrações e procedimentos para dor?', a: 'Sim. Quando há indicação, podem ser discutidas opções como infiltrações, bloqueios, radiofrequência e outras estratégias dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor no joelho.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
  '/medico-coluna/': {
    slug: 'medico-coluna',
    title: 'Ortopedista para Coluna em Brasília',
    metaTitle: 'Especialista em Coluna em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor na coluna, hérnia de disco, ciática, formigamento e limitação de movimento em Brasília.',
    eyebrow: 'Especialista em coluna',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, com foco em procedimentos para alívio da dor na coluna. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Coluna, dor e procedimentos intervencionistas',
    proofFormationText: 'Especialização em intervenção da dor',
    symptomsTitle: 'Quando procurar avaliação para dor na coluna',
    symptomsIntro: 'Dor lombar ou cervical pode ter causas diferentes, da postura à hérnia de disco. A avaliação ajuda a identificar a origem e definir o caminho de cuidado.',
    symptoms: [
      { text: 'Dor lombar que não melhora com repouso', icon: 'colunaLombarIcon' },
      { text: 'Dor irradiando para a perna ou formigamento', icon: 'colunaCiaticoIcon' },
      { text: 'Dor no pescoço com formigamento no braço', icon: 'colunaCervicalIcon' },
      { text: 'Rigidez ao acordar ou ficar muito tempo na mesma posição', icon: 'clock' },
      { text: 'Dor persistente após esforço ou má postura', icon: 'colunaSobrecargaIcon' },
    ],
    indicationTitle: 'Avaliação focada na causa da dor na coluna',
    indicationText: 'A consulta organiza histórico, exame físico, exames de imagem quando houver e objetivos do paciente. A partir disso, o plano pode envolver orientações, reabilitação, medicações, bloqueios, infiltrações ou cirurgia quando houver indicação.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Sobrecarga postural', text: 'Dor ligada à rotina, ao trabalho sentado ou a esforços repetitivos.', icon: 'colunaSobrecargaIcon' },
      { title: 'Hérnia de disco e compressão nervosa', text: 'Dor irradiada, formigamento e alterações de disco identificadas em exame.', icon: 'colunaHerniaDiscoIcon' },
      { title: 'Desgaste e artrose da coluna', text: 'Dor crônica e rigidez ligadas ao desgaste das vértebras e articulações.', icon: 'spine' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de coluna',
    contexts: [
      { title: 'Lombalgia crônica', text: 'Dor lombar persistente, com ou sem limitação de movimento.', icon: 'colunaLombarIcon' },
      { title: 'Ciática', text: 'Dor irradiada para a perna, ligada à raiz nervosa.', icon: 'colunaCiaticoIcon' },
      { title: 'Cervicalgia', text: 'Dor e rigidez no pescoço, por vezes com formigamento no braço.', icon: 'colunaCervicalIcon' },
      { title: 'Hérnia de disco', text: 'Compressão nervosa identificada em exame de imagem.', icon: 'colunaHerniaDiscoIcon' },
      { title: 'Sobrecarga muscular e tensão paravertebral', text: 'Dor ligada à postura, ao esforço ou à rotina do dia a dia.', icon: 'colunaSobrecargaIcon' },
    ],
    stepsTitle: 'Uma avaliação para definir o caminho com clareza',
    stepsIntro: 'O objetivo é entender a origem da dor na coluna e construir uma conduta proporcional ao diagnóstico e à rotina do paciente.',
    steps: [
      'Entender início da dor, evolução, rotina e limitações',
      'Examinar mobilidade, força e pontos de dor',
      'Correlacionar sintomas com raio-x ou ressonância quando houver',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Acompanhar evolução e orientar retorno seguro às atividades',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em coluna',
    faqs: [
      { q: 'Quando devo procurar um especialista em coluna?', a: 'Procure avaliação quando a dor lombar ou cervical persiste, irradia para braço ou perna, causa formigamento ou limita a rotina apesar de cuidados iniciais.' },
      { q: 'Hérnia de disco sempre precisa de cirurgia?', a: 'Não. Muitos casos respondem a tratamento conservador, reabilitação e procedimentos para dor. A cirurgia é avaliada conforme gravidade e resposta ao tratamento.' },
      { q: 'Dor irradiada para a perna é sempre ciática?', a: 'Nem sempre. Outras estruturas da coluna e do quadril também podem gerar dor referida na perna, por isso a avaliação diferencia as causas.' },
      { q: 'Preciso de ressonância para toda dor na coluna?', a: 'Não. A necessidade de exame depende da avaliação clínica e da evolução dos sintomas.' },
      { q: 'O especialista também avalia bloqueios e infiltrações para coluna?', a: 'Sim. Quando há indicação, podem ser discutidos bloqueios, infiltrações e radiofrequência dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor na coluna.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
  '/medico-ombro/': {
    slug: 'medico-ombro',
    title: 'Ortopedista para Ombro em Brasília',
    metaTitle: 'Especialista em Ombro em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor no ombro, bursite, tendinopatias, rigidez e perda de mobilidade em Brasília.',
    eyebrow: 'Especialista em ombro',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, com foco em procedimentos para alívio da dor no ombro. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Ombro, esporte e dor',
    proofFormationText: 'Especialização em intervenção da dor',
    symptomsTitle: 'Quando procurar um especialista em ombro',
    symptomsIntro: 'Dor para levantar o braço, dormir de lado ou fazer movimentos simples pode envolver diferentes estruturas do ombro. A avaliação ajuda a identificar a causa.',
    symptoms: [
      { text: 'Dor para levantar o braço', icon: 'ombroLevantarBracoIcon' },
      { text: 'Dor para dormir de lado', icon: 'ombroDorNoturnaIcon' },
      { text: 'Dificuldade para vestir roupa ou pentear o cabelo', icon: 'hand' },
      { text: 'Dor por esforço repetitivo ou overhead', icon: 'dumbbell' },
      { text: 'Rigidez e perda de mobilidade', icon: 'walking' },
    ],
    indicationTitle: 'A avaliação depende da causa da dor no ombro',
    indicationText: 'A conduta pode envolver orientações, reabilitação, medicações, infiltrações ou outros procedimentos, sempre após exame físico e análise do histórico do paciente.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Dor e sobrecarga', text: 'Queixas ligadas a esporte, treino ou esforço repetitivo acima da cabeça.', icon: 'dumbbell' },
      { title: 'Lesões do manguito rotador', text: 'Dor e perda de força relacionadas aos tendões do ombro.', icon: 'ombroManguitoIcon' },
      { title: 'Bursite e tendinopatias', text: 'Inflamação de bursa ou tendão, com dor ao movimento ou à noite.', icon: 'ombroBursiteIcon' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de ombro',
    contexts: [
      { title: 'Bursite', text: 'Dor ao levantar o braço ou ao deitar sobre o ombro.', icon: 'ombroBursiteIcon' },
      { title: 'Tendinopatias do manguito rotador', text: 'Dor e perda de força em movimentos específicos.', icon: 'ombroManguitoIcon' },
      { title: 'Ombro congelado', text: 'Rigidez progressiva com dor, exigindo plano de cuidado.', icon: 'ombroCongeladoIcon' },
      { title: 'Instabilidade e luxação', text: 'Sensação de ombro saindo do lugar ou episódio de trauma.', icon: 'ombroInstabilidadeIcon' },
      { title: 'Dor por esforço repetitivo no esporte', text: 'Sobrecarga em atividades acima da cabeça ou de arremesso.', icon: 'dumbbell' },
    ],
    stepsTitle: 'Ombro dolorido pode ter diferentes causas',
    stepsIntro: 'A decisão é construída por etapas: primeiro entender a causa da dor no ombro, depois definir se o procedimento realmente faz sentido.',
    steps: [
      'Identificar onde dói e quais movimentos pioram',
      'Avaliar mobilidade, força e testes específicos',
      'Revisar exames quando disponíveis',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Orientar cuidados e acompanhamento',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em ombro',
    faqs: [
      { q: 'Quando devo procurar um especialista em ombro?', a: 'Procure avaliação quando a dor limita levantar o braço, dormir de lado, vestir roupa ou treinar, ou quando há rigidez, instabilidade ou trauma.' },
      { q: 'Dor no ombro é sempre tendinite?', a: 'Não. Pode envolver bursite, manguito rotador, cápsula articular, instabilidade ou outras causas, por isso a avaliação é importante.' },
      { q: 'Ombro congelado tem cura?', a: 'A rigidez tende a melhorar com o tempo e o tratamento adequado, que pode incluir reabilitação e, em alguns casos, procedimentos para dor.' },
      { q: 'Preciso de ultrassom ou ressonância?', a: 'Depende do caso. Exames podem ajudar, mas a avaliação clínica orienta a necessidade.' },
      { q: 'O especialista também avalia infiltrações para ombro?', a: 'Sim. Quando há indicação, podem ser discutidas infiltrações e outras estratégias dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor no ombro.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
  '/medico-quadril/': {
    slug: 'medico-quadril',
    title: 'Ortopedista para Quadril em Brasília',
    metaTitle: 'Especialista em Quadril em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor no quadril, desgaste articular, bursite trocantérica e dificuldade para caminhar em Brasília.',
    eyebrow: 'Especialista em quadril',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, com foco em procedimentos para alívio da dor no quadril. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Quadril, marcha e dor',
    proofFormationText: 'Especialização em intervenção da dor',
    symptomsTitle: 'Quando procurar um especialista em quadril',
    symptomsIntro: 'Dor na virilha ou lateral do quadril pode ter causas diferentes, do desgaste articular à bursite. A avaliação ajuda a identificar a origem.',
    symptoms: [
      { text: 'Dor na virilha ou lateral do quadril', icon: 'quadrilDorIcon' },
      { text: 'Dor ao subir escadas ou se levantar da cadeira', icon: 'quadrilEscadasIcon' },
      { text: 'Mancar ou alterar o jeito de andar', icon: 'quadrilMarchaIcon' },
      { text: 'Dor ao ficar muito tempo sentado', icon: 'clock' },
      { text: 'Dor após queda ou esforço', icon: 'quadrilTraumaIcon' },
    ],
    indicationTitle: 'Avaliação focada na causa da dor no quadril',
    indicationText: 'A consulta organiza histórico, exame físico, exames de imagem quando houver e objetivos do paciente. A partir disso, o plano pode envolver orientações, reabilitação, medicações, infiltrações ou cirurgia quando houver indicação.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Desgaste articular e artrose', text: 'Dor crônica e rigidez ligadas ao desgaste do quadril.', icon: 'quadrilArtroseIcon' },
      { title: 'Bursite trocantérica', text: 'Dor lateral no quadril, comum ao deitar sobre o lado afetado.', icon: 'quadrilBursiteIcon' },
      { title: 'Dor por sobrecarga ou impacto no esporte', text: 'Queixas ligadas a corrida, treino ou esforço repetitivo.', icon: 'dumbbell' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de quadril',
    contexts: [
      { title: 'Artrose de quadril', text: 'Desgaste articular identificado em exame, com dor e rigidez.', icon: 'quadrilArtroseIcon' },
      { title: 'Bursite trocantérica', text: 'Dor lateral, muitas vezes pior à noite ou ao deitar de lado.', icon: 'quadrilBursiteIcon' },
      { title: 'Mancar ou alterar a marcha', text: 'Alteração no jeito de andar ligada à dor ou à limitação.', icon: 'quadrilMarchaIcon' },
      { title: 'Dor referida da coluna lombar', text: 'Dor no quadril que pode ter origem na coluna.', icon: 'quadrilNervoIcon' },
      { title: 'Dor após queda ou trauma no quadril', text: 'Avaliação após impacto direto ou torção.', icon: 'quadrilTraumaIcon' },
    ],
    stepsTitle: 'Uma avaliação para entender a dor no quadril',
    stepsIntro: 'O objetivo é entender a origem da dor no quadril e construir uma conduta proporcional ao diagnóstico e à rotina do paciente.',
    steps: [
      'Entender início da dor, evolução, rotina e limitações',
      'Examinar mobilidade, força e pontos de dor',
      'Correlacionar sintomas com raio-x ou ressonância quando houver',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Acompanhar evolução e orientar retorno seguro às atividades',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em quadril',
    faqs: [
      { q: 'Quando devo procurar um especialista em quadril?', a: 'Procure avaliação quando a dor limita caminhar, subir escadas ou ficar sentado, quando há mancar ou quando a dor persiste após queda ou esforço.' },
      { q: 'Toda dor no quadril é artrose?', a: 'Não. Pode envolver bursite, tendões, dor referida da coluna ou outras causas, por isso a avaliação é importante.' },
      { q: 'Artrose de quadril sempre precisa de cirurgia?', a: 'Não. Muitos casos podem ser conduzidos com ajustes de atividade, reabilitação e controle de dor. A cirurgia é avaliada conforme gravidade e sintomas.' },
      { q: 'Preciso de ressonância para dor no quadril?', a: 'Depende do caso. Raio-x, ultrassom ou ressonância podem ajudar a confirmar o diagnóstico quando indicados pela avaliação clínica.' },
      { q: 'O especialista também avalia infiltrações para quadril?', a: 'Sim. Quando há indicação, podem ser discutidas infiltrações e outras estratégias dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor no quadril.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
  '/medico-mao-punho/': {
    slug: 'medico-mao-punho',
    title: 'Ortopedista para Mão e Punho em Brasília',
    metaTitle: 'Especialista em Mão e Punho em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor na mão e no punho, túnel do carpo, dedo em gatilho e perda de força em Brasília.',
    eyebrow: 'Especialista em mão e punho',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, com foco em procedimentos para alívio da dor na mão e no punho. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Mão, punho e dor',
    proofFormationText: 'Especialização em intervenção da dor',
    symptomsTitle: 'Quando procurar um especialista em mão e punho',
    symptomsIntro: 'Formigamento, dor ao digitar ou dedo travando podem ter causas diferentes. A avaliação ajuda a identificar a origem e definir o caminho de cuidado.',
    symptoms: [
      { text: 'Formigamento nos dedos', icon: 'punhoFormigamentoIcon' },
      { text: 'Dor ao digitar ou segurar objetos', icon: 'punhoDeQuervainIcon' },
      { text: 'Dedo travando ao dobrar', icon: 'punhoDedoGatilhoIcon' },
      { text: 'Dor após queda com a mão apoiada', icon: 'punhoTraumaIcon' },
      { text: 'Perda de força na mão', icon: 'punhoPreensaoIcon' },
    ],
    indicationTitle: 'Avaliação focada na causa da dor na mão e no punho',
    indicationText: 'A consulta organiza histórico, exame físico, exames quando houver e objetivos do paciente. A partir disso, o plano pode envolver orientações, reabilitação, medicações, infiltrações ou cirurgia quando houver indicação.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Síndrome do túnel do carpo', text: 'Formigamento e dormência ligados à compressão do nervo mediano.', icon: 'punhoTunelCarpoIcon' },
      { title: 'Dedo em gatilho', text: 'Dedo que trava ou estala ao dobrar.', icon: 'punhoDedoGatilhoIcon' },
      { title: 'Tendinopatias do punho', text: 'Dor ao digitar, segurar objetos ou movimentar o punho.', icon: 'punhoDeQuervainIcon' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de mão e punho',
    contexts: [
      { title: 'Túnel do carpo', text: 'Formigamento e dormência nos dedos, comuns à noite.', icon: 'punhoTunelCarpoIcon' },
      { title: 'Dedo em gatilho', text: 'Dedo que trava ao dobrar ou esticar.', icon: 'punhoDedoGatilhoIcon' },
      { title: 'Tendinite de De Quervain', text: 'Dor na base do polegar ao segurar ou girar objetos.', icon: 'punhoDeQuervainIcon' },
      { title: 'Artrose de mãos', text: 'Dor e rigidez nas articulações dos dedos.', icon: 'punhoArtroseIcon' },
      { title: 'Fraturas e entorses de punho', text: 'Avaliação após queda ou trauma na mão apoiada.', icon: 'punhoTraumaIcon' },
    ],
    stepsTitle: 'Uma avaliação para entender a dor na mão e no punho',
    stepsIntro: 'O objetivo é entender a origem da dor e construir uma conduta proporcional ao diagnóstico e à rotina do paciente.',
    steps: [
      'Entender início da dor, evolução, rotina e limitações',
      'Examinar mobilidade, força e pontos de dor',
      'Correlacionar sintomas com exames quando houver',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Acompanhar evolução e orientar retorno seguro às atividades',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em mão e punho',
    faqs: [
      { q: 'Quando devo procurar um especialista em mão e punho?', a: 'Procure avaliação quando há formigamento, dor persistente, dedo travando, perda de força ou dor após queda ou trauma.' },
      { q: 'Túnel do carpo sempre precisa de cirurgia?', a: 'Não. Muitos casos respondem a orientações, órteses e tratamento conservador. A cirurgia é avaliada conforme gravidade e resposta ao tratamento.' },
      { q: 'Dedo em gatilho tem cura?', a: 'Pode melhorar com tratamento conservador ou procedimento, dependendo do grau e da resposta ao tratamento inicial.' },
      { q: 'Preciso de exame antes da consulta?', a: 'Se tiver exames anteriores, leve para a avaliação. Eles ajudam, mas não são obrigatórios para a primeira consulta.' },
      { q: 'O especialista também avalia infiltrações para mão e punho?', a: 'Sim. Quando há indicação, podem ser discutidas infiltrações e outras estratégias dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor na mão ou no punho.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
  '/medico-pe-tornozelo/': {
    slug: 'medico-pe-tornozelo',
    title: 'Ortopedista para Pé e Tornozelo em Brasília',
    metaTitle: 'Especialista em Pé e Tornozelo em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com foco em dor no pé e no tornozelo, entorses, fascite plantar e tendinite de Aquiles em Brasília.',
    eyebrow: 'Especialista em pé e tornozelo',
    description: 'Dr. Gustavo Pimpão, ortopedista e traumatologista, com foco em procedimentos para alívio da dor no pé e no tornozelo. Atendimento em 3 locais de Brasília e +40 convênios aceitos.',
    proofPainText: 'Pé, tornozelo e dor',
    proofFormationText: 'Especialização em intervenção da dor',
    symptomsTitle: 'Quando procurar um especialista em pé e tornozelo',
    symptomsIntro: 'Dor no calcanhar, entorses de repetição ou inchaço no tornozelo podem ter causas diferentes. A avaliação ajuda a identificar a origem.',
    symptoms: [
      { text: 'Dor no calcanhar ao pisar', icon: 'peFasciteIcon' },
      { text: 'Tornozelo que torce com frequência', icon: 'peEntorseIcon' },
      { text: 'Dor atrás do tornozelo ao caminhar ou correr', icon: 'peAquilesIcon' },
      { text: 'Inchaço no tornozelo', icon: 'peInchacoIcon' },
      { text: 'Dor no pé após corrida ou longos períodos em pé', icon: 'peSobCargaIcon' },
    ],
    indicationTitle: 'Avaliação focada na causa da dor no pé e no tornozelo',
    indicationText: 'A consulta organiza histórico, exame físico, exames de imagem quando houver e objetivos do paciente. A partir disso, o plano pode envolver orientações, reabilitação, medicações, infiltrações ou cirurgia quando houver indicação.',
    typesTitle: 'O que pode ser avaliado na consulta',
    types: [
      { title: 'Entorses e instabilidade do tornozelo', text: 'Torções de repetição e sensação de instabilidade ao caminhar.', icon: 'peEntorseIcon' },
      { title: 'Fascite plantar', text: 'Dor no calcanhar, mais intensa nos primeiros passos do dia.', icon: 'peFasciteIcon' },
      { title: 'Tendinite de Aquiles', text: 'Dor atrás do tornozelo ao caminhar, correr ou subir na ponta do pé.', icon: 'peAquilesIcon' },
    ],
    contextsTitle: 'Queixas comuns no atendimento de pé e tornozelo',
    contexts: [
      { title: 'Entorses de repetição', text: 'Torções frequentes, com ou sem sensação de instabilidade.', icon: 'peEntorseIcon' },
      { title: 'Fascite plantar', text: 'Dor no calcanhar ao pisar, comum ao acordar.', icon: 'peFasciteIcon' },
      { title: 'Tendinite de Aquiles', text: 'Dor e rigidez atrás do tornozelo.', icon: 'peAquilesIcon' },
      { title: 'Inchaço no tornozelo', text: 'Edema recorrente, com ou sem dor associada.', icon: 'peInchacoIcon' },
      { title: 'Sobrecarga no esporte', text: 'Dor ligada a corrida, caminhada longa ou esforço repetitivo.', icon: 'running' },
    ],
    stepsTitle: 'Uma avaliação para entender a dor no pé e no tornozelo',
    stepsIntro: 'O objetivo é entender a origem da dor e construir uma conduta proporcional ao diagnóstico e à rotina do paciente.',
    steps: [
      'Entender início da dor, evolução, rotina e limitações',
      'Examinar mobilidade, estabilidade e pontos de dor',
      'Correlacionar sintomas com raio-x ou ressonância quando houver',
      'Definir tratamento conservador, procedimento ou cirurgia quando indicado',
      'Acompanhar evolução e orientar retorno seguro às atividades',
    ],
    faqTitle: 'Perguntas frequentes sobre especialista em pé e tornozelo',
    faqs: [
      { q: 'Quando devo procurar um especialista em pé e tornozelo?', a: 'Procure avaliação quando há entorses frequentes, dor persistente no calcanhar, inchaço ou dor que limita caminhar, correr ou treinar.' },
      { q: 'Fascite plantar sempre precisa de cirurgia?', a: 'Não. A maioria dos casos responde a orientações, alongamento, calçados adequados e tratamento conservador.' },
      { q: 'Entorse de tornozelo sempre precisa de exame de imagem?', a: 'Depende do caso. A avaliação clínica orienta a necessidade de raio-x ou ressonância.' },
      { q: 'Tendinite de Aquiles impede treinar?', a: 'Depende da gravidade. Em muitos casos, o tratamento permite retorno gradual às atividades com ajustes de carga.' },
      { q: 'O especialista também avalia infiltrações para pé e tornozelo?', a: 'Sim. Quando há indicação, podem ser discutidas infiltrações e outras estratégias dentro de um plano individual.' },
    ],
    finalCtaTitle: 'Agende uma avaliação para entender a causa da dor no pé ou no tornozelo.',
    finalCtaDescription: 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.',
  },
}

function getNormalizedPathname() {
  if (typeof window === 'undefined') return null
  let pathname = window.location.pathname
  pathname = pathname.replace('/lp-dr-gustavo-pimpao', '')
  if (!pathname.endsWith('/')) pathname = `${pathname}/`
  return pathname
}

function getCurrentLandingPage() {
  const pathname = getNormalizedPathname()
  return injectionLandingPages[pathname] || null
}

const heroLocationVariants = {
  '/ortopedista-aguas-claras/': 'Ortopedista em Águas Claras',
  '/ortopedista-asa-sul/': 'Ortopedista na Asa Sul',
  '/ortopedista-taguatinga/': 'Ortopedista em Taguatinga',
  '/convenio/': 'Ortopedia pelo Convênio em Brasília',
}

function getHeroTitle() {
  const pathname = getNormalizedPathname()
  return heroLocationVariants[pathname] || undefined
}

function isConveniosMetaPage() {
  return ['/convenios-meta/', '/convenio-meta/', '/meta-convenios/'].includes(getNormalizedPathname())
}

function track(event, payload = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
}

function whatsappUrl({ name = '', phone = '', source = 'lp' } = {}) {
  const message = [
    `Olá, vim pelo site do ${doctor.shortName}.`,
    name ? `Meu nome é ${name}.` : '',
    phone ? `Meu telefone é ${phone}.` : '',
    'Quero agendar uma avaliação ortopédica.',
  ].filter(Boolean).join(' ')

  return `https://wa.me/${doctor.phone}?text=${encodeURIComponent(message)}&utm_source=${source}&utm_medium=lp&utm_campaign=dr_gustavo_pimpao`
}

function scrollToConvenios() {
  document.getElementById('convenios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isDirecionamentoPage() {
  return ['/agendar/', '/direcionamento/'].includes(getNormalizedPathname())
}

function getDirecionamentoUrl(source = 'lp') {
  if (typeof window === 'undefined') return '/agendar/'
  
  const currentParams = new URLSearchParams(window.location.search)
  const lpUrl = new URL(window.location.href)
  currentParams.set('landing_page_url', lpUrl.origin + lpUrl.pathname)
  currentParams.set('ponto_conversao', source)
  if (document.referrer) {
    currentParams.set('referrer_url', document.referrer)
  }
  
  let basePath = '/'
  const path = window.location.pathname
  if (path.includes('/lp-dr-gustavo-pimpao')) {
    basePath = '/lp-dr-gustavo-pimpao/'
  } else if (path.startsWith('/lp')) {
    basePath = '/lp/'
  }
  
  return `${basePath}agendar/?${currentParams.toString()}`
}

function openLeadModal(event, source = 'lp') {
  event?.preventDefault()
  if (typeof window === 'undefined') return
  track('whatsapp_click', { location: source })
  window.location.href = getDirecionamentoUrl(source)
}


function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function ContactLeadModal({ open, onClose, source = 'convenios_meta' }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    const formattedPhone = formatPhoneInput(phone)

    track('lead_submit', {
      location: source,
      lead_source: source,
      lead_name: name.trim(),
      lead_phone: formattedPhone,
    })

    // Captura o lead nas planilhas de CRM antes de redirecionar pro WhatsApp.
    // Contrato do webhook (INSTRUCOES-FRONT.md): pagina = URL completa da LP com a
    // query string, mais os parâmetros de tracking — sem eles a atribuição se perde.
    // phone = dígitos puros (estado interno do input); botao = origem do clique.
    const lpUrl = new URL(window.location.href)
    const q = lpUrl.searchParams
    const pick = (...keys) => keys.map((k) => q.get(k)).find(Boolean) || ''
    const cookie = (key) => document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`))?.[1] || ''

    fetch('https://leads.pulso.marketing/lead/drgustavo-pimpao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: name.trim(),
        phone,
        pagina: lpUrl.toString(),
        botao: source,
        utm_source: pick('utm_source'),
        utm_medium: pick('utm_medium'),
        utm_campaign: pick('utm_campaign'),
        utm_content: pick('utm_content'),
        utm_term: pick('utm_term'),
        campaign_id: pick('campaign_id', 'campaignid'),
        adset_id: pick('adset_id', 'adgroupid'),
        ad_id: pick('ad_id', 'adid'),
        adset_name: pick('adset_name'),
        placement: pick('placement'),
        platform: pick('platform'),
        gclid: pick('gclid'),
        gbraid: pick('gbraid'),
        fbclid: pick('fbclid'),
        fbp: cookie('_fbp'),
        fbc: cookie('_fbc'),
        device: pick('device'),
      }),
    }).catch(() => {})

    window.location.href = whatsappUrl({
      name: name.trim(),
      phone: formattedPhone,
      source,
    })
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-graphite/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-cream text-brand-red transition hover:bg-brand-red hover:text-white"
          aria-label="Fechar formulário"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>

        <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Atendimento pelo WhatsApp</p>
        <h2 id="contact-modal-title" className="font-display mt-3 pr-10 text-3xl font-black leading-tight text-brand-graphite">
          Preencha e continue no WhatsApp
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="lead-name" className="text-sm font-black text-brand-graphite">Nome</label>
            <input
              id="lead-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="mt-2 min-h-14 w-full rounded-2xl border border-brand-graphite/15 bg-brand-cream px-4 text-base font-bold text-brand-graphite outline-none transition focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/10"
            />
          </div>

          <div>
            <label htmlFor="lead-phone" className="text-sm font-black text-brand-graphite">Telefone</label>
            <input
              id="lead-phone"
              required
              value={formatPhoneInput(phone)}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="(61) 99123-6212"
              inputMode="tel"
              maxLength={15}
              className="mt-2 min-h-14 w-full rounded-2xl border border-brand-graphite/15 bg-brand-cream px-4 text-base font-bold text-brand-graphite outline-none transition focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/10"
            />
          </div>

          <button
            type="submit"
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-4 text-center text-base font-black uppercase tracking-wide text-white shadow-lg shadow-brand-red/20 transition hover:bg-brand-red-dark"
          >
            <Icon name="whatsapp" />
            Continuar pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}

function LeadModalHost() {
  return null
}

function ConveniosMetaPage() {
  const conveniosRef = useRef(null)
  const [showFixedContact, setShowFixedContact] = useState(false)

  useEffect(() => {
    document.title = 'Convênios atendidos — Dr. Gustavo Pimpão'

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Convênios atendidos pelo Dr. Gustavo Pimpão, ortopedista e traumatologista em Brasília.'
      )
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const convenios = conveniosRef.current
      if (!convenios || typeof window === 'undefined') return
      const triggerPoint = Math.max(320, convenios.offsetTop - window.innerHeight + 120)
      setShowFixedContact(window.scrollY >= triggerPoint)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function scrollToConveniosMeta() {
    conveniosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    track('convenios_click', { location: 'convenios_meta_top' })
    window.setTimeout(() => setShowFixedContact(true), 500)
  }

  return (
    <main className="min-h-screen bg-brand-cream px-4 pb-28 pt-8 sm:px-6 sm:pb-8 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-brand-wine/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center">
        <div className="w-full rounded-[2rem] border border-brand-red/10 bg-white p-5 shadow-soft sm:p-7 lg:p-8">
          <div className="grid gap-6 border-b border-brand-graphite/10 pb-7 md:grid-cols-[180px_1fr_auto] md:items-center lg:grid-cols-[220px_1fr_auto]">
            <div className="mx-auto w-full max-w-[240px] md:max-w-none">
              <div className="overflow-hidden rounded-[1.5rem] bg-brand-wine p-2 shadow-lg shadow-brand-red/10">
                <img
                  src="./img/dr-gustavo-portrait.webp"
                  alt="Dr. Gustavo Pimpão"
                  className="aspect-[4/5] w-full rounded-[1.15rem] object-cover object-top"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Dr. Gustavo Pimpão</p>
              <h1 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-4xl">
                Ortopedista para Infiltração com Ácido Hialurônico
              </h1>
              <p className="mt-3 text-base font-black text-brand-red">{doctor.crm} • {doctor.rqe}</p>
            </div>

            <div className="flex flex-col gap-3 md:min-w-[230px]">
              <Button onClick={(event) => openLeadModal(event, 'convenios_meta_hero_contact')} source="convenios_meta_hero_contact" className="w-full text-center">
                Entrar em contato
              </Button>
              <Button variant="outline" onClick={scrollToConveniosMeta} source="convenios_meta_top" className="w-full text-center">
                Ver lista de convênios
              </Button>
            </div>
          </div>

          <div id="convenios-atendidos" ref={conveniosRef} className="scroll-mt-6 pt-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-black text-brand-graphite">Convênios atendidos</h2>
              <p className="text-sm font-bold text-brand-gray">Consulte cobertura e unidade pelo WhatsApp.</p>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {convenioHighlights.map((name) => (
                <li
                  key={name}
                  className="flex min-h-11 items-center gap-2 rounded-full border border-brand-red/15 bg-brand-cream px-3 py-2 text-sm font-black uppercase tracking-[0.03em] text-brand-wine"
                >
                  <Icon name="check" className="h-4 w-4 flex-shrink-0 text-brand-red" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={(event) => openLeadModal(event, 'convenios_meta_fixed')}
        className={`${showFixedContact ? 'inline-flex' : 'hidden'} fixed inset-x-4 bottom-4 z-50 min-h-14 items-center justify-center rounded-full bg-brand-red px-6 py-4 text-center text-base font-black uppercase tracking-wide text-white shadow-2xl shadow-brand-red/25 transition hover:bg-brand-red-dark focus-visible:outline-brand-orange sm:left-auto sm:right-6 sm:w-auto sm:px-8`}
      >
        Entrar em contato
      </button>

      <LeadModalHost />
    </main>
  )
}

function HealthSpineIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2058 6.24184C15.5833 6.12178 15 6.59494 15 7.22895V7.88659C15 8.43888 14.5523 8.88659 14 8.88659H13C12.4477 8.88659 12 9.33431 12 9.88659V11.7353C12 12.2876 12.4477 12.7353 13 12.7353H14C14.5523 12.7353 15 13.183 15 13.7353V14.8453C15 15.3022 15.3106 15.702 15.7544 15.8107C22.2204 17.3952 26.0763 17.396 32.2561 15.8165C32.6948 15.7043 33 15.3069 33 14.8541V13.7353C33 13.183 33.4477 12.7353 34 12.7353H35C35.5523 12.7353 36 12.2876 36 11.7353V9.88659C36 9.33431 35.5523 8.88659 35 8.88659H34C33.4477 8.88659 33 8.43888 33 7.88659V7.23211C33 6.59707 32.415 6.12369 31.7916 6.24503C25.8882 7.39417 22.1085 7.38021 16.2058 6.24184ZM19 10.0001C19 9.4478 18.5523 9.00008 18 9.00008C17.4477 9.00008 17 9.4478 17 10.0001V13.0001C17 13.5524 17.4477 14.0001 18 14.0001C18.5523 14.0001 19 13.5524 19 13.0001V10.0001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2058 18.2418C15.5833 18.1218 15 18.5949 15 19.229V19.8866C15 20.4389 14.5523 20.8866 14 20.8866H13C12.4477 20.8866 12 21.3343 12 21.8866V23.7353C12 24.2876 12.4477 24.7353 13 24.7353H14C14.5523 24.7353 15 25.183 15 25.7353V26.8453C15 27.3022 15.3106 27.702 15.7544 27.8107C22.2204 29.3952 26.0763 29.396 32.2561 27.8165C32.6948 27.7044 33 27.3069 33 26.8541V25.7353C33 25.183 33.4477 24.7353 34 24.7353H35C35.5523 24.7353 36 24.2876 36 23.7353V21.8866C36 21.3343 35.5523 20.8866 35 20.8866H34C33.4477 20.8866 33 20.4389 33 19.8866V19.2321C33 18.5971 32.415 18.1237 31.7916 18.245C25.8882 19.3942 22.1085 19.3802 16.2058 18.2418ZM19 22.0001C19 21.4478 18.5523 21.0001 18 21.0001C17.4477 21.0001 17 21.4478 17 22.0001V25.0001C17 25.5524 17.4477 26.0001 18 26.0001C18.5523 26.0001 19 25.5524 19 25.0001V22.0001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2058 30.2418C15.5833 30.1218 15 30.5949 15 31.229V31.8866C15 32.4389 14.5523 32.8866 14 32.8866H13C12.4477 32.8866 12 33.3343 12 33.8866V35.7353C12 36.2876 12.4477 36.7353 13 36.7353H14C14.5523 36.7353 15 37.183 15 37.7353V38.8453C15 39.3022 15.3106 39.702 15.7544 39.8107C22.2204 41.3952 26.0763 41.396 32.2561 39.8165C32.6948 39.7043 33 39.3069 33 38.8541V37.7353C33 37.183 33.4477 36.7353 34 36.7353H35C35.5523 36.7353 36 36.2876 36 35.7353V33.8866C36 33.3343 35.5523 32.8866 35 32.8866H34C33.4477 32.8866 33 32.4389 33 31.8866V31.2321C33 30.5971 32.415 30.1237 31.7916 30.245C25.8882 31.3942 22.1085 31.3802 16.2058 30.2418ZM19 34.0001C19 33.4478 18.5523 33.0001 18 33.0001C17.4477 33.0001 17 33.4478 17 34.0001V37.0001C17 37.5524 17.4477 38.0001 18 38.0001C18.5523 38.0001 19 37.5524 19 37.0001V34.0001Z" fill="currentColor" />
    </svg>
  )
}

function ColunaLombarIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M32 30.833a3 3 0 1 1 6 0V43a1 1 0 1 1-2 0V30.833a1 1 0 1 0-2 0v.223a1 1 0 1 1-2 0z"/><path d="M29.473 14c-3.01 0-5.168 1.782-6.537 4.217C21.59 20.608 21 23.627 21 26.282c0 .761.252 1.55.537 2.223c.296.698.68 1.392 1.05 1.996q.128.21.255.406a1 1 0 0 1 .158.54v9.686c0 .415.382.867 1 .867s1-.452 1-.867v-9.191c0-2.97.974-5.947 1.791-8.447l.023-.069q.218-.663.415-1.284q.316-.995.65-1.875a1 1 0 0 1 1.91.128l.716 3.078c.075.322.267.56.49.682l4.624 1.033a1 1 0 0 1 .18.059c.39.169.915 0 1.127-.575c.208-.567-.04-1.141-.43-1.37l-3.7-.644a1 1 0 0 1-.802-.758l-1.658-7.12c-.12-.513-.512-.78-.863-.78m-8.28 3.236c1.601-2.848 4.33-5.236 8.28-5.236c1.385 0 2.505 1.013 2.811 2.327l1.508 6.475l3.188.555q.117.02.227.068c1.505.653 2.149 2.434 1.595 3.938c-.553 1.504-2.176 2.357-3.702 1.758l-4.654-1.04a1 1 0 0 1-.18-.058a3 3 0 0 1-1.616-1.776c-.822 2.514-1.65 5.14-1.65 7.695v9.191C27 42.78 25.59 44 24 44s-3-1.22-3-2.867v-9.396q-.06-.094-.119-.192a17.5 17.5 0 0 1-1.185-2.26c-.323-.76-.696-1.843-.696-3.003c0-2.904.639-6.283 2.193-9.046m-11.076-7.161a1 1 0 0 1 1.352-.413l5.578 2.965a1 1 0 0 1-.083 1.805l-1.71.716l3.126 1.725a1 1 0 0 1-.966 1.751L12.477 15.9a1 1 0 0 1 .097-1.798l1.67-.7l-3.713-1.974a1 1 0 0 1-.414-1.353m-.285 9.903c.11-.56.623-.927 1.145-.819l3.666.76a.97.97 0 0 1 .73.717c.096.368-.007.767-.269 1.036l-.797.82l1.938.504c.515.134.824.692.689 1.247s-.663.896-1.179.762l-3.625-.944a.98.98 0 0 1-.69-.73c-.087-.363.018-.75.273-1.013l.724-.744l-1.862-.385c-.521-.108-.854-.65-.743-1.21M33 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/></g>
    </svg>
  )
}

function ColunaCiaticoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M5.002 2c2.691.314 8.897 1.896 11.64 5.746c.337.47.69.804 1.27.95c.724.18 1.324.666 1.542 1.4c.232.798.66 1.64.524 2.494c-.052.327-.212.628-.532 1.23L15.099 22"/><path d="M4.002 12c1 1.726 4.164 2.596 8 1.726a10.1 10.1 0 0 0-2.685 2.225c-.559.646-.797 1.544-.836 2.452c-.052 1.212-.232 2.53-.854 3.597M5.002 7s1.959.29 3.5 1.5c1 .786 2.916 1.31 3.5 1.5"/></g>
    </svg>
  )
}

function ColunaCervicalIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M35.068 20.12a3 3 0 0 0-5.84 1.293q.011.078.034.155c.323 1.054.765 2.14 1.17 3.126c-1.409-.098-2.802-.194-3.02-.194c-.428 0-.766.093-.856.118l-.004.001a4 4 0 0 0-.325.104c-.146.053-.304.117-.418.163l-.085.035c-.233.095-.465.189-.721.282c-.662.24-1.06.305-1.192.3c-.114-.005-.467-.084-1.038-.31c-.222-.09-.421-.177-.62-.263l-.067-.03c-.094-.041-.23-.1-.354-.15a4 4 0 0 0-.292-.103a3.2 3.2 0 0 0-.943-.147c-.182 0-1.674.096-3.2.194l.06-.125v-.001l.523-1.098c.053-.113.111-.227.178-.358l.017-.034c.07-.14.15-.296.225-.458a4.4 4.4 0 0 0 .372-1.15a3 3 0 0 0-2.493-3.433c-1.52-.241-2.757.72-3.276 1.908a66 66 0 0 1-1.313 2.77l-.24.491c-.54 1.098-1.082 2.23-1.544 3.404a5 5 0 0 0-.174.508l-.001.003c-.021.075-.1.356-.117.71A3.01 3.01 0 0 0 12.518 31c.2.001 1.858-.105 3.479-.21L17 30.726v1.267l-2.612 1.666a3 3 0 0 0-1.325 3.14l1 4.812a3 3 0 0 0 5.921-.92l-.245-2.354l1.1-.336h6.538l.889.29l-.25 2.4a3 3 0 0 0 5.921.92l1-4.812a3 3 0 0 0-1.22-3.07L31 31.831v-1.085l.65.046c1.47.102 2.987.207 3.209.207a3.01 3.01 0 0 0 2.998-2.721c.042-.42-.016-.76-.031-.852v-.003m-15.791-.373c.595.236 1.217.43 1.694.45c.55.022 1.264-.168 1.955-.418a19 19 0 0 0 .788-.308l.09-.036c.27-.11.552-.239.85-.239h.003l.087.004l.247.014c.204.012.477.03.795.051l2.247.154l1.1.077a1 1 0 0 0 .998-1.367l-.192-.481q-.19-.474-.387-.95c-.4-.974-.804-1.958-1.108-2.932a1 1 0 0 1 1.957-.352l.022.068c.313.844.706 1.709 1.083 2.54c.161.355.32.704.468 1.043c.512 1.17.934 2.28 1.121 3.388v.003c.007.04.029.169.014.32a1.01 1.01 0 0 1-1.008.92h-.003l-.08-.004l-.237-.013l-.767-.05c-.615-.04-1.404-.095-2.19-.15l-1.513-.105a1 1 0 0 0-1.069.998v2.677a1 1 0 0 0 .428.82l3.144 2.194a1 1 0 0 1 .407 1.024l-1 4.813a1 1 0 0 1-1.974-.307l.333-3.205a1 1 0 0 0-.685-1.054l-1.808-.589a1 1 0 0 0-.31-.049H20.69a1 1 0 0 0-.292.044l-2.03.62a1 1 0 0 0-.703 1.059l.33 3.174a1 1 0 0 1-1.974.306l-1-4.812a1 1 0 0 1 .442-1.047l3.075-1.96A1 1 0 0 0 19 32.54v-2.882a1 1 0 0 0-1.064-.998l-1.834.118l-2.408.153a170 170 0 0 1-1.176.068a1.01 1.01 0 0 1-.932-.627c-.086-.21-.077-.395-.075-.441c.007-.13.037-.24.046-.273l.001-.004c.029-.102.07-.215.11-.313c.429-1.093.94-2.161 1.477-3.255l.236-.48c.459-.932.93-1.888 1.355-2.862c.24-.55.706-.8 1.13-.733a1 1 0 0 1 .831 1.145a2.4 2.4 0 0 1-.213.624c-.057.125-.12.25-.192.391l-.019.037c-.064.126-.134.265-.2.404l-.522 1.094l-.792 1.666a1 1 0 0 0 .968 1.426l1.341-.087l3.112-.195l.313-.017h.004c.523 0 1.076.367 1.538.55m1.607-22.983a1 1 0 0 1 1.292.576l1.207 3.144a1 1 0 0 1-1.103 1.344l-.98-.169l.639 1.306a1 1 0 0 1-1.796.88l-1.5-3.062a1 1 0 0 1 1.067-1.426l1.176.202l-.577-1.502a1 1 0 0 1 .575-1.293m-10.342.22a1 1 0 0 1 1.414.014l3.922 4a1 1 0 0 1-.714 1.7h-1.483l1.306 1.288a1 1 0 0 1-1.404 1.424l-3.043-3A1 1 0 0 1 14 8h1.54l-2.254-2.3a1 1 0 0 1 .014-1.414m21.407.007a1 1 0 0 1 0 1.414L32.414 8h1.508a1 1 0 0 1 .711 1.703l-2.965 3a1 1 0 0 1-1.423-1.406L31.527 10H30a1 1 0 0 1-.707-1.707l4-4a1 1 0 0 1 1.414 0"/><path d="M24 21a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m0 2a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9"/></g>
    </svg>
  )
}

function ColunaHerniaDiscoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M14.75 7.229c0-1.274 1.166-2.205 2.393-1.97c5.198.994 8.516 1.006 13.71.003c1.227-.237 2.397.694 2.397 1.97v.414H34a2 2 0 0 1 2 2v1.528a2 2 0 0 1-2 2h-.75v.878a1.99 1.99 0 0 1-1.498 1.931c-2.854.727-5.224 1.101-7.65 1.1c-2.424 0-4.856-.376-7.834-1.103a1.99 1.99 0 0 1-1.518-1.937v-.869H14a2 2 0 0 1-2-2V9.646a2 2 0 0 1 2-2h.75zm2 0v.417a2 2 0 0 1-2 2H14v1.528h.75a2 2 0 0 1 2 2v.865c2.886.704 5.147 1.044 7.353 1.044c2.203.001 4.397-.336 7.147-1.035v-.874a2 2 0 0 1 2-2H34V9.646h-.75a2 2 0 0 1-2-2v-.414l-.002-.002l-.008-.004h-.008c-5.448 1.052-9.022 1.039-14.465-.003h-.008l-.007.004z"/><path d="M19 9a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m-4.25 11.229c0-1.274 1.166-2.205 2.393-1.97c5.198.994 8.516 1.006 13.71.003c1.227-.237 2.397.694 2.397 1.97v.414H34a2 2 0 0 1 2 2v1.528a2 2 0 0 1-2 2h-.75v.878a1.99 1.99 0 0 1-1.498 1.931c-2.854.727-5.224 1.101-7.65 1.1c-2.424 0-4.856-.376-7.834-1.103a1.99 1.99 0 0 1-1.518-1.936v-.87H14a2 2 0 0 1-2-2v-1.528a2 2 0 0 1 2-2h.75zm2 0v.417a2 2 0 0 1-2 2H14v1.528h.75a2 2 0 0 1 2 2v.865c2.886.704 5.147 1.044 7.353 1.044c2.203.001 4.397-.336 7.147-1.035v-.874a2 2 0 0 1 2-2H34v-1.528h-.75a2 2 0 0 1-2-2v-.414l-.002-.002l-.008-.004h-.008c-5.448 1.052-9.022 1.039-14.465-.003h-.008l-.007.004z"/><path d="M19 22a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m-4.25 11.229c0-1.274 1.166-2.205 2.393-1.97c5.198.994 8.516 1.006 13.71.003c1.227-.237 2.397.694 2.397 1.97v.414H34a2 2 0 0 1 2 2v1.528a2 2 0 0 1-2 2h-.75v.878a1.99 1.99 0 0 1-1.498 1.931c-2.854.727-5.224 1.101-7.65 1.1c-2.424 0-4.856-.376-7.834-1.103a1.99 1.99 0 0 1-1.518-1.936v-.87H14a2 2 0 0 1-2-2v-1.528a2 2 0 0 1 2-2h.75zm2 0v.417a2 2 0 0 1-2 2H14v1.528h.75a2 2 0 0 1 2 2v.865c2.886.704 5.147 1.044 7.353 1.044c2.203.001 4.397-.336 7.147-1.035v-.874a2 2 0 0 1 2-2H34v-1.528h-.75a2 2 0 0 1-2-2v-.414l-.002-.002l-.008-.004h-.008c-5.448 1.052-9.022 1.039-14.465-.003h-.008l-.007.004z"/><path d="M19 35a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"/></g>
    </svg>
  )
}

function ColunaSobrecargaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M15.5 10A1.5 1.5 0 0 1 14 8.5M8.5 10A1.5 1.5 0 0 0 10 8.5M14 2v.643c0 .587 0 .88.065 1.13a2 2 0 0 0 1.16 1.336c.237.1.527.141 1.108.224c1.162.166 1.743.25 2.218.45a4 4 0 0 1 2.318 2.672C21 8.954 21 9.54 21 10.714V22M10 2v.643c0 .587 0 .88-.065 1.13a2 2 0 0 1-1.16 1.336c-.237.1-.527.141-1.108.224c-1.162.166-1.743.25-2.218.45A4 4 0 0 0 3.13 8.454C3 8.954 3 9.54 3 10.714V22m9-9v9"/><path d="M18 11.5s-.545 2.864-.497 5.727C17.535 19.127 18 22 18 22M6 11.5s.545 2.864.497 5.727C6.465 19.127 6 22 6 22"/></g>
    </svg>
  )
}

function OmbroLevantarBracoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 27a1 1 0 0 1 1-1h11.523a13 13 0 0 1 3.153.388l1.863.466a13 13 0 0 1 6.586-5.194L32 20.293v-1.39a5 5 0 0 1 1.096-3.123l3.123-3.905a1 1 0 0 1 1.417-.146l.367.302c.22.182.409.39.564.615l.43-.593a3 3 0 0 1 4.227-.635l.376.282a1 1 0 0 1 .39.942l-1 7a1 1 0 0 1-.476.716l-4.819 2.891l-3.83 5.426a13 13 0 0 1-5.792 4.573l-1.511.604l-.683.684A5 5 0 0 1 22.343 36h-1.18l-4 1.333a13 13 0 0 1-4.11.667H5a1 1 0 0 1-1-1v-1h9.053c1.182 0 2.356-.19 3.478-.564l4.153-1.385a1 1 0 0 1 .316-.05h1.343a3 3 0 0 0 2.122-.88l.828-.828q.145-.145.336-.221l1.701-.681a11 11 0 0 0 4.902-3.87l3.951-5.598a1 1 0 0 1 .303-.28l4.591-2.756l.848-5.934a1 1 0 0 0-1.31.277l-2.806 3.858a1 1 0 1 1-1.618-1.176l.712-.978a1 1 0 0 0 .144-.892l-2.39 2.987A3 3 0 0 0 34 18.903V21a1 1 0 0 1-.667.943l-4.542 1.603a11 11 0 0 0-5.667 4.543l-.276.441a1 1 0 0 1-1.09.44l-2.567-.642A11 11 0 0 0 16.523 28H4z"/>
    </svg>
  )
}

function OmbroDorNoturnaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8zm-1 5h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"/>
    </svg>
  )
}

function OmbroManguitoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m17 7l2 .5m-11 10s-3-1.5-3-5s2.5-5 7-6.5c3-1 5-2 5-4M6 16s-.5 1.385-.5 3.23C5.5 20.616 6 22 6 22m6-7l.813 1.219A4 4 0 0 0 16.14 18H19m-1-3v.01m-5 1.49V22"/>
    </svg>
  )
}

function OmbroBursiteIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M18.714 43.199a1 1 0 0 1-.904-1.087l.803-8.717l4.044 2.14l.931-5.594a1 1 0 0 1 1.973.329l-1.386 8.33l-3.846-2.034l-.527 5.729a1 1 0 0 1-1.088.904M4.706 29.753a1 1 0 0 1 .385-1.361l7.943-4.439l.549 4.757l5.443-2.54a1 1 0 1 1 .845 1.813l-7.957 3.713l-.523-4.533l-5.324 2.975a1 1 0 0 1-1.36-.385M9.355 9.552a1 1 0 0 1 1.373-.336l7.967 4.835l-3.977 2.903l5.068 3.607a1 1 0 1 1-1.16 1.63l-7.329-5.216l3.796-2.77l-5.402-3.28a1 1 0 0 1-.336-1.373m21.902-4.214a1 1 0 0 1 .81 1.158l-1.502 8.522l-3.803-2.433l-1.366 5.403a1 1 0 0 1-1.939-.49l2.046-8.094l3.613 2.313l.982-5.568a1 1 0 0 1 1.159-.811m12.597 14.025a1 1 0 0 1-.395 1.358l-7.616 4.177l-.483-4.509l-5.097 2.33a1 1 0 0 1-.832-1.82l7.621-3.482l.46 4.284l4.985-2.734a1 1 0 0 1 1.357.396m-5.19 18.126a1 1 0 0 1-1.373.336l-7.519-4.563l3.717-2.713l-4.652-3.311a1 1 0 0 1 1.16-1.63l6.912 4.92l-3.535 2.58l4.954 3.007a1 1 0 0 1 .336 1.374" clipRule="evenodd"/>
    </svg>
  )
}

function OmbroCongeladoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M256.3 21.84c-14.9 0-28.8 8.28-39.5 23.08s-17.6 35.93-17.6 59.48c0 23.5 6.9 44.6 17.6 59.4c10.7 14.9 24.6 23.1 39.5 23.1s28.8-8.2 39.5-23.1c10.7-14.8 17.6-35.9 17.6-59.4c0-23.55-6.9-44.68-17.6-59.48s-24.6-23.08-39.5-23.08m51.3 156.06c-13 16.4-31.1 27-51.3 27S218.1 194.3 205 178c-4.4.8-8.7 1.6-13.1 2.6c24 67.4 41.1 115.7 75.7 164.8c10.7-1.4 23.4-2.9 40.3-5l3.8-40.4c.8-8.7 5.6-15.7 12-20.6l-6.4-28.6l17.6-4l5.6 25.1c6.3-1.5 12.9-1.9 19.6-1.7c10.7.4 21.4 2.6 30.8 6.7c-1.9-23.5-6.7-48.7-10.7-76.2c-3.3-2.3-9.6-5.6-17.7-8.5c-10.1-3.7-22.7-7.3-35.9-10.3c-6.3-1.4-12.7-2.8-19-4m-133.1 6.8c-5.5 1.5-10.8 3-15.8 4.6c12.6 45.5 50.4 172.7 101.8 245.6c20.5-.1 40.4-1.1 60-2.8c-87.6-83.4-110-146.3-146-247.4m-32.6 10.8c-4.5 2.1-8 4.1-10 5.6c-24.1 80.3-31.2 194-16.7 289.1h49.1c-6.4-65.2-12.5-139.1 9.3-194.2c-15.1-41.8-25.8-79.2-31.7-100.5m214.4 92.6c-7.4.1-14.2 1.4-18.8 3.7c-5.3 2.6-7.5 5.2-8 10l-5.2 54.6l-7.1.9c-15.5 1.9-27.3 3.4-37.3 4.6c16.9 21.5 37.6 43.5 64.2 67.8c5-.6 10-1.2 15-1.9c10.2-1.3 16.8-5.5 22.4-11.7c5.7-6.1 9.9-14.5 13.5-23.2c14-34.2 8.7-74.5 2-89c-1.4-3.2-6-7.4-13-10.4c-6.9-3.1-15.9-5.1-24.5-5.4zm-172.5 35c-4 16.2-6 34.1-6.8 52.9c5.9-5.5 13.5-10.5 22.7-14.7c-5.6-12.6-11-25.5-15.9-38.2m23.5 54.5c-20.5 9.2-28.2 21.7-28.6 31c-.6 11.7 8.6 23 30 24.6q15.3 1.05 30 1.5c-11.3-17.4-21.8-36.9-31.4-57.1m-29.1 63.5c1 16.5 2.5 33 4.1 49.1h162.3c4-15.1 8.4-29.6 12.8-44.1c-47.5 6.1-96.4 8.9-150.1 4.9c-11.4-.9-21.3-4.5-29.1-9.9"/>
    </svg>
  )
}

function OmbroInstabilidadeIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M21.57 13a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-2a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-9.762 5.945C13.083 15.206 15.228 15 16.57 15h10c3.734 0 6.223 1.602 7.76 3.62c1.208 1.583 1.757 3.37 2 4.16l.006.019c.035.114.06.194.08.252a3 3 0 0 1-.992 3.308A3 3 0 0 1 37 29v14a1 1 0 1 1-2 0V29a1 1 0 1 0-2 0v.667a1 1 0 1 1-2 0V29c0-.957.448-1.81 1.147-2.36a3 3 0 0 1-1.422-1.691q-.069-.207-.133-.411l.013.034l-.024-.069c-.264-.829-.509-1.574-1.022-2.247a2.9 2.9 0 0 0-.988-.847v19.742a3 3 0 0 1-5.986.293L21.855 34h-.568l-.73 7.444a3 3 0 0 1-5.986-.293V26.6q-.36-.462-.689-.905c-.935-1.257-1.799-2.551-2.319-3.764c-.434-1.014-1.124-3.121.245-4.987M16.57 17c-1.285 0-2.497.237-3.15 1.127c-.683.93-.418 2.087-.02 3.017c.424.988 1.17 2.128 2.086 3.359q.407.548.87 1.136l.049.062l1.695-1.777a34 34 0 0 0-1.785-2.268a1 1 0 0 1 1.51-1.312a34 34 0 0 1 1.677 2.111L24.712 17zm10.845.034a1 1 0 0 1-.122.157L20.7 24.099c.49.672.982 1.334 1.528 2.001a3 3 0 1 1-4.644 3.8c-.32-.392-.66-.783-1.013-1.183V41.15a1 1 0 0 0 1.995.097L19.474 32h4.194l.907 9.248a1 1 0 0 0 1.996-.097V18.91l1.145.169c1.742.256 2.77 1.092 3.434 1.964c.738.968 1.07 2.014 1.323 2.81l.014.043q.069.222.135.42a1 1 0 0 0 1.897-.633l-.09-.289l-.003-.008c-.24-.777-.705-2.269-1.685-3.556c-1.067-1.4-2.736-2.585-5.325-2.797m-8.12 8.535l-1.474 1.544c.447.503.893 1.011 1.31 1.52a1 1 0 1 0 1.548-1.266a43 43 0 0 1-1.383-1.799" clipRule="evenodd"/>
    </svg>
  )
}

function QuadrilDorIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M18.714 43.199a1 1 0 0 1-.904-1.087l.803-8.717l4.044 2.14l.931-5.594a1 1 0 0 1 1.973.329l-1.386 8.33l-3.846-2.034l-.527 5.729a1 1 0 0 1-1.088.904M4.706 29.753a1 1 0 0 1 .385-1.361l7.943-4.439l.549 4.757l5.443-2.54a1 1 0 1 1 .845 1.813l-7.957 3.713l-.523-4.533l-5.324 2.975a1 1 0 0 1-1.36-.385M9.355 9.552a1 1 0 0 1 1.373-.336l7.967 4.835l-3.977 2.903l5.068 3.607a1 1 0 1 1-1.16 1.63l-7.329-5.216l3.796-2.77l-5.402-3.28a1 1 0 0 1-.336-1.373m21.902-4.214a1 1 0 0 1 .81 1.158l-1.502 8.522l-3.803-2.433l-1.366 5.403a1 1 0 0 1-1.939-.49l2.046-8.094l3.613 2.313l.982-5.568a1 1 0 0 1 1.159-.811m12.597 14.025a1 1 0 0 1-.395 1.358l-7.616 4.177l-.483-4.509l-5.097 2.33a1 1 0 0 1-.832-1.82l7.621-3.482l.46 4.284l4.985-2.734a1 1 0 0 1 1.357.396m-5.19 18.126a1 1 0 0 1-1.373.336l-7.519-4.563l3.717-2.713l-4.652-3.311a1 1 0 0 1 1.16-1.63l6.912 4.92l-3.535 2.58l4.954 3.007a1 1 0 0 1 .336 1.374" clipRule="evenodd"/>
    </svg>
  )
}

function QuadrilMarchaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor"><path fillRule="evenodd" d="M24.5 15a2.5 2.5 0 0 0 5 0v-3c0-2.15-.671-4.006-1.913-5.352A6.23 6.23 0 0 0 23 4.625a6.23 6.23 0 0 0-4.587 2.023C17.171 7.994 16.5 9.851 16.5 12a2.5 2.5 0 0 0 5 0c0-1.1.329-1.681.587-1.96A1.23 1.23 0 0 1 23 9.625c.316 0 .645.125.913.415c.258.279.587.86.587 1.96zm2 0a.5.5 0 0 0 1 0v-3c0-1.73-.534-3.076-1.383-3.995A4.23 4.23 0 0 0 23 6.625a4.23 4.23 0 0 0-3.117 1.38C19.034 8.924 18.5 10.27 18.5 12a.5.5 0 0 0 1 0c0-1.52.466-2.611 1.117-3.317A3.23 3.23 0 0 1 23 7.625c.863 0 1.73.35 2.383 1.058c.651.706 1.117 1.797 1.117 3.317z" clipRule="evenodd"/><path d="M25.86 38.836a1 1 0 0 1 .987-.836h.306a1 1 0 0 1 .986.836l.667 4A1 1 0 0 1 27.82 44h-1.64a1 1 0 0 1-.986-1.164z"/><path fillRule="evenodd" d="M27 16.366A1.53 1.53 0 0 1 26 16v21a1.53 1.53 0 0 1 1-.366c.384 0 .735.138 1 .366V16a1.53 1.53 0 0 1-1 .366M24 43a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1" clipRule="evenodd"/></g>
    </svg>
  )
}

function QuadrilArtroseIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M9.9 22.075q-1.1 0-1.925-.687T6.95 19.6q-.075-.45-.337-.737t-.763-.288q-.075 0-.15.013t-.125.012q-1.4.275-2.488-.638T2 15.625q0-1.05.688-1.9t1.812-1.05l2.95-.525l3.325-4.775q-.35-.35-.55-.825t-.2-.975q0-1.05.7-1.763T12.45 3.1q.65 0 1.1.237t.65.388q.225.175.513.25t.637.1q.2-.625.637-1.1t1.038-.7q1.1-.425 2.125.063t1.425 1.537L21.85 7.4q.425 1.15-.1 2.163t-1.5 1.337q-.9.3-1.725.063T17.15 10.1h-.925l-3.875 5.525l.525 2.9q.275 1.4-.637 2.475T9.9 22.075m0-2q.475 0 .788-.362t.212-.813l-.6-3.325q-.05-.2 0-.387t.175-.363l4.1-5.875q.275-.4.713-.625t.937-.225l-.725-2q-.75.025-1.375-.175T13 5.35q-.175-.125-.3-.187t-.25-.063q-.2 0-.312.15t-.113.325q0 .1.038.2t.087.175q.325.325.475.688t.15.737q0 .325-.088.613t-.287.562l-3.575 5.125q-.125.175-.287.263t-.363.137l-3.35.575q-.35.05-.587.338T4 15.625q0 .5.375.8t.825.225q.175-.05.338-.062t.312-.013q.575 0 1.088.188t.912.537t.675.838t.375 1.112q.075.35.363.588t.637.237M19.5 9.05q.3-.125.438-.4t.012-.55L18.7 4.6q-.1-.3-.387-.437t-.588-.013q-.275.1-.413.375t-.037.575l1.275 3.5q.125.275.4.413t.55.037m-.875-2.475"/>
    </svg>
  )
}

function QuadrilBursiteIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M13.5 13q.425 0 .713-.288T14.5 12q0-.175-.038-.312t-.112-.263q.275-.1.463-.35T15 10.5q0-.425-.287-.712T14 9.5q-.325 0-.575.175t-.35.475L9.425 8.4q.05-.1.063-.2T9.5 8q0-.425-.288-.712T8.5 7t-.712.288T7.5 8q0 .15.05.288t.125.262q-.275.1-.475.35t-.2.6q0 .425.288.712T8 10.5q.35 0 .6-.187t.35-.488l3.65 1.75l-.1.425q0 .425.288.713T13.5 13m-3.65 9q-.4-1.175-.6-2.312T9 17.538t-.012-1.863t.112-1.45q-.025 0 0 0q-.55-.125-1.262-.312T6.313 13.4t-1.663-.787T2.975 11.5l1.25-1.75q.975.875 2.038 1.388t1.962.8t1.5.375l.6.087q.45.025.713.375t.187.8l-.112.838q-.113.837-.125 2.087t.187 2.725T12 22zM19 22h-2V11.425q0-1.2-.638-2.175T14.65 7.775L7.825 4.7L9.05 3.025l6.425 2.925q1.6.725 2.563 2.2T19 11.425zm-7 0q-.625-1.3-.825-2.775t-.187-2.725t.125-2.087l.112-.838q.075-.45-.187-.8t-.713-.375l-.6-.088q-.6-.087-1.5-.374t-1.962-.8T4.225 9.75q.975.875 2.038 1.388t1.962.8t1.5.374l.6.088q.45.025.713.375t.187.8l-.112.838q-.113.837-.125 2.087t.187 2.725T12 22"/>
    </svg>
  )
}

function QuadrilEscadasIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M6 18h4.425v-3.325H13V11.35h2.575V8H18V6h-4.425v3.325H11v3.325H8.425V16H6zm-1 3q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/>
    </svg>
  )
}

function QuadrilTraumaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M21.57 13a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-2a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-9.762 5.945C13.083 15.206 15.228 15 16.57 15h10c3.734 0 6.223 1.602 7.76 3.62c1.208 1.583 1.757 3.37 2 4.16l.006.019c.035.114.06.194.08.252a3 3 0 0 1-.992 3.308A3 3 0 0 1 37 29v14a1 1 0 1 1-2 0V29a1 1 0 1 0-2 0v.667a1 1 0 1 1-2 0V29c0-.957.448-1.81 1.147-2.36a3 3 0 0 1-1.422-1.691q-.069-.207-.133-.411l.013.034l-.024-.069c-.264-.829-.509-1.574-1.022-2.247a2.9 2.9 0 0 0-.988-.847v19.742a3 3 0 0 1-5.986.293L21.855 34h-.568l-.73 7.444a3 3 0 0 1-5.986-.293V26.6q-.36-.462-.689-.905c-.935-1.257-1.799-2.551-2.319-3.764c-.434-1.014-1.124-3.121.245-4.987M16.57 17c-1.285 0-2.497.237-3.15 1.127c-.683.93-.418 2.087-.02 3.017c.424.988 1.17 2.128 2.086 3.359q.407.548.87 1.136l.049.062l1.695-1.777a34 34 0 0 0-1.785-2.268a1 1 0 0 1 1.51-1.312a34 34 0 0 1 1.677 2.111L24.712 17zm10.845.034a1 1 0 0 1-.122.157L20.7 24.099c.49.672.982 1.334 1.528 2.001a3 3 0 1 1-4.644 3.8c-.32-.392-.66-.783-1.013-1.183V41.15a1 1 0 0 0 1.995.097L19.474 32h4.194l.907 9.248a1 1 0 0 0 1.996-.097V18.91l1.145.169c1.742.256 2.77 1.092 3.434 1.964c.738.968 1.07 2.014 1.323 2.81l.014.043q.069.222.135.42a1 1 0 0 0 1.897-.633l-.09-.289l-.003-.008c-.24-.777-.705-2.269-1.685-3.556c-1.067-1.4-2.736-2.585-5.325-2.797m-8.12 8.535l-1.474 1.544c.447.503.893 1.011 1.31 1.52a1 1 0 1 0 1.548-1.266a43 43 0 0 1-1.383-1.799" clipRule="evenodd"/>
    </svg>
  )
}

function QuadrilNervoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M25.45 8.123a1 1 0 0 1-.5 1.323A5 5 0 0 0 22 13.99v.035a5 5 0 0 0 9.971.521a1 1 0 1 1 1.989.213a6.97 6.97 0 0 1-1.71 3.878a7 7 0 0 1 3.784 2.286a1 1 0 1 1-1.52 1.3a5 5 0 0 0-8.247 5.542a2.41 2.41 0 0 1 2.143.811q.38.441.69.897a2.4 2.4 0 0 1 .409 1.62c.455.283.82.718 1.007 1.265c.223.652.392 1.283.533 1.833a2.4 2.4 0 0 1-.015 1.252c.262.23.478.52.624.863c.102.237.172.322.19.34q.101.073.193.153q.281-.11.594-.15q.267-.03.626-.108a2.41 2.41 0 0 1 2.218.65c.429-.258.744-.642.9-1.115c.2-.602.182-1.471-.392-2.584a1 1 0 0 1 1.778-.917c.407.79.64 1.566.709 2.302c.61-.724 1.252-1.702 1.778-2.992a1 1 0 1 1 1.852.755c-.626 1.535-1.403 2.71-2.152 3.587c.487.057 1 .177 1.554.37a1 1 0 0 1-.656 1.89c-.994-.346-1.702-.36-2.39-.216c-.642.133-1.274.396-2.155.765l-.126.053a2.41 2.41 0 0 1-1.892 2.166q-.554.121-1.077.185a2.4 2.4 0 0 1-1.879-.582a2.41 2.41 0 0 1-2.273-.276c-.954-.673-1.495-1.584-1.836-2.38a2.4 2.4 0 0 1-.104-1.602a2.4 2.4 0 0 1-.743-1.214a19 19 0 0 0-.422-1.462a2.4 2.4 0 0 1-.118-1.04a2.4 2.4 0 0 1-.715-.686a5 5 0 0 0-.357-.463a2.41 2.41 0 0 1-.262-2.793A4.98 4.98 0 0 0 21 27.512c-1.6 0-3.024.75-3.939 1.92a7 7 0 0 1-.212.29a5 5 0 0 0-.849 2.79c0 .953.266 1.84.727 2.597a1 1 0 0 1-1.708 1.04a6.97 6.97 0 0 1-.994-4.236a7.03 7.03 0 0 1-4.154.41a1 1 0 0 1 .404-1.959q.492.102 1.016.103c1.6 0 3.024-.75 3.939-1.92q.102-.149.212-.29a5 5 0 0 0-7.854-6.148a1 1 0 0 1-1.481-1.345a7 7 0 0 1 3.643-2.126a7 7 0 0 1-1.694-3.744a1 1 0 0 1 1.984-.251a5.001 5.001 0 0 0 9.96-.618v-.035a5 5 0 0 0-2.864-4.505a1 1 0 1 1 .855-1.808A7.03 7.03 0 0 1 21 10.4a7.03 7.03 0 0 1 3.128-2.778a1 1 0 0 1 1.322.501m-7.184 17.943A7 7 0 0 1 21 25.512c.97 0 1.894.197 2.734.554a6.97 6.97 0 0 1 1.724-5.229A7 7 0 0 1 21 17.615a7 7 0 0 1-4.459 3.222a6.97 6.97 0 0 1 1.725 5.229M21 22.012a.5.5 0 1 0 0 .998a.5.5 0 0 0 0-.998m-2.5.499a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0m9.416 10.369l.12-.147l.19-.004a.41.41 0 0 1 .398.279c.197.574.35 1.142.487 1.678a.41.41 0 0 1-.13.415l-.14.123l-.187-.027a.41.41 0 0 1-.341-.306a21 21 0 0 0-.469-1.616a.41.41 0 0 1 .072-.395m1.58 3.965l-.184-.026l-.143.123a.41.41 0 0 0-.108.474c.26.607.61 1.15 1.15 1.533a.41.41 0 0 0 .567-.087l.128-.17l-.063-.203a.4.4 0 0 0-.155-.214c-.37-.261-.643-.654-.869-1.183a.41.41 0 0 0-.322-.247m3.098 1.95l-.128.17l.063.204a.414.414 0 0 0 .443.285a10 10 0 0 0 .89-.153a.412.412 0 0 0-.176-.805q-.439.095-.812.14a.4.4 0 0 0-.28.16m-5.474-7.547l.19-.004l.12-.148a.41.41 0 0 0 .02-.493a8 8 0 0 0-.552-.717a.412.412 0 1 0-.623.54q.27.314.495.642a.41.41 0 0 0 .35.18m4.732 5.402l-.003-.002z" clipRule="evenodd"/>
    </svg>
  )
}

function PunhoFormigamentoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M25.45 8.123a1 1 0 0 1-.5 1.323A5 5 0 0 0 22 13.99v.035a5 5 0 0 0 9.971.521a1 1 0 1 1 1.989.213a6.97 6.97 0 0 1-1.71 3.878a7 7 0 0 1 3.784 2.286a1 1 0 1 1-1.52 1.3a5 5 0 0 0-8.247 5.542a2.41 2.41 0 0 1 2.143.811q.38.441.69.897a2.4 2.4 0 0 1 .409 1.62c.455.283.82.718 1.007 1.265c.223.652.392 1.283.533 1.833a2.4 2.4 0 0 1-.015 1.252c.262.23.478.52.624.863c.102.237.172.322.19.34q.101.073.193.153q.281-.11.594-.15q.267-.03.626-.108a2.41 2.41 0 0 1 2.218.65c.429-.258.744-.642.9-1.115c.2-.602.182-1.471-.392-2.584a1 1 0 0 1 1.778-.917c.407.79.64 1.566.709 2.302c.61-.724 1.252-1.702 1.778-2.992a1 1 0 1 1 1.852.755c-.626 1.535-1.403 2.71-2.152 3.587c.487.057 1 .177 1.554.37a1 1 0 0 1-.656 1.89c-.994-.346-1.702-.36-2.39-.216c-.642.133-1.274.396-2.155.765l-.126.053a2.41 2.41 0 0 1-1.892 2.166q-.554.121-1.077.185a2.4 2.4 0 0 1-1.879-.582a2.41 2.41 0 0 1-2.273-.276c-.954-.673-1.495-1.584-1.836-2.38a2.4 2.4 0 0 1-.104-1.602a2.4 2.4 0 0 1-.743-1.214a19 19 0 0 0-.422-1.462a2.4 2.4 0 0 1-.118-1.04a2.4 2.4 0 0 1-.715-.686a5 5 0 0 0-.357-.463a2.41 2.41 0 0 1-.262-2.793A4.98 4.98 0 0 0 21 27.512c-1.6 0-3.024.75-3.939 1.92a7 7 0 0 1-.212.29a5 5 0 0 0-.849 2.79c0 .953.266 1.84.727 2.597a1 1 0 0 1-1.708 1.04a6.97 6.97 0 0 1-.994-4.236a7.03 7.03 0 0 1-4.154.41a1 1 0 0 1 .404-1.959q.492.102 1.016.103c1.6 0 3.024-.75 3.939-1.92q.102-.149.212-.29a5 5 0 0 0-7.854-6.148a1 1 0 0 1-1.481-1.345a7 7 0 0 1 3.643-2.126a7 7 0 0 1-1.694-3.744a1 1 0 0 1 1.984-.251a5.001 5.001 0 0 0 9.96-.618v-.035a5 5 0 0 0-2.864-4.505a1 1 0 1 1 .855-1.808A7.03 7.03 0 0 1 21 10.4a7.03 7.03 0 0 1 3.128-2.778a1 1 0 0 1 1.322.501m-7.184 17.943A7 7 0 0 1 21 25.512c.97 0 1.894.197 2.734.554a6.97 6.97 0 0 1 1.724-5.229A7 7 0 0 1 21 17.615a7 7 0 0 1-4.459 3.222a6.97 6.97 0 0 1 1.725 5.229M21 22.012a.5.5 0 1 0 0 .998a.5.5 0 0 0 0-.998m-2.5.499a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0m9.416 10.369l.12-.147l.19-.004a.41.41 0 0 1 .398.279c.197.574.35 1.142.487 1.678a.41.41 0 0 1-.13.415l-.14.123l-.187-.027a.41.41 0 0 1-.341-.306a21 21 0 0 0-.469-1.616a.41.41 0 0 1 .072-.395m1.58 3.965l-.184-.026l-.143.123a.41.41 0 0 0-.108.474c.26.607.61 1.15 1.15 1.533a.41.41 0 0 0 .567-.087l.128-.17l-.063-.203a.4.4 0 0 0-.155-.214c-.37-.261-.643-.654-.869-1.183a.41.41 0 0 0-.322-.247m3.098 1.95l-.128.17l.063.204a.414.414 0 0 0 .443.285a10 10 0 0 0 .89-.153a.412.412 0 0 0-.176-.805q-.439.095-.812.14a.4.4 0 0 0-.28.16m-5.474-7.547l.19-.004l.12-.148a.41.41 0 0 0 .02-.493a8 8 0 0 0-.552-.717a.412.412 0 1 0-.623.54q.27.314.495.642a.41.41 0 0 0 .35.18m4.732 5.402l-.003-.002z" clipRule="evenodd"/>
    </svg>
  )
}

function PunhoTunelCarpoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12.8 23q-2.05 0-3.85-.937T6 19.45L1.2 12.4l.475-.475q.5-.525 1.238-.6t1.337.35l2.75 1.9V4q0-.425.288-.712T8 3t.713.288T9 4v13.425L5.3 14.85l2.375 3.45q.875 1.275 2.225 1.988t2.9.712q2.575 0 4.388-1.812T19 14.8V5q0-.425.288-.712T20 4t.713.288T21 5v9.8q0 3.425-2.387 5.813T12.8 23M11 12V2q0-.425.288-.712T12 1t.713.288T13 2v10zm4 0V3q0-.425.288-.712T16 2t.713.288T17 3v9zm-2.85 4.5"/>
    </svg>
  )
}

function PunhoDedoGatilhoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M9.5 2a2.5 2.5 0 0 1 2.495 2.336L12 4.5v4.605l5.442.605a4 4 0 0 1 3.553 3.772l.005.203V14a8 8 0 0 1-7.75 7.996L13 22h-.674a8 8 0 0 1-7.024-4.171l-.131-.251l-2.842-5.684c-.36-.72-.093-1.683.747-2.028c1.043-.427 2.034-.507 3.055.012q.333.17.654.414l.215.17V4.5A2.5 2.5 0 0 1 9.5 2m0 2a.5.5 0 0 0-.492.41L9 4.5V13a1 1 0 0 1-1.78.625l-.332-.407l-.303-.354c-.58-.657-1.001-1.02-1.36-1.203a1.2 1.2 0 0 0-.694-.137l-.141.02l2.57 5.14a6 6 0 0 0 5.123 3.311l.243.005H13a6 6 0 0 0 5.996-5.775L19 14v-.315a2 2 0 0 0-1.621-1.964l-.158-.024l-5.442-.604a2 2 0 0 1-1.773-1.829L10 9.105V4.5a.5.5 0 0 0-.5-.5M4 6a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm12-1a1 1 0 0 1 .117 1.993L16 7h-1a1 1 0 0 1-.117-1.993L15 5zM4.707 1.293l1 1a1 1 0 0 1-1.414 1.414l-1-1a1 1 0 0 1 1.414-1.414m11 0a1 1 0 0 1 0 1.414l-1 1a1 1 0 1 1-1.414-1.414l1-1a1 1 0 0 1 1.414 0"/></g>
    </svg>
  )
}

function PunhoTraumaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4.5a1 1 0 0 1 5 0a.5.5 0 0 0 .5.5a1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5M16 20l-1-2m5-2l-2-1M4 8l2 1m2-5l1 2m.698 8.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0a.495.495 0 0 0-.5-.5a1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z"/>
    </svg>
  )
}

function PunhoDeQuervainIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M11 21.9L6.1 17H1v-2h5.9l3.45 3.425L8.875 15.5H20q.425 0 .713.288T21 16.5t-.288.713T20 17.5h-7.875l.15.3q.425.875.263 1.813t-.838 1.612zM1 9V7h4.6l1.1-1.125q.425-.425.975-.65T8.825 5H19q.425 0 .713.288T20 6t-.288.713T19 7H8.825q-.2 0-.375.088t-.325.212L6.4 9zm13 5v-2h8q.425 0 .713.288T23 13t-.288.713T22 14zm0-3.5v-2h7q.425 0 .713.288T22 9.5t-.288.713T21 10.5z"/>
    </svg>
  )
}

function PunhoArtroseIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4.575 14.5q-.2.1-.413.013t-.287-.288l-.75-2q-.125-.35-.112-.687t.312-.463q.625-.25 1.163.175t.812 1.1l.4 1.075q.075.2.013.363t-.238.262zm6.25 7.5q-.425 0-.837-.175t-.688-.5L5.25 16.65q-.275-.325-.25-.725t.35-.675t.725-.237t.675.337L9 17.925q0-.2.05-.387t.15-.388l-1.15-3.3q-.125-.4.05-.775t.575-.5t.775.05t.5.575l.975 2.8h.575v-3q0-.425.288-.712T12.5 12t.713.288t.287.712v3h.6l.525-2.225q.1-.425.438-.638t.762-.112t.638.438t.112.762l-.4 1.775q.125.025.263.05t.262.075l.375-.975q.15-.4.525-.575t.775-.025q.375.15.537.525t.013.775L18 18.3V20q0 .825-.588 1.413T16 22zM7.775 6.525q-.2.025-.363-.112t-.187-.338L7 4.1q-.05-.425.213-.737T7.9 3t.738.213T9 3.9l.2 1.975q.025.2-.112.363t-.338.187zm.55 5.1q-.225.05-.412-.075T7.7 11.2l-.3-2.6q-.05-.425.213-.737T8.3 7.5t.738.213t.362.687l.275 2.425q.025.2-.075.35t-.3.2zM11 20h5v-2h-5zm1-9q-.2 0-.35-.15t-.15-.35V8q0-.425.288-.712T12.5 7t.713.288T13.5 8v2.5q0 .2-.15.35T13 11zm0-5q-.2 0-.35-.15t-.15-.35V3q0-.425.288-.712T12.5 2t.713.288T13.5 3v2.5q0 .2-.15.35T13 6zm4.375 6.15l-1-.25q-.2-.05-.3-.2T15 11.35l.275-2.45q.05-.425.363-.687T16.375 8t.688.363t.212.737L17 11.725q-.025.225-.212.35t-.413.075m.575-5.025l-1-.1q-.2-.025-.337-.188t-.113-.362l.2-1.975q.05-.425.363-.687T16.8 3.6t.688.363t.212.737l-.2 1.975q-.025.2-.187.338t-.363.112m2 6.625l-.975-.3q-.2-.05-.288-.225t-.037-.375l.375-1.4q.125-.4.475-.612t.75-.088t.6.462t.1.738l-.375 1.45q-.05.2-.238.3t-.387.05M20 9.975l-.975-.25q-.2-.05-.3-.238t-.05-.387L19 7.95q.175-.6.425-1.125t.775-.4q.625.15.75.825t-.075 1.4l-.275.975q-.05.2-.225.3t-.375.05M11 20h5z"/>
    </svg>
  )
}

function PunhoPreensaoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 12V2q0-.425.288-.712T13 1t.713.288T14 2v10zm-4 0V3q0-.425.288-.712T9 2t.713.288T10 3v9zm4.5 11q-3.55 0-6.025-2.475T4 14.5V5q0-.425.288-.712T5 4t.713.288T6 5v9.5q0 2.725 1.888 4.613T12.5 21t4.613-1.888T19 14.5V11q-.425 0-.712.288T18 12v4h-3q-.825 0-1.412.588T13 18v1h-2v-1q0-1.65 1.175-2.825T15 14h1V4q0-.425.288-.712T17 3t.713.288T18 4v5.175q.25-.075.488-.125T19 9h2v5.5q0 3.55-2.475 6.025T12.5 23m1-8"/>
    </svg>
  )
}

function PeFasciteIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.934 6.235A3.644 3.644 0 0 0 6.5 9.792a4.79 4.79 0 0 0 2.646 4.281A6.07 6.07 0 0 1 12.5 19.5a3.75 3.75 0 0 0 7.5 0v-6.437a6 6 0 0 0-4.7-5.857zM3.5 3A2.25 2.25 0 1 0 8 3a2.25 2.25 0 0 0-4.5 0m7.5-.75a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0m6 1.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0"/>
    </svg>
  )
}

function PeEntorseIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M221.313 16a23.682 23.695 0 0 0-23.688 23.688v106.406a23.682 23.695 0 0 0 2.156 9.72a23.682 23.695 0 0 0 3.157 13.81l41.75 71.626l-79 55.438l6.094-48.625a23.682 23.695 0 0 0-8.186-20.97l-66.28-81.937a23.682 23.695 0 0 0-33.314-3.5l-9.188 7.438a23.682 23.695 0 0 0-3.53 33.344l59.78 73.906l-11.25 89.937a23.682 23.695 0 0 0 12.47 23.876l37.468 53.47a23.695 23.682 1.57 0 0 2.344 2.812a23.682 23.695 0 0 0 13.594 20.062L262 491.53a23.682 23.695 0 0 0 9.97 2.22a23.682 23.695 0 0 0 23.53-2.063l87.156-60.937a23.682 23.695 0 0 0 5.844-33l-6.78-9.688a23.682 23.695 0 0 0-32.97-5.875l-72.406 50.657l-59.063-27.625l120.595-84.626a23.695 23.682 1.57 0 0 5.53-5.5a23.682 23.695 0 0 0 14.626-13.594l37.22-91.53l87.813-44.845a23.694 23.682 1.18 0 0 10.312-31.875L488 122.687a23.694 23.682 1.18 0 0-31.875-10.343l-94.688 48.375a23.694 23.682 1.18 0 0-9.843 9.436a23.682 23.695 0 0 0-8.344 10.47l-27.375 67.31l-5.22-7.436a23.682 23.695 0 0 0-3-8.844l-50.81-87.094V39.688A23.682 23.695 0 0 0 233.154 16h-11.843zM77.75 376A59.994 60 0 0 0 16 436a59.994 60 0 1 0 120 0a59.994 60 0 0 0-58.25-60"/>
    </svg>
  )
}

function PeAquilesIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor"><path d="M21.827 8.576C22.71 7.034 23 5.512 23 4h2c0 1.788-.348 3.67-1.438 5.571c-1.086 1.893-2.87 3.743-5.643 5.538c-2.56 1.657-2.87 2.888-2.705 3.714c.1.492.392 1.029.893 1.616c.498.585 1.152 1.165 1.89 1.748c3.263 2.58 4.55 5.847 5.64 8.614l.055.141c1.13 2.869 2.04 5.015 4.38 6.16c1.122.549 2.641.898 4.792.898c.209 0 .612-.11 1.099-.39c.469-.268.898-.629 1.175-.987c.295-.383.299-.6.285-.66c-.003-.014-.056-.262-.768-.525c-4.144-1.524-6.414-4.144-7.226-7.464c-.79-3.234-.162-6.99 1.124-10.794c.369-1.092 1.018-2.317 1.744-3.546a105 105 0 0 1 1.794-2.886l.002-.003l.563-.888c.792-1.253 1.517-2.439 2.045-3.488c.546-1.085.799-1.873.799-2.369h2c0 1.004-.455 2.159-1.012 3.268c-.576 1.145-1.35 2.405-2.141 3.657l-.579.912l-.003.005c-.608.956-1.208 1.9-1.746 2.81c-.712 1.205-1.272 2.282-1.572 3.168c-1.241 3.674-1.732 6.994-1.075 9.679c.635 2.598 2.379 4.74 5.973 6.063c1.032.38 1.82 1.014 2.031 1.969c.2.904-.206 1.731-.654 2.313c-.467.605-1.113 1.128-1.763 1.501c-.632.363-1.39.655-2.096.655c-2.36 0-4.2-.383-5.67-1.102c-3.116-1.524-4.26-4.424-5.338-7.164l-.032-.08c-1.112-2.822-2.228-5.653-5.067-7.898c-.778-.615-1.55-1.29-2.172-2.02c-.619-.727-1.14-1.567-1.33-2.519c-.414-2.06.79-3.982 3.579-5.787c2.577-1.668 4.105-3.303 4.994-4.854"/><path d="M22.947 14.634a1 1 0 0 1-.11 1.41c-.6.513-1.066.991-1.28 1.476c-.168.383-.214.835.245 1.503a1 1 0 0 1-1.648 1.133c-.838-1.22-.885-2.403-.427-3.443c.413-.937 1.201-1.669 1.81-2.19a1 1 0 0 1 1.41.11m-11.002 6.039a1 1 0 0 0-1.945.35v1.956a1 1 0 0 0 .055.35c.503 1.447 1.048 2.481 1.638 3.276c.594.8 1.204 1.319 1.774 1.753q.202.155.396.298c.915.68 1.681 1.249 2.446 2.79c.394.794.637 1.785.931 2.983l.092.374c.324 1.313.72 2.802 1.47 4.177c.762 1.4 1.89 2.68 3.658 3.596c1.725.894 3.995 1.41 7.014 1.425H34a1 1 0 1 0 0-2h-.022c-.674-.002-1.917-.081-3.122-.185c-1.233-.105-2.315-.227-2.66-.296c-3.365-.673-5.362-2.785-6.79-5.322c-.72-1.279-1.283-2.645-1.8-3.973l-.278-.72c-.405-1.057-.802-2.09-1.228-2.949c-.984-1.982-2.093-2.803-3.052-3.512q-.188-.139-.367-.275c-.495-.378-.944-.766-1.382-1.356c-.442-.596-.902-1.437-1.354-2.74"/></g>
    </svg>
  )
}

function PeInchacoIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" d="M2.588 19.413Q2 18.825 2 18v-1q0-.825.588-1.412T4 15t1.413.588T6 17v1q0 .825-.587 1.413T4 20t-1.412-.587M21.05 20H19.5q-.25 0-.4-.187t-.1-.438l.275-1.075q.05-.2.2-.312t.35-.063l1.35.2q.35.05.588.313t.237.612q0 .4-.275.675T21.05 20m-3.7-.35l-2.85-.95q-.2-.075-.3-.275t0-.4l.75-1.725q.1-.2.313-.288t.412.038l2.4 1.4q.15.075.213.225T18.3 18l-.3 1.3q-.05.2-.25.313t-.4.037M12.7 17.9l-1.95-.5q-.35-.1-.55-.362t-.2-.613V15.5q0-.575.2-1.075t.675-.8q.125-.075.25-.088t.25.063l2.55 1.4q.175.1.238.288t-.013.362l-.875 1.975q-.075.175-.238.25t-.337.025M7.45 17q-.2 0-.325-.112t-.15-.288q-.175-1.125-1.013-1.863T4 14h-.5q-.2 0-.35-.15T3 13.5t.15-.35t.35-.15h.9q.5 0 .95-.125t.875-.4q.125-.075.275-.075t.275.075q.5.3 1.075.413T9 13q.3 0 .425.313t-.075.612q-.225.35-.287.75T9 15.5v1q0 .2-.15.35T8.5 17zm-3-5q-1.05 0-1.75-.687T2 9.6q0-.475.175-.925t.525-.8l1.3-1.3V5q0-.425.288-.712T5 4t.713.288T6 5v1.6q0 .4-.162.763T5.4 8L4.125 9.3q-.05.05-.088.125T4 9.575q0 .175.125.3t.3.125q.2 0 .425-.225q.35-.3.763-.487T6.5 9.1t.888.188t.762.487l.2.15q.1.075.225.075q.175 0 .3-.125t.125-.3q0-.075-.038-.15T8.876 9.3L7.6 8q-.275-.275-.437-.638T7 6.6V5q0-.425.288-.712T8 4t.713.288T9 5v1.575l1.3 1.3q.35.35.525.788t.175.912q0 1.025-.7 1.725t-1.75.7q-.475 0-.9-.2t-.775-.5q-.1-.075-.175-.138t-.2-.062q-.175 0-.375.2q-.35.3-.787.487T4.45 12M6.5 4"/>
    </svg>
  )
}

function PeSobCargaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M37.5 21.795V10h2v11.795c0 1.87.647 3.718 1.451 5.625c.563 1.336 1.05 2.965 1.05 4.58c-.001 2.349-1.055 3.905-2.446 4.832C38.219 37.722 36.633 38 35.5 38c-1.367 0-2.267-.292-3.028-.665c-.235-.115-.477-.25-.689-.367q-.14-.078-.259-.142a5 5 0 0 0-.84-.377c-.274-.092-.867-.156-1.696-.169c-.788-.012-1.67.022-2.444.067c-.847.049-1.599.35-2.52.72q-.42.17-.9.352c-.95.356-2.213.581-4.124.581c-1.983 0-2.93-.114-3.581-.393a3.7 3.7 0 0 1-.625-.357a4 4 0 0 0-.183-.117a3.4 3.4 0 0 1-.938.447c-.82.256-2.159.42-4.673.42c-.858 0-1.594-.206-2.168-.64c-.576-.437-.89-1.028-1.038-1.613c-.285-1.115-.014-2.341.27-3.098A1 1 0 0 1 7 32h3.65l.627-.502c1.165-.932 2.49-1.584 3.833-2.064c1.733-.62 3.928-1.57 5.918-2.833c1.944-1.234 3.6-2.71 4.495-4.388l.982-10.308l1.99.19l-1 10.5a1 1 0 0 1-.1.352c-1.108 2.215-3.158 3.986-5.295 5.343c-2.153 1.367-4.494 2.375-6.317 3.027c-1.2.43-2.312.987-3.257 1.742l-.627.503a2 2 0 0 1-1.25.438H7.751c-.088.434-.112.892-.02 1.253c.064.248.17.407.308.512c.142.108.42.235.961.235c2.486 0 3.564-.17 4.077-.33c.226-.07.332-.137.412-.192l.032-.024c.086-.066.318-.242.532-.348a1 1 0 0 1 .763-.055c.47.157.765.323 1.004.479l.168.111c.101.068.138.093.218.127c.224.096.777.232 2.794.232c1.762 0 2.767-.209 3.422-.454c.215-.08.443-.173.682-.27c.966-.39 2.117-.856 3.324-.926a37 37 0 0 1 2.591-.07c.816.013 1.696.07 2.297.271c.453.151.828.337 1.157.514l.342.188c.185.103.347.193.538.287c.514.252 1.114.46 2.147.46c.867 0 2.03-.222 2.945-.832C39.305 34.595 40 33.65 40 32c0-1.244-.383-2.594-.892-3.803c-.815-1.934-1.608-4.102-1.608-6.402"/><path d="M34 23a1 1 0 0 1 1 1h-1h1v.022l-.001.04q0 .047-.006.127a7.4 7.4 0 0 1-.357 1.814c-.36 1.084-1.104 2.444-2.622 3.355a1 1 0 0 1-1.029-1.716c.983-.589 1.49-1.479 1.754-2.27a5.4 5.4 0 0 0 .258-1.297l.003-.068v-.012A1 1 0 0 1 34 23"/></g>
    </svg>
  )
}

function DorArticularGenericaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M18.714 43.199a1 1 0 0 1-.904-1.087l.803-8.717l4.044 2.14l.931-5.594a1 1 0 0 1 1.973.329l-1.386 8.33l-3.846-2.034l-.527 5.729a1 1 0 0 1-1.088.904M4.706 29.753a1 1 0 0 1 .385-1.361l7.943-4.439l.549 4.757l5.443-2.54a1 1 0 1 1 .845 1.813l-7.957 3.713l-.523-4.533l-5.324 2.975a1 1 0 0 1-1.36-.385M9.355 9.552a1 1 0 0 1 1.373-.336l7.967 4.835l-3.977 2.903l5.068 3.607a1 1 0 1 1-1.16 1.63l-7.329-5.216l3.796-2.77l-5.402-3.28a1 1 0 0 1-.336-1.373m21.902-4.214a1 1 0 0 1 .81 1.158l-1.502 8.522l-3.803-2.433l-1.366 5.403a1 1 0 0 1-1.939-.49l2.046-8.094l3.613 2.313l.982-5.568a1 1 0 0 1 1.159-.811m12.597 14.025a1 1 0 0 1-.395 1.358l-7.616 4.177l-.483-4.509l-5.097 2.33a1 1 0 0 1-.832-1.82l7.621-3.482l.46 4.284l4.985-2.734a1 1 0 0 1 1.357.396m-5.19 18.126a1 1 0 0 1-1.373.336l-7.519-4.563l3.717-2.713l-4.652-3.311a1 1 0 0 1 1.16-1.63l6.912 4.92l-3.535 2.58l4.954 3.007a1 1 0 0 1 .336 1.374" clipRule="evenodd"/>
    </svg>
  )
}

const iconComponents = {
  // Icones regionais (coluna/ombro/quadril/mao-punho/pe-tornozelo) -- ver mapa-icones-gustavo.md
  colunaLombarIcon: ColunaLombarIcon,
  colunaCiaticoIcon: ColunaCiaticoIcon,
  colunaCervicalIcon: ColunaCervicalIcon,
  colunaHerniaDiscoIcon: ColunaHerniaDiscoIcon,
  colunaSobrecargaIcon: ColunaSobrecargaIcon,
  ombroLevantarBracoIcon: OmbroLevantarBracoIcon,
  ombroDorNoturnaIcon: OmbroDorNoturnaIcon,
  ombroManguitoIcon: OmbroManguitoIcon,
  ombroBursiteIcon: OmbroBursiteIcon,
  ombroCongeladoIcon: OmbroCongeladoIcon,
  ombroInstabilidadeIcon: OmbroInstabilidadeIcon,
  quadrilDorIcon: QuadrilDorIcon,
  quadrilMarchaIcon: QuadrilMarchaIcon,
  quadrilArtroseIcon: QuadrilArtroseIcon,
  quadrilBursiteIcon: QuadrilBursiteIcon,
  quadrilEscadasIcon: QuadrilEscadasIcon,
  quadrilTraumaIcon: QuadrilTraumaIcon,
  quadrilNervoIcon: QuadrilNervoIcon,
  punhoFormigamentoIcon: PunhoFormigamentoIcon,
  punhoTunelCarpoIcon: PunhoTunelCarpoIcon,
  punhoDedoGatilhoIcon: PunhoDedoGatilhoIcon,
  punhoTraumaIcon: PunhoTraumaIcon,
  punhoDeQuervainIcon: PunhoDeQuervainIcon,
  punhoArtroseIcon: PunhoArtroseIcon,
  punhoPreensaoIcon: PunhoPreensaoIcon,
  peFasciteIcon: PeFasciteIcon,
  peEntorseIcon: PeEntorseIcon,
  peAquilesIcon: PeAquilesIcon,
  peInchacoIcon: PeInchacoIcon,
  peSobCargaIcon: PeSobCargaIcon,
  dorArticularGenericaIcon: DorArticularGenericaIcon,
  activity: Pulse,
  alert: Warning,
  arrow: ArrowUp,
  badgeCheck: SealCheck,
  bandage: Bandaids,
  bone: Bone,
  building: Buildings,
  check: CheckCircle,
  chevronDown: CaretDown,
  chevronUp: CaretUp,
  clipboardCheck: ListChecks,
  clipboardList: ClipboardText,
  clock: Clock,
  creditCard: CreditCard,
  dumbbell: Barbell,
  drop: Drop,
  dna: Dna,
  exam: Exam,
  fire: FireSimple,
  firstAid: FirstAidKit,
  footprints: Footprints,
  graduation: GraduationCap,
  hand: HandPalm,
  handHeart: HandHeart,
  hospital: Hospital,
  idBadge: IdentificationBadge,
  mapPinned: MapPinArea,
  map: MapTrifold,
  menu: List,
  needle: Needle,
  personArms: PersonArmsSpread,
  pulse: Pulse,
  rehab: SneakerMove,
  running: PersonSimpleRun,
  walking: PersonSimpleWalk,
  radio: Broadcast,
  shieldCheck: ShieldCheck,
  sparkles: ShootingStar,
  spine: HealthSpineIcon,
  stairs: Stairs,
  stethoscope: Stethoscope,
  strategy: Strategy,
  syringe: Syringe,
  target: CrosshairSimple,
  thermometer: ThermometerHot,
  whatsapp: WhatsappLogo,
  close: X,
}

function Icon({ name, className = 'h-6 w-6' }) {
  const PhosphorIcon = iconComponents[name] || CheckCircle
  const filledIcons = new Set(['whatsapp', 'check', 'close', 'menu', 'chevronDown', 'chevronUp', 'arrow'])
  return <PhosphorIcon className={className} weight={filledIcons.has(name) ? 'fill' : 'duotone'} aria-hidden="true" />
}

function Button({ children, variant = 'primary', className = '', onClick, href, source = 'cta' }) {
  const base = 'inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 py-4 text-center text-base font-black uppercase leading-tight tracking-wide transition focus-visible:outline-brand-orange sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm'
  const styles = variant === 'dark'
    ? 'bg-brand-wine text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red'
    : variant === 'outline'
      ? 'border-2 border-brand-red bg-brand-red/5 text-brand-red shadow-md shadow-brand-red/10 hover:bg-brand-red hover:text-white'
      : 'bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red-dark'

  if (href) {
    if (href.includes('wa.me')) {
      return (
        <button type="button" onClick={(event) => openLeadModal(event, source)} className={`${base} ${styles} ${className}`}>
          {children}
        </button>
      )
    }

    return (
      <a href={href} onClick={() => track('whatsapp_click', { location: source })} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }

  if (!onClick) {
    return (
      <button type="button" onClick={(event) => openLeadModal(event, source)} className={`${base} ${styles} ${className}`}>
        {children}
      </button>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  )
}

function Header({ page }) {
  const [open, setOpen] = useState(false)
  const headerLogoSpecialty = getFooterLogoSpecialty(page)
  const links = [
    ['#/', 'Início'],
    ['#/tratamentos', 'Tratamentos'],
    ['#/dr-gustavo', 'O Doutor'],
    ['#/convenios', 'Convênios'],
    ['#/blog', 'Blog'],
    ['#/contato', 'Contato'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-brand-graphite/10 bg-white/94 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#topo" className="flex items-center gap-3" aria-label="Ir para o topo">
          <FooterLogo specialty={headerLogoSpecialty} loading="eager" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-bold text-brand-gray transition hover:text-brand-red">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button source="header">Falar no WhatsApp</Button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-full p-3 text-brand-graphite lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-graphite/10 bg-white px-4 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-5" aria-label="Navegação mobile">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="text-lg font-bold text-brand-gray" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <Button className="w-full" source="mobile_menu">Falar no WhatsApp</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero({ title = 'Ortopedista em Brasília' }) {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 hero-medical-bg" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-0 max-w-7xl items-start gap-10 px-4 pb-10 pt-5 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-12">
        <div>
          <h1 className="font-display max-w-4xl text-4xl font-black leading-[0.98] text-brand-graphite sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            Dr. Gustavo Pimpão, ortopedista e traumatologista com foco em procedimentos para alívio da dor. Atendimento em 3 locais de Brasília e +40 convênios aceitos.
          </p>

          <div className="mt-7 overflow-hidden rounded-[1.75rem] bg-brand-wine shadow-soft lg:hidden">
            <img
              src="./img/dr-gustavo-portrait.webp"
              width="900"
              height="1200"
              alt="Retrato do Dr. Gustavo Pimpão"
              className="h-[430px] w-full object-cover object-[50%_38%] sm:h-[520px]"
              loading="eager"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button source="hero_primary">
              <Icon name="whatsapp" />
              Agendar pelo WhatsApp
            </Button>
            <Button variant="outline" onClick={scrollToConvenios}>
              Ver convênios aceitos
            </Button>
          </div>

        </div>

        <div className="relative hidden lg:block">
          <div className="relative z-10 overflow-hidden rounded-[2rem] bg-brand-wine shadow-soft">
            <img
              src="./img/dr-gustavo-portrait.webp"
              width="900"
              height="1200"
              alt="Retrato do Dr. Gustavo Pimpão"
              className="h-[560px] w-full object-cover object-[50%_42%]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function getProofItems(
  painText = 'Infiltrações, bloqueios e radiofrequência',
  formationText = 'Residência, membro da SBOT e formação complementar',
) {
  return [
    { title: 'Locais', text: 'Águas Claras, Asa Sul e Taguatinga', icon: 'mapPinned' },
    { title: 'Convênios', text: '+40 planos aceitos', icon: 'creditCard' },
    { title: 'Focos', text: painText, icon: 'target' },
    { title: 'Formação', text: formationText, icon: 'graduation' },
  ]
}

function ProofBar({
  painText = 'Infiltrações, bloqueios e radiofrequência',
  formationText = 'Residência, membro da SBOT e formação complementar',
  className = '',
}) {
  return (
    <section className={`border-y border-brand-graphite/10 bg-white ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {getProofItems(painText, formationText).map(({ title, text, icon }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white">
              <Icon name={icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{title}</p>
              <p className="text-sm font-bold text-brand-graphite">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PainSection() {
  return (
    <section id="dores" className="section-photo-bg section-photo-bg--ortopedia bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Quando procurar</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            Dor não precisa virar rotina antes de você investigar.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">
            Se você sente dor e precisa decidir com rapidez, o cuidado começa por uma avaliação criteriosa: primeiro vem o diagnóstico, depois a conduta.
          </p>
          <Button className="mt-8">Quero avaliar meu caso</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {problemSigns.map((item) => (
            <div key={item.text} className="rounded-3xl border border-brand-graphite/10 bg-brand-cream p-5">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                <Icon name={item.icon} />
              </span>
              <p className="text-base font-black leading-snug text-brand-graphite">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApproachSection() {
  return (
    <section id="abordagem" className="bg-brand-wine py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Abordagem</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Um caminho claro entre sintoma, diagnóstico e próxima decisão.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              A consulta busca organizar sintomas, exames e objetivos para reduzir dúvidas e orientar o próximo passo com segurança.
            </p>
            <div className="mt-8 rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-soft">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-orange">Linha de cuidado</p>
              <p className="mt-3 text-base font-bold leading-relaxed text-white/85">
                A conduta não começa pelo procedimento. Ela começa por entender a dor, o contexto e o que faz sentido para o seu caso.
              </p>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-soft sm:p-6 lg:p-8">
            <div className="absolute bottom-10 left-8 top-10 hidden w-px bg-gradient-to-b from-brand-orange via-white/25 to-brand-orange/40 sm:block" aria-hidden="true" />

            <div className="space-y-4">
              {approach.map((item, index) => (
                <article key={item.step} className="relative rounded-[1.75rem] border border-white/14 bg-white/[0.10] p-5 backdrop-blur sm:ml-8 sm:grid sm:grid-cols-[auto_1fr] sm:gap-5 lg:p-6">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-sm font-black text-brand-wine shadow-lg shadow-brand-orange/20 sm:mb-0 sm:-ml-[3.45rem]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-orange">Etapa {item.step}</p>
                    <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProceduresSection() {
  return (
    <section id="procedimentos" className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Procedimentos e serviços</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
              Ortopedia e procedimentos para dor.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-brand-gray">
            Veja alguns procedimentos que podem ser considerados após avaliação individual. A indicação depende do diagnóstico, dos exames e dos objetivos do tratamento.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((procedure) => (
            <article key={procedure.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <Icon name={procedure.icon} />
              </span>
              <h3 className="mt-5 text-xl font-black text-brand-graphite">{procedure.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{procedure.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialistSection({ page }) {
  const specialistHighlights = [
    'Pós-graduação em Medicina do Exercício e do Esporte.',
    ['infiltracao-joelho', 'medico-especialista-joelho'].includes(page?.slug) ? 'Especialização em cirurgia do joelho.' : null,
    'Especialização em Medicina Intervencionista da Dor.',
    'Atuação em procedimentos intervencionistas para dor.',
    'Experiência em ambiente hospitalar e consultório.',
  ].filter(Boolean)

  return (
    <section id="especialista" className="specialist-bg py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-brand-wine shadow-soft">
          <img
            src="./img/dr-gustavo-sobre.webp"
            width="1000"
            height="1500"
            alt="Dr. Gustavo Pimpão em consultório"
            className="h-[620px] w-full object-cover object-[50%_34%]"
            loading="lazy"
          />
        </div>

        <div className="self-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Especialista</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            {doctor.name}
          </h2>
          <p className="mt-3 text-xl font-black text-brand-red">{doctor.crm} • {doctor.rqe}</p>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">
            Médico ortopedista e traumatologista, membro titular da Sociedade Brasileira de Ortopedia e Traumatologia, com formação em Medicina pela Universidade Católica de Brasília e residência médica em Ortopedia e Traumatologia.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {specialistHighlights.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-brand-cream p-4">
                <span className="mt-0.5 text-brand-red"><Icon name="check" className="h-5 w-5" /></span>
                <p className="text-sm font-bold leading-relaxed text-brand-graphite">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DifferentialsSection() {
  return (
    <section className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            O que ajuda você a decidir com segurança.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <Icon name={item.icon} />
              </span>
              <h3 className="text-lg font-black text-brand-graphite">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConveniosSection() {
  const [showAllConvenios, setShowAllConvenios] = useState(false)
  const mobileConvenioLimit = 10
  const mobileConvenios = showAllConvenios
    ? convenioHighlights
    : convenioHighlights.slice(0, mobileConvenioLimit)
  const hiddenConveniosCount = convenioHighlights.length - mobileConvenioLimit

  return (
    <section id="convenios" className="scroll-mt-28 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-brand-red/20 bg-brand-wine p-6 text-white shadow-soft lg:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-black">Convênios aceitos</h2>
            </div>

            <div className="sm:hidden">
              <div className="grid gap-3">
                {mobileConvenios.map((name) => (
                  <span key={name} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.12] px-4 py-2 text-center text-base font-black leading-snug text-white">
                    {name}
                  </span>
                ))}
              </div>

              {hiddenConveniosCount > 0 && (
                <button
                  type="button"
                  aria-expanded={showAllConvenios}
                  onClick={() => setShowAllConvenios((current) => !current)}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-cream px-5 py-3 text-base font-black text-brand-red-dark transition hover:bg-white"
                >
                  <span>{showAllConvenios ? 'Ver menos convênios' : 'Ver mais convênios'}</span>
                  <span aria-hidden="true">{showAllConvenios ? '↑' : '↓'}</span>
                </button>
              )}
            </div>

            <div className="hidden gap-3 sm:flex sm:flex-wrap">
              {convenioHighlights.map((name) => (
                <span key={name} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.12] px-4 py-2 text-center text-base font-black leading-snug text-white sm:text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationCarousel({ location }) {
  const images = location.images || [location.image]
  const [activeImage, setActiveImage] = useState(0)
  const totalImages = images.length
  const currentImage = images[activeImage]

  const goToPrevious = () => {
    setActiveImage((current) => (current === 0 ? totalImages - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveImage((current) => (current === totalImages - 1 ? 0 : current + 1))
  }

  return (
    <div className="relative bg-brand-graphite/5">
      <img
        src={currentImage}
        width="900"
        height="1200"
        alt={`Foto ${activeImage + 1} da unidade ${location.name}`}
        className="h-72 w-full object-cover"
        loading="lazy"
      />

      {totalImages > 1 && (
        <>
          <button
            type="button"
            aria-label={`Ver foto anterior da unidade ${location.name}`}
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-brand-red shadow-lg transition hover:bg-brand-red hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={`Ver prÃ³xima foto da unidade ${location.name}`}
            onClick={goToNext}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-brand-red shadow-lg transition hover:bg-brand-red hover:text-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2 shadow-lg">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Ver foto ${index + 1} da unidade ${location.name}`}
                onClick={() => setActiveImage(index)}
                className={`h-2.5 rounded-full transition ${activeImage === index ? 'w-6 bg-brand-red' : 'w-2.5 bg-brand-red/25 hover:bg-brand-red/55'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function LocationSection() {
  return (
    <section id="localizacao" className="section-photo-bg section-photo-bg--recepcao bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Localização</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            Atendimento em Águas Claras, Asa Sul e Taguatinga.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">
            Escolha a unidade mais conveniente e confirme agenda, convênio e cobertura pelo WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {locations.map((location) => {
            const mapQuery = encodeURIComponent(location.mapQuery)

            return (
              <article key={location.name} className="overflow-hidden rounded-[2rem] border border-brand-graphite/10 bg-brand-cream shadow-soft">
                <LocationCarousel location={location} />
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-brand-red">
                      <Icon name={location.icon} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{location.region}</p>
                      <h3 className="mt-1 text-lg font-black text-brand-graphite">{location.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-gray">{location.address}</p>
                      <p className="mt-2 text-sm font-bold text-brand-graphite">{location.note}</p>
                    </div>
                  </div>
                </div>
                <iframe
                  title={`Mapa da unidade ${location.name}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </article>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-3xl bg-brand-wine p-5 text-white/85 shadow-soft">
          <Icon name="clock" />
          <span className="text-sm font-bold">{doctor.hours}</span>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-brand-wine py-16 text-white lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">FAQ</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Perguntas frequentes antes do agendamento.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <article key={faq.q} className="overflow-hidden rounded-3xl border border-white/20 bg-white/[0.12]">
              <button
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-black"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span className="text-brand-orange">
                  <Icon name={open === index ? 'chevronUp' : 'chevronDown'} className="h-5 w-5" />
                </span>
              </button>
              {open === index && (
                <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/85">
                  {faq.a}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingHero({
  page,
  proofPainText = 'Infiltrações, bloqueios e radiofrequência',
  proofFormationText = 'Residência, membro da SBOT e formação complementar',
}) {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 hero-medical-bg" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-0 max-w-7xl items-start gap-10 px-4 pb-10 pt-5 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-12">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">{page.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-black leading-[0.98] text-brand-graphite sm:text-5xl lg:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            {page.description}
          </p>

          <div className="mt-7 grid gap-4 rounded-[1.75rem] bg-white p-5 shadow-soft lg:hidden">
            {getProofItems(proofPainText, proofFormationText).map(({ title, text, icon }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                  <Icon name={icon} className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{title}</p>
                  <p className="text-sm font-bold leading-snug text-brand-graphite">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-[1.75rem] bg-brand-wine shadow-soft lg:hidden">
            <img
              src="./img/dr-gustavo-portrait.webp"
              width="900"
              height="1200"
              alt="Retrato do Dr. Gustavo Pimpão"
              className="h-[430px] w-full object-cover object-[50%_38%] sm:h-[520px]"
              loading="eager"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button source={`${page.slug}_hero`}>
              <Icon name="whatsapp" />
              Agendar pelo WhatsApp
            </Button>
            <Button variant="outline" onClick={scrollToConvenios}>
              Ver convênios aceitos
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative z-10 overflow-hidden rounded-[2rem] bg-brand-wine shadow-soft">
            <img
              src="./img/dr-gustavo-portrait.webp"
              width="900"
              height="1200"
              alt="Retrato do Dr. Gustavo Pimpão"
              className="h-[560px] w-full object-cover object-[50%_42%]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function LandingVideoSection({ page }) {
  if (!page.video?.src) return null

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Vídeo do procedimento</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            {page.video.title}
          </h2>
          {page.video.description && (
            <p className="mt-5 text-lg leading-relaxed text-brand-gray">{page.video.description}</p>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-[430px] overflow-hidden rounded-[2rem] border border-brand-graphite/10 bg-brand-graphite shadow-soft">
          <video
            className="aspect-[9/16] h-full w-full bg-brand-graphite object-cover"
            controls
            preload="metadata"
            playsInline
          >
            <source src={page.video.src} type="video/mp4" />
            Seu navegador não conseguiu carregar o vídeo.
          </video>
        </div>
      </div>
    </section>
  )
}

function LandingSymptomsSection({ page }) {
  return (
    <section id="dores" className="section-photo-bg section-photo-bg--ortopedia bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Quando procurar</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            {page.symptomsTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">{page.symptomsIntro}</p>
          <Button className="mt-8" source={`${page.slug}_symptoms`}>Quero avaliar meu caso</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {page.symptoms.map((item) => (
            <div key={item.text} className="rounded-3xl border border-brand-graphite/10 bg-brand-cream p-5">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                <Icon name={item.icon} />
              </span>
              <p className="text-base font-black leading-snug text-brand-graphite">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingIndicationSection({ page }) {
  return (
    <section id="procedimentos" className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Indicação</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
              {page.indicationTitle}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-brand-gray">{page.indicationText}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.types.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-5 text-xl font-black text-brand-graphite">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingContextsSection({ page }) {
  return (
    <section className="section-photo-bg section-photo-bg--medical-tech bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            {page.contextsTitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {page.contexts.map((item) => (
            <article key={item.title} className="rounded-3xl border border-brand-graphite/10 bg-brand-cream p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-5 text-lg font-black text-brand-graphite">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingStepsSection({ page }) {
  return (
    <section id="abordagem" className="bg-brand-wine py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Como funciona</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">{page.stepsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              {page.stepsIntro || 'A decisão é construída por etapas: primeiro entender a causa da dor, depois definir se o procedimento realmente faz sentido.'}
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-soft sm:p-6 lg:p-8">
            <div className="absolute bottom-10 left-8 top-10 hidden w-px bg-gradient-to-b from-brand-orange via-white/25 to-brand-orange/40 sm:block" aria-hidden="true" />

            <div className="space-y-4">
              {page.steps.map((item, index) => (
                <article key={item} className="relative rounded-[1.75rem] border border-white/14 bg-white/[0.10] p-5 backdrop-blur sm:ml-8 sm:grid sm:grid-cols-[auto_1fr] sm:gap-5 lg:p-6">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-sm font-black text-brand-wine shadow-lg shadow-brand-orange/20 sm:mb-0 sm:-ml-[3.45rem]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-orange">Etapa {String(index + 1).padStart(2, '0')}</p>
                    <p className="mt-2 text-base font-bold leading-relaxed text-white/85">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LandingFAQSection({ page }) {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-brand-wine py-16 text-white lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">FAQ</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">{page.faqTitle}</h2>
        </div>

        <div className="mt-10 space-y-3">
          {page.faqs.map((faq, index) => (
            <article key={faq.q} className="overflow-hidden rounded-3xl border border-white/20 bg-white/[0.12]">
              <button
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-black"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span className="text-brand-orange">
                  <Icon name={open === index ? 'chevronUp' : 'chevronDown'} className="h-5 w-5" />
                </span>
              </button>
              {open === index && (
                <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/85">
                  {faq.a}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingFinalCTA({ page }) {
  return (
    <section className="bg-brand-cream py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-6 text-center shadow-soft lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Próximo passo</p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            {page.finalCtaTitle || 'Agende uma avaliação e entenda se a infiltração faz sentido para o seu caso.'}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
            {page.finalCtaDescription || 'Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.'}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button source={`${page.slug}_final`}>
              <Icon name="whatsapp" />
              Agendar pelo WhatsApp
            </Button>
            <Button variant="outline" onClick={scrollToConvenios}>
              Ver convênios aceitos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcedureLandingPage({ page }) {
  const proofPainText = page.proofPainText || 'Infiltrações guiadas por ultrassom'
  const proofFormationText = page.proofFormationText || 'Especialização em intervenção da dor'

  useEffect(() => {
    document.title = page.metaTitle
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', page.metaDescription)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', page.metaTitle)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', page.metaDescription)
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', page.metaTitle)
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) twitterDescription.setAttribute('content', page.metaDescription)
  }, [page])

  return (
    <div className="mobile-readable">
      <Header page={page} />
      <main>
        <LandingHero page={page} proofPainText={proofPainText} proofFormationText={proofFormationText} />
        <ProofBar painText={proofPainText} formationText={proofFormationText} className="hidden lg:block" />
        <LandingVideoSection page={page} />
        <LandingSymptomsSection page={page} />
        <LandingIndicationSection page={page} />
        <LandingContextsSection page={page} />
        <LandingStepsSection page={page} />
        <SpecialistSection page={page} />
        <DifferentialsSection />
        <ConveniosSection />
        <LocationSection />
        <LandingFAQSection page={page} />
        <LandingFinalCTA page={page} />
      </main>
      <Footer page={page} />
      <FloatingActions />
    </div>
  )
}

function getFooterLogoSpecialty(page) {
  return ['infiltracao-joelho', 'medico-especialista-joelho'].includes(page?.slug)
    ? 'Joelho e intervenção da dor'
    : 'Ortopedia e intervenção da dor'
}

function FooterLogo({ specialty, loading = 'lazy' }) {
  return (
    <div className="flex items-center gap-3">
      <img src="./img/icon.svg" alt="" className="h-14 w-14 flex-none" width="64" height="64" loading={loading} aria-hidden="true" />
      <div className="leading-none">
        <p className="text-xl font-black uppercase leading-[0.98] tracking-[0.03em] text-brand-graphite">DR. GUSTAVO PIMPÃO</p>
        <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gray">{specialty}</p>
      </div>
    </div>
  )
}

function Footer({ page }) {
  const footerLogoSpecialty = getFooterLogoSpecialty(page)

  return (
    <footer className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-brand-graphite/10 pb-8 md:grid-cols-2">
          <div>
            <FooterLogo specialty={footerLogoSpecialty} />
            <p className="mt-4 text-sm leading-relaxed text-brand-gray">
              {doctor.specialty} em Brasília. {doctor.crm} • {doctor.rqe}.
            </p>
          </div>
          <div>
            <h3 className="font-black text-brand-graphite">Endereços</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-brand-gray">
              {locations.map((location) => (
                <li key={location.name}>{location.address}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-5 text-xs text-brand-gray sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {doctor.shortName} — {doctor.crm} — {doctor.rqe}</p>
          <p>Desenvolvido por Pulso Marketing Médico</p>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const [showBottomCta, setShowBottomCta] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 800)
      setShowBottomCta(window.scrollY > 260)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Falar com a equipe pelo WhatsApp"
        onClick={(event) => openLeadModal(event, 'floating_whatsapp')}
        className="fixed bottom-28 right-4 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 sm:bottom-6 sm:h-14 sm:w-14"
      >
        <Icon name="whatsapp" />
      </button>

      {showTop && (
        <button
          type="button"
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-48 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-wine text-white shadow-2xl transition hover:scale-105 sm:bottom-24 sm:h-12 sm:w-12"
        >
          <Icon name="arrow" className="h-5 w-5" />
        </button>
      )}

      {showBottomCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-graphite/10 bg-white p-4 shadow-2xl sm:hidden">
          <Button className="w-full" source="mobile_sticky">
            <Icon name="whatsapp" />
            Agendar pelo WhatsApp
          </Button>
        </div>
      )}
    </>
  )
}

function SchemaJsonLd({ page = null }) {
  const schema = useMemo(() => {
    const pageFaqs = page?.faqs || faqs
    const procedureName = page
      ? page.title
      : 'Avaliação ortopédica, infiltrações, bloqueios e procedimentos para dor'

    const physician = {
      '@context': 'https://schema.org',
      '@type': ['Physician', 'MedicalBusiness'],
      name: doctor.name,
      alternateName: doctor.shortName,
      medicalSpecialty: 'Ortopedia e Traumatologia',
      telephone: `+${doctor.phone}`,
      image: 'https://ortopedistaaguasclaras.com.br/lp/img/dr-gustavo-portrait.webp',
      url: 'https://ortopedistaaguasclaras.com.br/lp/',
      address: locations.map((location) => ({
        '@type': 'PostalAddress',
        name: location.name,
        streetAddress: location.address,
        addressLocality: 'Brasília',
        addressRegion: 'DF',
        addressCountry: 'BR',
      })),
      memberOf: {
        '@type': 'MedicalOrganization',
        name: `${doctor.crm} • ${doctor.rqe}`,
      },
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pageFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    }

    const medicalProcedure = {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: procedureName,
      procedureType: 'Ortopedia e procedimentos intervencionistas para dor',
      performedBy: {
        '@type': 'Physician',
        name: doctor.name,
      },
    }

    return [physician, faqSchema, medicalProcedure]
  }, [page])

  return (
    <>
      {schema.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

function AgendarPage() {
  const [progress, setProgress] = useState(0)
  const [redirected, setRedirected] = useState(false)

  const redirectUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''

    const params = new URLSearchParams(window.location.search)
    const crmUrl = new URL('https://sistema.pulso.marketing/go/dr-gustavo-pimpao')

    params.forEach((value, key) => {
      crmUrl.searchParams.set(key, value)
    })

    if (!crmUrl.searchParams.has('landing_page_url')) {
      const fallbackUrl = params.get('landing_page_url') || window.location.origin
      crmUrl.searchParams.set('landing_page_url', fallbackUrl)
    }

    const messageText = 'Olá! Quero saber mais informações.'
    crmUrl.searchParams.set('mensagem', messageText)

    return crmUrl.toString()
  }, [])

  useEffect(() => {
    document.title = 'Direcionando para o WhatsApp — Dr. Gustavo Pimpão'

    const duration = 2500
    const intervalTime = 30
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(elapsed / duration, 1)
      setProgress(currentProgress)

      if (currentProgress >= 1) {
        clearInterval(timer)
        if (!redirected && redirectUrl) {
          setRedirected(true)
          window.location.href = redirectUrl
        }
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [redirectUrl, redirected])

  const handleManualClick = () => {
    if (redirectUrl) {
      setRedirected(true)
      window.location.href = redirectUrl
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4 py-8 font-sans select-none relative overflow-hidden mobile-readable">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,26,42,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-soft border border-brand-graphite/5 text-center flex flex-col items-center">
        
        {/* SVG Circular Progress Loader */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              className="text-emerald-500/10" 
              strokeWidth="6" 
              stroke="currentColor" 
              fill="transparent" 
              r="44" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="text-emerald-500 transition-all duration-75 ease-linear" 
              strokeWidth="6" 
              strokeDasharray={276.46}
              strokeDashoffset={276.46 * (1 - progress)} 
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="44" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="w-20 h-20 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.025 14.069.99 11.5.99c-5.438 0-9.863 4.37-9.868 9.8-.001 1.77.463 3.5 1.34 5.024L2.002 21.1l5.441-1.426-.8 1.48z" />
            </svg>
          </div>
        </div>

        {/* Título e Texto Amistoso */}
        <h1 className="font-display text-2xl sm:text-3xl font-black text-brand-graphite leading-tight mb-3">
          direcionando para o WhatsApp
        </h1>
        <p className="text-base font-medium text-brand-gray/80 mb-8 max-w-xs mx-auto">
          Conectando você ao atendimento do Dr. Gustavo Pimpão...
        </p>

        {/* Botão de Redirecionamento Manual */}
        <button 
          onClick={handleManualClick}
          className="w-full inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-red text-white text-base sm:text-lg font-black uppercase tracking-wider shadow-lg shadow-brand-red/20 transition duration-300 hover:bg-brand-red-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Conectar agora
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Footer Branding */}
      <span className="mt-8 text-xs font-bold text-brand-gray/40 uppercase tracking-widest z-10">
        Dr. Gustavo Pimpão • Ortopedia e Traumatologia
      </span>
    </div>
  )
}

function GlobalLayout({ children }) {
  return (
    <div className="mobile-readable">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

function HomePage({ heroTitle }) {
  return (
    <>
      <Hero title={heroTitle} />
      <ProofBar />
      <PainSection />
      <ApproachSection />
      <ProceduresSection />
      <SpecialistSection />
      <DifferentialsSection />
      <ConveniosSection />
      <LocationSection />
      <FAQSection />
    </>
  )
}

function TratamentosPage() {
  return (
    <>
      <section className="bg-brand-cream pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-brand-graphite mb-6">Nossos Tratamentos</h1>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">Conheça as especialidades e os procedimentos realizados.</p>
        </div>
      </section>
      <ProceduresSection />
    </>
  )
}

function BioPage() {
  return (
    <>
      <section className="bg-brand-cream pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-brand-graphite mb-6">Dr. Gustavo Pimpão</h1>
        </div>
      </section>
      <SpecialistSection />
      <DifferentialsSection />
    </>
  )
}

function ConveniosPage() {
  return (
    <>
      <section className="bg-brand-cream pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-brand-graphite mb-6">Convênios Aceitos</h1>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">Consulte os planos de saúde que atendemos.</p>
        </div>
      </section>
      <ConveniosSection />
    </>
  )
}

function BlogPage() {
  return (
    <section className="bg-brand-cream pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-brand-graphite mb-6">Blog e Artigos</h1>
        <p className="text-xl text-brand-gray mb-12">Informações e dicas sobre ortopedia, esportes e saúde.</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <a key={post.slug} href={`#/blog/${post.slug}`} className="bg-white rounded-3xl shadow-soft overflow-hidden hover:scale-[1.02] transition-transform duration-300 border border-brand-graphite/5 flex flex-col">
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-brand-red text-xs font-black uppercase tracking-widest mb-3">{post.category}</span>
                <h2 className="text-2xl font-black text-brand-graphite mb-4 leading-tight">{post.title}</h2>
                <p className="text-brand-gray text-base leading-relaxed line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                <span className="text-sm font-bold text-brand-red flex items-center gap-2 mt-auto">
                  Ler artigo completo <Icon name="arrow-right" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogPostPage({ slug }) {
  const post = posts.find(p => p.slug === slug)
  if (!post) {
    return (
      <div className="py-32 text-center bg-brand-cream min-h-screen">
        <h1 className="text-3xl font-black text-brand-graphite mb-4">Artigo não encontrado</h1>
        <a href="#/blog" className="text-brand-red font-bold underline">Voltar para o Blog</a>
      </div>
    )
  }
  
  return (
    <article className="bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
       <div className="max-w-3xl mx-auto">
          <a href="#/blog" className="text-brand-red font-bold text-sm uppercase tracking-wider mb-8 inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
             <Icon name="arrow-left" /> Voltar para o Blog
          </a>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-graphite mb-8 leading-[1.1]">{post.title}</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm font-semibold text-brand-gray mb-10 pb-6 border-b border-brand-graphite/10">
             <div className="flex items-center gap-2"><Icon name="calendar" /> {post.date}</div>
             <span className="hidden sm:inline">•</span>
             <div className="flex items-center gap-2"><Icon name="user" /> {post.author}</div>
             <span className="hidden sm:inline">•</span>
             <span className="bg-brand-red/10 text-brand-red px-3 py-1 rounded-full">{post.category}</span>
          </div>
          <img src={post.image} alt={post.title} className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] mb-12 shadow-soft" />
          <div className="prose-custom max-w-none">
             {post.content.map((p, i) => (
                <p key={i} className="mb-6 text-lg text-brand-gray leading-relaxed">{p}</p>
             ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-brand-graphite/10">
            <div className="bg-brand-cream rounded-3xl p-8 sm:p-12 text-center">
               <h3 className="text-2xl font-black text-brand-graphite mb-4">Sente alguma dor semelhante?</h3>
               <p className="text-brand-gray mb-8">Agende uma avaliação com o Dr. Gustavo Pimpão para um diagnóstico preciso.</p>
               <Button source="blog_post">Agendar Avaliação</Button>
            </div>
          </div>
       </div>
    </article>
  )
}

function ContatoPage() {
  return (
    <>
      <section className="bg-brand-cream pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-brand-graphite mb-6">Contato e Localização</h1>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-10">Agende sua consulta ou visite uma de nossas unidades.</p>
        </div>
      </section>
      <LocationSection />
    </>
  )
}

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const landingPage = getCurrentLandingPage()
  const heroTitle = getHeroTitle()

  if (isDirecionamentoPage()) {
    return <AgendarPage />
  }

  if (isConveniosMetaPage()) {
    return <ConveniosMetaPage />
  }

  if (landingPage) {
    return (
      <>
        <SchemaJsonLd page={landingPage} />
        <ProcedureLandingPage page={landingPage} />
        <LeadModalHost />
      </>
    )
  }

  const renderPage = () => {
    if (currentHash === '#/tratamentos') return <TratamentosPage />
    if (currentHash === '#/dr-gustavo') return <BioPage />
    if (currentHash === '#/convenios') return <ConveniosPage />
    if (currentHash === '#/blog') return <BlogPage />
    if (currentHash === '#/contato') return <ContatoPage />
    
    if (currentHash.startsWith('#/blog/')) {
      const slug = currentHash.replace('#/blog/', '')
      return <BlogPostPage slug={slug} />
    }

    return <HomePage heroTitle={heroTitle} />
  }

  return (
    <>
      <SchemaJsonLd />
      <GlobalLayout>
        {renderPage()}
      </GlobalLayout>
      <LeadModalHost />
    </>
  )
}
