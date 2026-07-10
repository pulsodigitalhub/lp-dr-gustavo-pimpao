import { useEffect, useMemo, useState } from 'react'
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
    note: 'Unidade estratégica para quem busca ortopedista em Águas Claras.',
  },
  {
    name: 'Unique Ortopedia',
    region: 'Asa Sul',
    address: 'SGAS 610, Centro Médico Lúcio Costa, Sala 07 - Asa Sul, Brasília - DF, 70200-700',
    note: 'Atendimento em centro médico de fácil acesso na Asa Sul.',
  },
  {
    name: 'JK Ortopedia',
    region: 'Taguatinga Norte',
    address: 'QNL 30, Conjunto A, Lotes 2, 4 e 6, Loja 3 - Taguatinga Norte, Brasília - DF, 72162-301',
    note: 'Unidade próxima ao Shopping JK.',
  },
]

const procedures = [
  {
    title: 'Infiltrações articulares',
    text: 'Joelho, ombro, quadril, tornozelo, cotovelo, punho e pequenas articulações, conforme indicação médica.',
    icon: 'syringe',
  },
  {
    title: 'Bloqueios para dor',
    text: 'Bloqueios periféricos, geniculares, supraescapular, facetário, sacroilíaco e seletivo de raiz nervosa.',
    icon: 'pulse',
  },
  {
    title: 'Procedimentos para coluna',
    text: 'Avaliação para infiltrações epidurais, bloqueios transforaminais, interlaminares e facetários.',
    icon: 'spine',
  },
  {
    title: 'Radiofrequência',
    text: 'Ramos mediais, região cervical, lombar, sacroilíaca e nervos geniculares, quando há indicação.',
    icon: 'wave',
  },
  {
    title: 'Ortobiológicos',
    text: 'PRP, plasma rico em plaquetas, aspirado de medula óssea, concentrado celular e proloterapia.',
    icon: 'cells',
  },
  {
    title: 'Medicina esportiva e joelho',
    text: 'Avaliação de lesões, sobrecargas, tendinopatias e queixas ligadas ao retorno às atividades.',
    icon: 'knee',
  },
]

