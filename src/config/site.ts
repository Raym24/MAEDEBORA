export type SiteImage = {
  src: string;
  alt: string;
};

// Inserir somente os materiais oficiais. Não usar fotografias substitutas.
// Quando disponíveis, as imagens desta página devem usar /images/<nome-oficial>.
export const site = {
  name: "Mãe Débora da Cigana",
  seo: {
    title: "Mãe Débora da Cigana",
    description: "Mãe Débora da Cigana: trajetória, cartas, búzios, saberes e informações sobre atendimentos.",
    locale: "pt_BR",
    image: "",
  },
  links: {
    whatsappNumber: "",
    whatsappMessage: "Olá! Gostaria de informações sobre os atendimentos.",
    instagram: "",
  },
  images: {
    logo: { src: "", alt: "Mãe Débora da Cigana" },
    portrait: { src: "", alt: "Retrato de Mãe Débora da Cigana" },
    cards: { src: "", alt: "Cartas utilizadas por Mãe Débora da Cigana" },
    buzios: { src: "", alt: "Búzios de Mãe Débora da Cigana" },
    life: { src: "", alt: "Mãe Débora da Cigana além da espiritualidade" },
  } satisfies Record<string, SiteImage>,
  navigation: [
    { label: "Quem sou", href: "#quem-sou" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Os oráculos", href: "#oraculos" },
    { label: "Saberes", href: "#saberes" },
    { label: "Atendimentos", href: "#atendimentos" },
  ],
  ui: {
    skip: "Ir para o conteúdo",
    navigation: "Navegação principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    home: "Voltar ao início",
    contact: "Sobre os atendimentos",
    whatsapp: "Conversar pelo WhatsApp",
    instagram: "Instagram",
    external: "abre em uma nova aba",
    pending: "Em aprovação",
    photoPlaceholder: "Fotografia de búzios",
    photoPlaceholderDetail: "Espaço reservado para a fotografia oficial",
    copyright: "Todos os direitos reservados.",
    top: "Voltar ao topo",
    footerNavigation: "Links do rodapé",
  },
  hero: {
    eyebrow: "Cartas · Búzios · Espiritualidade",
    firstLine: "Mãe Débora",
    secondLine: "da Cigana",
    introduction: "Apresentação oficial",
    discover: "Conheça a trajetória",
    scroll: "Uma história para descobrir",
    index: "01 / Início",
  },
  about: {
    eyebrow: "01 — Quem sou",
    title: "Mãe Débora da Cigana",
    copyLabel: "Minha história",
    body: "Em aprovação",
  },
  trajectory: {
    eyebrow: "02 — Trajetória",
    title: "Uma trajetória,\nmuitos caminhos.",
    entries: [
      { date: "Ano a confirmar", title: "Trajetória", body: "Em aprovação" },
      { date: "Hoje", title: "Mãe Débora da Cigana", body: "Em aprovação" },
    ],
  },
  oracles: {
    eyebrow: "03 — Os oráculos",
    title: "Cartas & búzios",
    items: [
      { number: "01", title: "Cartas", body: "Em aprovação" },
      { number: "02", title: "Búzios", body: "Em aprovação" },
    ],
  },
  knowledge: {
    eyebrow: "04 — Saberes",
    title: "Saberes",
    body: "Em aprovação",
  },
  beyond: {
    eyebrow: "05 — Além da espiritualidade",
    title: "Além da\nespiritualidade",
    body: "Em aprovação",
  },
  appointments: {
    eyebrow: "06 — Atendimentos",
    title: "Atendimentos",
    body: "Em aprovação",
    availability: "Informações sobre modalidades, horários e agendamento",
    pendingContact: "O canal oficial de contato será publicado após aprovação.",
  },
  faq: {
    eyebrow: "07 — Perguntas frequentes",
    title: "Antes de conversar",
    items: [
      { question: "Como agendar um atendimento?", answer: "As informações de agendamento estão em aprovação. O canal oficial será publicado nesta seção assim que estiver confirmado." },
      { question: "Quais são as modalidades de atendimento?", answer: "Em aprovação" },
      { question: "Como me preparar para um atendimento?", answer: "Em aprovação" },
      { question: "Onde acompanhar Mãe Débora da Cigana?", answer: "O endereço oficial do Instagram está em aprovação." },
    ],
  },
  closing: {
    eyebrow: "Cartas · Búzios · Espiritualidade",
    title: "Mãe Débora\nda Cigana",
  },
};

export function getContactHref() {
  const number = site.links.whatsappNumber.replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(site.links.whatsappMessage)}`
    : "#atendimentos";
}
