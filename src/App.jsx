import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowUp,
  BadgeCheck,
  Bone,
  Building2,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  CreditCard,
  Dumbbell,
  Footprints,
  GraduationCap,
  HeartPulse,
  Hospital,
  MapPinned,
  Menu,
  MessageCircle,
  Radio,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  TriangleAlert,
  X,
} from 'lucide-react'
import './App.css'

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
    image: './img/clinica-iob.webp',
    icon: 'hospital',
    mapQuery: 'IOB Instituto Ortopédico de Brasília, Av. das Araucárias, 785, Águas Claras, Brasília - DF, 71936-250',
  },
  {
    name: 'Unique Ortopedia',
    region: 'Asa Sul',
    address: 'SGAS II 610, Centro Médico Lúcio Costa, Sala 07 - Asa Sul, Brasília - DF, 70200-700',
    note: 'Atendimento em centro médico de fácil acesso na Asa Sul.',
    image: './img/clinica-unique.webp',
    icon: 'building',
    mapQuery: 'Unique Ortopedia e Fisioterapia, SGAS II 610, Centro Médico Lúcio Costa, Sala 07, Asa Sul, Brasília - DF, 70200-700',
  },
  {
    name: 'JK Ortopedia',
    region: 'Taguatinga Norte',
    address: 'QNL 30, Conjunto A, Lotes 2, 4 e 6, Loja 3 - Taguatinga Norte, Brasília - DF, 72162-301',
    note: 'Unidade próxima ao Shopping JK.',
    image: './img/clinica-jk.webp',
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
    icon: 'bone',
  },
  {
    title: 'Radiofrequência',
    text: 'Ramos mediais, região cervical, lombar, sacroilíaca e nervos geniculares, quando há indicação.',
    icon: 'radio',
  },
  {
    title: 'Ortobiológicos',
    text: 'PRP, plasma rico em plaquetas, aspirado de medula óssea, concentrado celular e proloterapia.',
    icon: 'sparkles',
  },
  {
    title: 'Medicina esportiva e lesões ortopédicas',
    text: 'Avaliação de lesões, sobrecargas, tendinopatias e queixas ligadas ao retorno às atividades.',
    icon: 'dumbbell',
  },
]