const problemSigns = [
  'Dor no joelho ao subir ou descer escadas',
  'Limitação para caminhar, treinar ou trabalhar',
  'Dor persistente em articulações, tendões ou coluna',
  'Inchaço, estalos ou sensação de instabilidade',
  'Dúvida entre tratamento conservador, procedimento ou cirurgia',
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
    title: '3 locais de atendimento',
    text: 'Águas Claras, Asa Sul e Taguatinga, facilitando o acesso de diferentes regiões do DF.',
  },
  {
    title: '+40 convênios aceitos',
    text: 'Lista organizada em ordem alfabética, com confirmação de cobertura por unidade, contrato e procedimento.',
  },
  {
    title: 'Procedimentos para dor',
    text: 'Avaliação para infiltrações, bloqueios, radiofrequência e ortobiológicos, quando indicados.',
  },
  {
    title: 'Formação ortopédica completa',
    text: 'Graduação em Medicina, residência em Ortopedia e Traumatologia, SBOT e formação complementar em joelho, esporte e dor.',
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

const testimonialSlots = [
  {
    title: 'Depoimento de consulta',
    text: 'Espaço reservado para avaliação real, com autorização e sem exposição de dados sensíveis.',
  },
  {
    title: 'Depoimento de procedimento',
    text: 'Espaço reservado para relato aprovado pelo paciente e revisado antes da publicação.',
  },
  {
    title: 'Depoimento de atendimento',
    text: 'Priorizar falas sobre clareza, acolhimento e orientação, usando nome abreviado.',
  },
]

const faqs = [
  {
    q: 'Em quais casos devo procurar um ortopedista?',
    a: 'Procure avaliação quando a dor limita movimento, trabalho, treino ou sono; quando há inchaço, trauma, perda de força, instabilidade ou quando a dor persiste apesar de cuidados iniciais.',
  },
  {
    q: 'O Dr. Gustavo atende dor no joelho?',
    a: 'Sim. A página é voltada a queixas ortopédicas, com ênfase em joelho, articulações, lesões, medicina esportiva e procedimentos para dor, sempre após avaliação individual.',
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

function track(event, payload = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
}

function whatsappUrl({ name = '', phone = '', source = 'lp' } = {}) {
  const message = [
    `Olá, vim pela Landing Page do ${doctor.shortName}.`,
    name ? `Meu nome é ${name}.` : '',
    phone ? `Meu telefone é ${phone}.` : '',
    'Quero agendar uma avaliação ortopédica.',
  ].filter(Boolean).join(' ')

  return `https://wa.me/${doctor.phone}?text=${encodeURIComponent(message)}&utm_source=${source}&utm_medium=lp&utm_campaign=dr_gustavo_pimpao`
}

function scrollToConvenios() {
  document.getElementById('convenios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Icon({ name, className = 'h-6 w-6' }) {
  const common = {
    className,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  const paths = {
    syringe: <><path d="m15 3 6 6" /><path d="m8 10 6 6" /><path d="m6 21 4.5-4.5" /><path d="m12 6 6 6" /><path d="M4.5 13.5 10.5 7.5" /></>,
    pulse: <path d="M3 12h4l2-5 5 10 2-5h5" />,
    spine: <><path d="M12 3v18" /><path d="M9 6h6M8.5 9h7M9 12h6M8.5 15h7M9 18h6" /></>,
    wave: <><path d="M4 14c3-6 6 6 9 0s6 6 9 0" /><path d="M4 9c3-4 6 4 9 0s6 4 9 0" /></>,
    cells: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="14" r="3" /><path d="M11 10.5 13.4 12" /></>,
    knee: <><path d="M9 3c3 2 5 5 5 9 0 3 1 5 3 7" /><path d="M7 8c4 0 8 2 10 5" /><path d="M7 21c.5-4 2-7 5-9" /></>,
    check: <path d="m5 13 4 4L19 7" />,
    map: <><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    arrow: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
    whatsapp: <><path d="M20 11.8a8 8 0 0 1-11.7 7.1L4 20l1.2-4.2A8 8 0 1 1 20 11.8Z" /><path d="M9 8.5c.2 3.2 2.2 5.2 5.5 6 .8.2 1.4-.5 1.5-1.2l-1.9-.9-.9.8c-1.1-.5-2-1.3-2.6-2.5l.8-.8-.8-1.9c-.8.1-1.5.6-1.6 1.5Z" /></>,
  }

  return <svg {...common}>{paths[name] || paths.check}</svg>
}

function Button({ children, variant = 'primary', className = '', onClick, href, source = 'cta' }) {
  const base = 'inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-black uppercase tracking-wide transition focus-visible:outline-brand-orange sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm'
  const styles = variant === 'dark'
    ? 'bg-brand-graphite text-white hover:bg-black'
    : variant === 'outline'
      ? 'border border-brand-red/30 bg-white text-brand-red hover:bg-brand-red hover:text-white'
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

function WhatsAppContactCard() {
  return (
    <aside id="agendar" className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-soft lg:p-7">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Agendamento</p>
        <h2 className="font-display mt-1 text-3xl font-black leading-tight text-brand-graphite">
          Fale direto com a equipe pelo WhatsApp
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-gray">
          A mensagem já abre pronta para solicitar agendamento da avaliação ortopédica.
        </p>
      </div>

      <div className="grid gap-3">
        <Button className="w-full" source="hero_card">
          <Icon name="whatsapp" />
          Agendar pelo WhatsApp
        </Button>
        <Button className="w-full" variant="outline" onClick={scrollToConvenios}>
          Ver convênios aceitos
        </Button>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-brand-gray">
        Antes do agendamento, a equipe pode confirmar unidade, agenda e cobertura do plano.
      </p>
    </aside>
  )
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 bg-medical-grid" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="pt-6 lg:pt-10">
          <p className="mb-5 inline-flex rounded-full border border-brand-red/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-brand-red">
            Ortopedia • Joelho • Dor • Brasília
          </p>
          <h1 className="font-display max-w-4xl text-4xl font-black leading-[0.98] text-brand-graphite sm:text-5xl lg:text-7xl">
            Ortopedista em Águas Claras para quem precisa entender e tratar a dor com critério.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            Avaliação com {doctor.shortName}, {doctor.specialty}, para queixas no joelho, articulações, coluna e procedimentos intervencionistas quando indicados.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-brand-graphite shadow-sm">{doctor.crm}</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-brand-graphite shadow-sm">{doctor.rqe}</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-brand-graphite shadow-sm">Atendimento em 3 unidades</span>
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

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="relative hidden lg:block">
            <img
              src="./img/joelho-tech.webp"
              width="725"
              height="750"
              alt="Ilustração anatômica de joelho com estética tecnológica"
              className="absolute -left-20 bottom-4 z-0 max-w-[360px] opacity-80"
              loading="eager"
            />
            <div className="relative z-10 overflow-hidden rounded-[2rem] bg-brand-graphite shadow-soft">
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

          <div className="lg:pb-8">
            <WhatsAppContactCard />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofBar() {
  return (
    <section className="border-y border-brand-graphite/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          ['Locais', 'Águas Claras, Asa Sul e Taguatinga'],
          ['Convênios', '+40 planos aceitos'],
          ['Dor', 'Infiltrações, bloqueios e radiofrequência'],
          ['Formação', 'Residência, SBOT e formação complementar'],
        ].map(([title, text]) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white">
              <Icon name="check" className="h-4 w-4" />
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
            A página foi pensada para quem chega pelo Google procurando um ortopedista e precisa decidir com rapidez, mas sem promessa milagrosa: primeiro vem a avaliação, depois a conduta.
          </p>
          <Button className="mt-8">Quero avaliar meu caso</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {problemSigns.map((item) => (
            <div key={item} className="rounded-3xl border border-brand-graphite/10 bg-brand-cream p-5">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                <Icon name="check" />
              </span>
              <p className="text-base font-black leading-snug text-brand-graphite">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApproachSection() {
  return (
    <section id="abordagem" className="bg-brand-graphite py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Abordagem</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Um caminho claro entre sintoma, diagnóstico e próxima decisão.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            A estrutura segue o padrão de conversão do Dr. Rafael: explicar rápido, reduzir objeção e levar o visitante para um contato rastreável.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {approach.map((item) => (
            <article key={item.step} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <span className="font-display text-5xl font-black text-brand-orange">{item.step}</span>
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.text}</p>
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
              Ortopedia geral, joelho e procedimentos para dor.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-brand-gray">
            A lista abaixo organiza os procedimentos presentes nos materiais do cliente. Resultados podem variar conforme cada caso. Avaliação individual é necessária.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((procedure) => (
            <article key={procedure.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                <Icon name={procedure.icon} />
              </span>
              <h3 className="mt-5 text-xl font-black text-brand-graphite">{procedure.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{procedure.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-brand-red/15 bg-white p-5 text-sm leading-relaxed text-brand-gray">
          <strong className="text-brand-graphite">Observação médica:</strong> procedimentos como infiltrações, bloqueios, radiofrequência, PRP e ortobiológicos dependem de avaliação presencial, exames, indicação clínica e orientação sobre limites e riscos.
        </div>
      </div>
    </section>
  )
}

function SpecialistSection() {
  return (
    <section id="especialista" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-brand-graphite shadow-soft">
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
              'Formação complementar em cirurgia do joelho.',
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Diferenciais</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            O que sustenta a decisão do paciente.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-soft">
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
  return (
    <section id="convenios" className="scroll-mt-28 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-brand-graphite/10 bg-brand-graphite p-6 text-white lg:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Convênios</p>
              <h2 className="font-display mt-2 text-3xl font-black">Confirme seu plano antes de agendar.</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Lista em ordem alfabética para facilitar sua busca. A cobertura pode variar por unidade, contrato e
                procedimento; a equipe valida seu convênio no atendimento.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              {convenioHighlights.map((name) => (
                <span key={name} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-4 py-2 text-base font-black text-white sm:text-sm">
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

function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Depoimentos</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
            Seção preparada para prova social validada.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">
            Não foram encontrados depoimentos individuais validados nos materiais. Por segurança ética, a LP reserva os espaços sem inventar falas.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonialSlots.map((slot) => (
            <article key={slot.title} className="rounded-3xl border border-dashed border-brand-red/30 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">A validar</p>
              <h3 className="mt-3 text-lg font-black text-brand-graphite">{slot.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{slot.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-brand-gray">
          Depoimentos refletem experiências individuais. Resultados variam e dependem de avaliação médica.
        </p>
      </div>
    </section>
  )
}

function LocationSection() {
  const mapQuery = encodeURIComponent(locations[0].address)

  return (
    <section id="localizacao" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Localização</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
              Atendimento em Águas Claras, Asa Sul e Taguatinga.
            </h2>
            <div className="mt-8 grid gap-4">
              {locations.map((location) => (
                <article key={location.name} className="rounded-3xl border border-brand-graphite/10 bg-brand-cream p-5">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-brand-red">
                      <Icon name="map" />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{location.region}</p>
                      <h3 className="mt-1 text-lg font-black text-brand-graphite">{location.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-gray">{location.address}</p>
                      <p className="mt-2 text-sm font-bold text-brand-graphite">{location.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="self-start overflow-hidden rounded-[2rem] bg-brand-graphite shadow-soft">
            <img
              src="./img/iob-fachada.webp"
              width="680"
              height="453"
              alt="Fachada do Instituto Ortopédico de Brasília"
              className="h-64 w-full object-cover"
              loading="lazy"
            />
            <iframe
              title="Mapa do atendimento em Águas Claras"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="340"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex items-center gap-3 p-5 text-white/75">
              <Icon name="clock" />
              <span className="text-sm font-bold">{doctor.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-brand-graphite py-16 text-white lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">FAQ</p>
          <h2 className="font-display mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Perguntas frequentes antes do agendamento.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <article key={faq.q} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]">
              <button
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-black"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span className="text-brand-orange">{open === index ? '−' : '+'}</span>
              </button>
              {open === index && (
                <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/70">
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

function FinalCTA() {
  return (
    <section className="bg-brand-cream py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-soft lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <img
            src="./img/consulta-joelho.webp"
            width="632"
            height="600"
            alt="Avaliação ortopédica de joelho"
            className="h-72 w-full rounded-[1.5rem] object-cover lg:h-full"
            loading="lazy"
          />
          <div className="self-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Próximo passo</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-tight text-brand-graphite sm:text-5xl">
              Agende uma avaliação e entenda as opções para o seu caso.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-gray">
              Conteúdo informativo. Não substitui consulta médica. A conduta depende de avaliação individual, exame físico e análise de exames quando necessário.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button source="final_cta_primary">
                <Icon name="whatsapp" />
                Agendar pelo WhatsApp
              </Button>
              <Button variant="outline" onClick={scrollToConvenios}>
                Ver convênios aceitos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-brand-graphite/10 pb-8 md:grid-cols-3">
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
                <li key={location.name}>{location.region}: {location.address}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-black text-brand-graphite">Aviso</h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-gray">
              Resultados podem variar conforme cada caso. Avaliação individual é necessária. Conteúdo informativo; não substitui consulta presencial.
            </p>
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
          className="fixed bottom-48 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-graphite text-white shadow-2xl transition hover:scale-105 sm:bottom-24 sm:h-12 sm:w-12"
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

function SchemaJsonLd() {
  const schema = useMemo(() => {
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
      mainEntity: faqs.map((faq) => ({
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
      name: 'Avaliação ortopédica, infiltrações, bloqueios e procedimentos para dor',
      procedureType: 'Ortopedia e procedimentos intervencionistas para dor',
      performedBy: {
        '@type': 'Physician',
        name: doctor.name,
      },
    }

    return [physician, faqSchema, medicalProcedure]
  }, [])

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
          <TestimonialsSection />
          <LocationSection />
          <FAQSection />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  )
}
