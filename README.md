# Landing Page — Dr. Gustavo Pimpão

Landing page em React + Vite criada para o Dr. Gustavo Pimpão, seguindo o padrão técnico/de conversão do Dr. Rafael Rocha e a identidade visual do site atual `ortopedistaaguasclaras.com.br`.

## Stack

- React 18
- Vite 5
- Tailwind CSS 4
- Build com caminhos relativos para upload em Hostinger ou servidor estático

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O build final sai em `dist/`.

## O que foi implementado

- Hero com formulário curto: nome + telefone.
- Redirecionamento para página de obrigado e WhatsApp com mensagem pré-preenchida.
- Eventos `dataLayer` para submit, obrigado e clique em WhatsApp.
- Header sticky, WhatsApp flutuante, botão voltar ao topo e CTA mobile fixo.
- Seções obrigatórias: prova rápida, dor/problema, mecanismo, especialista, procedimentos, diferenciais, convênios, depoimentos a validar, localização, FAQ, CTA final e footer.
- Schema.org `Physician`, `MedicalBusiness`, `MedicalProcedure` e `FAQPage`.
- Imagens otimizadas em WebP.
- Footer de versão Ads sem telefone/e-mail soltos, para evitar vazamento de conversão.

## Pendências antes de publicar

- `[A VALIDAR]` Depoimentos reais autorizados.
- `[A VALIDAR]` Lista final de convênios por unidade.
- `[A VALIDAR]` Confirmar se `GTM-58TBHFDV` é o container oficial da campanha.
- `[A VALIDAR]` Confirmar slug de publicação (`/lp/`, domínio raiz ou variação por campanha).

## Fontes usadas

- Drive do cliente: currículo/Lattes, lista de procedimentos, foto e documentos de atendimento.
- Brain Pulso: `processo-criacao-lp`, specs de LP e compliance médico.
- Referência interna: `Pulso/Clientes/Dr. Rafael Rocha/LP`.
- Site atual: `https://ortopedistaaguasclaras.com.br/`.