const problemSigns = [
  {
    text: 'Dor articular ao subir ou descer escadas',
    icon: 'footprints',
  },
  {
    text: 'Limitação para caminhar, treinar ou trabalhar',
    icon: 'activity',
  },
  {
    text: 'Dor persistente em articulações, tendões ou coluna',
    icon: 'heartPulse',
  },
  {
    text: 'Inchaço, estalos ou sensação de instabilidade',
    icon: 'alert',
  },
  {
    text: 'Dúvida entre tratamento conservador, procedimento ou cirurgia',
    icon: 'clipboardList',
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
    icon: 'badgeCheck',
  },
  {
    title: 'Formação ortopédica completa',
    text: 'Graduação em Medicina, residência em Ortopedia e Traumatologia, SBOT e formação complementar em esporte, articulações e dor.',
    icon: 'graduation',
  },
  {
    title: 'Três regiões de atendimento',
    text: 'Águas Claras, Asa Sul e Taguatinga, facilitando o acesso de diferentes regiões do DF.',
    icon: 'mapPinned',
  },
  {
    title: 'Procedimentos quando indicados',
    text: 'Avaliação para infiltrações, bloqueios, radiofrequência e ortobiológicos, quando indicados.',
    icon: 'stethoscope',
  },
  {
    title: 'Convênios e particular',
    text: 'Atendimento com confirmação de cobertura por unidade e plano antes do agendamento.',
    icon: 'creditCard',
  },
  {
    title: 'Conduta clara para o próximo passo',
    text: 'Explicação sobre possibilidades e caminhos de cuidado, com conduta definida conforme a avaliação.',
    icon: 'clipboardCheck',
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
    q: 'Radiofrequência é indicada para qualquer dor?',
    a: 'Não. A radiofrequência é avaliada caso a caso. O médico precisa confirmar origem provável da dor, critérios de segurança e alternativas antes de indicar o procedimento.',
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
    title: 'Infiltração para dor em Brasília',
    metaTitle: 'Infiltração para dor em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica com Dr. Gustavo Pimpão para entender se infiltração pode ser indicada para dores, articulações, tendões, bursites e perda de mobilidade.',
    eyebrow: 'Infiltração ortopédica',
    description: 'Avaliação ortopédica com Dr. Gustavo Pimpão para entender se a infiltração pode ser indicada no seu caso, conforme diagnóstico, exames e objetivo do tratamento.',
    bullets: [
      'Atendimento em Águas Claras, Asa Sul e Taguatinga',
      'Avaliação para dores articulares, tendões, bursites e limitação de movimento',
      'Confirmação de agenda e convênio pelo WhatsApp',
    ],
    symptomsTitle: 'Quando a dor começa a limitar movimento, trabalho ou rotina',
    symptomsIntro: 'A infiltração pode ser considerada quando existe uma indicação clínica clara e a dor interfere na função do dia a dia.',
    symptoms: [
      { text: 'Dor persistente em articulações', icon: 'heartPulse' },
      { text: 'Inflamação em tendões ou bursas', icon: 'activity' },
      { text: 'Dor que dificulta fisioterapia ou reabilitação', icon: 'footprints' },
      { text: 'Limitação para caminhar, treinar ou trabalhar', icon: 'dumbbell' },
      { text: 'Dúvida sobre o próximo passo do tratamento', icon: 'clipboardList' },
    ],
    indicationTitle: 'Um procedimento feito com indicação, objetivo e acompanhamento',
    indicationText: 'A infiltração consiste na aplicação de uma medicação ou substância em uma articulação, tendão, bursa ou região relacionada à dor. A escolha do tipo de infiltração depende do diagnóstico e da estrutura envolvida.',
    contextsTitle: 'A infiltração pode ser avaliada em diferentes regiões do corpo',
    contexts: [
      { title: 'Ombro', text: 'Dor, bursite, tendinopatias, impacto ou rigidez em avaliação.', icon: 'activity' },
      { title: 'Joelho', text: 'Dor, inchaço, rigidez, desgaste articular ou limitação funcional.', icon: 'footprints' },
      { title: 'Quadril, tornozelo e pé', text: 'Queixas articulares ou periarticulares que precisam de diagnóstico.', icon: 'bone' },
      { title: 'Cotovelo, punho e mão', text: 'Dor em articulações, tendões e estruturas próximas.', icon: 'target' },
      { title: 'Coluna e regiões relacionadas à dor', text: 'Casos selecionados em que procedimentos podem ser discutidos.', icon: 'stethoscope' },
    ],
    typesTitle: 'Nem toda infiltração é igual',
    types: [
      { title: 'Corticosteroide', text: 'Pode ser considerado quando há componente inflamatório e indicação clínica.', icon: 'syringe' },
      { title: 'Ácido hialurônico', text: 'Pode ser avaliado em situações específicas, principalmente em contexto articular.', icon: 'sparkles' },
      { title: 'Ortobiológicos', text: 'PRP e outras opções podem ser discutidos quando há indicação individual.', icon: 'badgeCheck' },
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
    title: 'Infiltração no joelho em Brasília',
    metaTitle: 'Infiltração no joelho em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica para dor no joelho, inchaço, rigidez, suspeita de desgaste e perda de mobilidade em Brasília.',
    eyebrow: 'Dor no joelho',
    description: 'Avaliação ortopédica com Dr. Gustavo Pimpão para dor no joelho, perda de mobilidade e suspeita de desgaste, com indicação individualizada conforme diagnóstico e exames.',
    bullets: [
      'Atendimento em Águas Claras, Asa Sul e Taguatinga',
      'Avaliação para dor, inchaço, rigidez e limitação no joelho',
      'Confirmação de convênio e agenda pelo WhatsApp',
    ],
    symptomsTitle: 'Quando a dor no joelho começa a mudar sua rotina',
    symptomsIntro: 'Dor, inchaço e rigidez no joelho podem ter causas diferentes. A avaliação ajuda a entender se a infiltração faz sentido no plano de cuidado.',
    symptoms: [
      { text: 'Dor ao subir ou descer escadas', icon: 'footprints' },
      { text: 'Dor para caminhar ou ficar muito tempo em pé', icon: 'activity' },
      { text: 'Inchaço ou sensação de joelho “cheio”', icon: 'alert' },
      { text: 'Rigidez ao levantar', icon: 'clock' },
      { text: 'Dificuldade para treinar ou trabalhar', icon: 'dumbbell' },
    ],
    indicationTitle: 'A indicação depende da causa da dor',
    indicationText: 'A infiltração no joelho pode ser considerada em casos selecionados, como processos inflamatórios, desgaste articular, dor persistente ou limitação funcional. Antes de indicar, o médico avalia exame físico, exames de imagem, histórico e tratamentos já realizados.',
    contextsTitle: 'Pode ser uma alternativa quando a dor impede o avanço do tratamento',
    contexts: [
      { title: 'Artrose ou desgaste em avaliação', text: 'O grau de desgaste, sintomas e exames orientam a conduta.', icon: 'bone' },
      { title: 'Inflamação articular', text: 'Casos com componente inflamatório podem exigir controle de sintomas.', icon: 'heartPulse' },
      { title: 'Dor relacionada a sobrecarga', text: 'Treino, trabalho e rotina podem influenciar a dor no joelho.', icon: 'dumbbell' },
      { title: 'Dificuldade na reabilitação', text: 'A dor pode limitar evolução em fisioterapia e retomada de função.', icon: 'activity' },
      { title: 'Decisão antes de cirurgia', text: 'A consulta ajuda a entender opções e próximos passos.', icon: 'clipboardList' },
    ],
    typesTitle: 'Nem toda infiltração no joelho é igual',
    types: [
      { title: 'Corticosteroide', text: 'Pode ser considerado quando há componente inflamatório importante e indicação clínica.', icon: 'syringe' },
      { title: 'Ácido hialurônico', text: 'Pode ser avaliado em casos selecionados de desgaste articular, considerando perfil, exames e objetivos.', icon: 'sparkles' },
      { title: 'PRP e ortobiológicos', text: 'Podem ser discutidos em situações específicas, com alinhamento claro sobre indicação e expectativas.', icon: 'badgeCheck' },
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
    title: 'Infiltração no ombro em Brasília',
    metaTitle: 'Infiltração no ombro em Brasília — Dr. Gustavo Pimpão',
    metaDescription: 'Avaliação ortopédica para dor no ombro, bursite, tendinites, rigidez, perda de mobilidade e dificuldade para levantar o braço.',
    eyebrow: 'Dor no ombro',
    description: 'Avaliação ortopédica com Dr. Gustavo Pimpão para dor no ombro, limitação para levantar o braço e perda de mobilidade, com indicação individualizada conforme o diagnóstico.',
    bullets: [
      'Avaliação para bursite, tendinites, impacto e rigidez do ombro',
      'Atendimento em Águas Claras, Asa Sul e Taguatinga',
      'Agendamento direto pelo WhatsApp',
    ],
    symptomsTitle: 'Quando o ombro começa a limitar movimentos simples',
    symptomsIntro: 'Dor para levantar o braço, dormir de lado ou vestir roupa pode envolver diferentes estruturas do ombro. A conduta depende da causa.',
    symptoms: [
      { text: 'Dor para levantar o braço', icon: 'activity' },
      { text: 'Dor para dormir de lado', icon: 'heartPulse' },
      { text: 'Dificuldade para vestir roupa ou pentear o cabelo', icon: 'footprints' },
      { text: 'Dor após treino ou esforço repetitivo', icon: 'dumbbell' },
      { text: 'Rigidez e perda de mobilidade', icon: 'alert' },
    ],
    indicationTitle: 'A infiltração depende da causa da dor',
    indicationText: 'A infiltração no ombro pode ser avaliada em casos de dor com componente inflamatório, bursite, tendinopatias, impacto ou rigidez, sempre após exame físico e análise do histórico do paciente.',
    contextsTitle: 'Cada diagnóstico muda a conduta',
    contexts: [
      { title: 'Bursite', text: 'Pode causar dor ao levantar o braço e ao deitar sobre o ombro.', icon: 'heartPulse' },
      { title: 'Tendinopatias', text: 'Nem toda dor no tendão deve ser tratada da mesma forma.', icon: 'activity' },
      { title: 'Síndrome do impacto', text: 'A avaliação identifica movimentos e estruturas relacionados à dor.', icon: 'target' },
      { title: 'Ombro congelado', text: 'Pode causar dor e rigidez progressiva, exigindo plano de cuidado.', icon: 'clock' },
      { title: 'Reabilitação limitada pela dor', text: 'A dor pode atrapalhar ganho de movimento e força.', icon: 'dumbbell' },
    ],
    typesTitle: 'Controle da dor para recuperar função',
    types: [
      { title: 'Infiltração subacromial', text: 'Pode ser discutida em quadros de bursite, impacto ou dor relacionada ao manguito rotador.', icon: 'syringe' },
      { title: 'Infiltração intra-articular', text: 'Pode ser considerada quando a origem da dor envolve a articulação.', icon: 'target' },
      { title: 'Plano associado à reabilitação', text: 'O procedimento, quando indicado, entra dentro de uma estratégia de retomada de mobilidade.', icon: 'clipboardCheck' },
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
}

function getCurrentLandingPage() {
  if (typeof window === 'undefined') return null
  let pathname = window.location.pathname
  pathname = pathname.replace('/lp-dr-gustavo-pimpao', '')
  if (!pathname.endsWith('/')) pathname = `${pathname}/`
  return injectionLandingPages[pathname] || null
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

const iconComponents = {
  activity: Activity,
  alert: TriangleAlert,
  arrow: ArrowUp,
  badgeCheck: BadgeCheck,
  bone: Bone,
  building: Building2,
  check: CircleCheck,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  clock: Clock3,
  creditCard: CreditCard,
  dumbbell: Dumbbell,
  footprints: Footprints,
  graduation: GraduationCap,
  heartPulse: HeartPulse,
  hospital: Hospital,
  mapPinned: MapPinned,
  menu: Menu,
  radio: Radio,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  syringe: Syringe,
  target: Target,
  whatsapp: MessageCircle,
  close: X,
}

function Icon({ name, className = 'h-6 w-6' }) {
  const LucideIcon = iconComponents[name] || CircleCheck
  return <LucideIcon className={className} strokeWidth={1.9} aria-hidden="true" />
}

function Button({ children, variant = 'primary', className = '', onClick, href, source = 'cta' }) {
  const base = 'inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-black uppercase tracking-wide transition focus-visible:outline-brand-orange sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm'
  const styles = variant === 'dark'
    ? 'bg-brand-wine text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red'
    : variant === 'outline'
      ? 'border-2 border-brand-red bg-brand-red/5 text-brand-red shadow-md shadow-brand-red/10 hover:bg-brand-red hover:text-white'
      : 'bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red-dark'

  if (href) {
    return (
      <a href={href} onClick={() => track('whatsapp_click', { location: 'button' })} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }

  if (!onClick) {
    return (
      <a href={whatsappUrl({ source })} onClick={() => track('whatsapp_click', { location: source })} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#dores', 'Dores'],
    ['#abordagem', 'Como funciona'],
    ['#procedimentos', 'Procedimentos'],
    ['#especialista', 'Especialista'],
    ['#convenios', 'Convênios'],
    ['#localizacao', 'Locais'],
    ['#faq', 'FAQ'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-brand-graphite/10 bg-white/94 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#topo" className="flex items-center gap-3" aria-label="Ir para o topo">
          <img src="./img/logo.svg" alt="Dr. Gustavo Pimpão" className="h-16 w-auto lg:h-14" width="180" height="80" />
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

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 bg-medical-grid" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="pt-6 lg:pt-10">
          <h1 className="font-display max-w-4xl text-4xl font-black leading-[0.98] text-brand-graphite sm:text-5xl lg:text-7xl">
            Ortopedista em Brasília
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            Dr. Gustavo Pimpão, Ortopedista e Traumatologista, para queixas de dores e perda de mobilidade.
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

function getProofItems(painText = 'Infiltrações, bloqueios e radiofrequência') {
  return [
    { title: 'Locais', text: 'Águas Claras, Asa Sul e Taguatinga', icon: 'mapPinned' },
    { title: 'Convênios', text: '+40 planos aceitos', icon: 'creditCard' },
    { title: 'Dor', text: painText, icon: 'heartPulse' },
    { title: 'Formação', text: 'Residência, SBOT e formação complementar', icon: 'graduation' },
  ]
}

function ProofBar({ painText = 'Infiltrações, bloqueios e radiofrequência', className = '' }) {
  return (
    <section className={`border-y border-brand-graphite/10 bg-white ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {getProofItems(painText).map(({ title, text, icon }) => (
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
    <section id="dores" className="bg-white py-16 lg:py-24">
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Abordagem</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Um caminho claro entre sintoma, diagnóstico e próxima decisão.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            A consulta busca organizar sintomas, exames e objetivos para reduzir dúvidas e orientar o próximo passo com segurança.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {approach.map((item) => (
            <article key={item.step} className="rounded-3xl border border-white/20 bg-white/[0.12] p-6 shadow-soft">
              <span className="font-display text-5xl font-black text-brand-orange">{item.step}</span>
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{item.text}</p>
            </article>
          ))}
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
              Ortopedia geral e procedimentos para dor.
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

function SpecialistSection() {
  return (
    <section id="especialista" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-brand-wine shadow-soft">
          <img
            src="./img/dr-gustavo-portrait.webp"
            width="900"
            height="1200"
            alt="Dr. Gustavo Pimpão em consultório"
            className="h-[620px] w-full object-cover object-[50%_42%]"
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
            {[
              'Pós-graduação em Medicina do Exercício e do Esporte.',
              'Formação complementar em ortopedia, esporte e dor.',
              'Atuação em procedimentos intervencionistas para dor.',
              'Experiência em ambiente hospitalar e consultório.',
            ].map((item) => (
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

function LocationSection() {
  return (
    <section id="localizacao" className="bg-white py-16 lg:py-24">
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
                <img
                  src={location.image}
                  width="900"
                  height="600"
                  alt={`Foto da unidade ${location.name}`}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
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

function LandingHero({ page, proofPainText = 'Infiltrações, bloqueios e radiofrequência' }) {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 bg-medical-grid" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="pt-6 lg:pt-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">{page.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-black leading-[0.98] text-brand-graphite sm:text-5xl lg:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            {page.description}
          </p>

          <div className="mt-7 hidden gap-3 lg:grid">
            {page.bullets.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/75 p-3 shadow-sm">
                <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <p className="text-sm font-bold leading-relaxed text-brand-graphite">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-4 rounded-[1.75rem] bg-white p-5 shadow-soft lg:hidden">
            {getProofItems(proofPainText).map(({ title, text, icon }) => (
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

function LandingSymptomsSection({ page }) {
  return (
    <section id="dores" className="bg-white py-16 lg:py-24">
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
    <section className="bg-white py-16 lg:py-24">
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Como funciona</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">{page.stepsTitle}</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {page.steps.map((item, index) => (
            <article key={item} className="rounded-3xl border border-white/20 bg-white/[0.12] p-6 shadow-soft">
              <span className="font-display text-5xl font-black text-brand-orange">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-5 text-sm font-bold leading-relaxed text-white/85">{item}</p>
            </article>
          ))}
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
            Agende uma avaliação e entenda se a infiltração faz sentido para o seu caso.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-gray">
            Pelo WhatsApp, a equipe confirma agenda, unidade disponível e cobertura do plano.
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
      <Header />
      <main>
        <LandingHero page={page} proofPainText="Infiltrações guiadas por ultrassom" />
        <ProofBar painText="Infiltrações guiadas por ultrassom" className="hidden lg:block" />
        <LandingSymptomsSection page={page} />
        <LandingIndicationSection page={page} />
        <LandingContextsSection page={page} />
        <LandingStepsSection page={page} />
        <SpecialistSection />
        <DifferentialsSection />
        <ConveniosSection />
        <LocationSection />
        <LandingFAQSection page={page} />
        <LandingFinalCTA page={page} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-brand-graphite/10 pb-8 md:grid-cols-2">
          <div>
            <img src="./img/logo.svg" alt="Dr. Gustavo Pimpão" className="h-16 w-auto" width="180" height="80" loading="lazy" />
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
  const wa = whatsappUrl({ source: 'floating_whatsapp' })

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 800)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href={wa}
        aria-label="Falar com a equipe pelo WhatsApp"
        onClick={() => track('whatsapp_click', { location: 'floating' })}
        className="fixed bottom-28 right-4 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 sm:bottom-6 sm:h-14 sm:w-14"
      >
        <Icon name="whatsapp" />
      </a>

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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-graphite/10 bg-white p-4 shadow-2xl sm:hidden">
        <Button className="w-full" source="mobile_sticky">
          <Icon name="whatsapp" />
          Agendar pelo WhatsApp
        </Button>
      </div>
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

export default function App() {
  const landingPage = getCurrentLandingPage()

  if (landingPage) {
    return (
      <>
        <SchemaJsonLd page={landingPage} />
        <ProcedureLandingPage page={landingPage} />
      </>
    )
  }

  return (
    <>
      <SchemaJsonLd />
      <div className="mobile-readable">
        <Header />
        <main>
          <Hero />
          <ProofBar />
          <PainSection />
          <ApproachSection />
          <ProceduresSection />
          <SpecialistSection />
          <DifferentialsSection />
          <ConveniosSection />
          <LocationSection />
          <FAQSection />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  )
}
