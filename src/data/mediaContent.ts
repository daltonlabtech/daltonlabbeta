/**
 * Matérias de mídia sobre o Dalton Lab — fonte única para o carrossel de
 * Conteúdos da home (PressSection) e para a página /artigos (aba Mídia).
 * Portado de design-reference/site-novo/conteudos-data.js (a primeira é o destaque).
 */

export type Bi = { pt: string; en: string };

export interface PressItem {
  id: string;
  titulo: Bi;
  veiculo: string;
  data: Bi;
  url: string;
  img: string;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 'epoca-kpmg-final-global',
    titulo: {
      pt: 'As 8 startups brasileiras que disputam vaga na final global do Global Tech Innovator, da KPMG',
      en: 'The 8 Brazilian startups competing for a spot in the global final of KPMG’s Global Tech Innovator',
    },
    veiculo: 'Época Negócios',
    data: { pt: 'Jul 2026', en: 'Jul 2026' },
    url: 'https://epocanegocios.globo.com/startups/noticia/2026/07/as-8-startups-brasileiras-que-disputam-vaga-na-final-global-do-global-tech-innovator-da-kpmg.ghtml',
    img: '/novo/assets/press/epoca.jpg',
  },
  {
    id: 'websummit-pitch-winner',
    titulo: {
      pt: 'A empresa brasileira Dalton Lab venceu o PITCH na Web Summit Rio 2026 com uma IA que muda a forma como trabalhamos',
      en: 'Brazilian company Dalton Lab won PITCH at Web Summit Rio 2026 with an AI that changes how we work',
    },
    veiculo: 'Web Summit Rio',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://rio.websummit.com/pt-br/blog/news/dalton-pitch-winner-web-summit-rio-2026/',
    img: '/novo/assets/press/websummit.jpg',
  },
  {
    id: 'pegn-pitch-vencedora',
    titulo: {
      pt: 'Dalton Lab é a vencedora do PITCH no Web Summit Rio 2026',
      en: 'Dalton Lab is the winner of PITCH at Web Summit Rio 2026',
    },
    veiculo: 'Pequenas Empresas Grandes Negócios',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://revistapegn.globo.com/web-summit-rio/noticia/2026/06/dalton-lab-e-a-vencedora-do-pitch-no-web-summit-rio-2026.ghtml',
    img: '/novo/assets/press/pegn.jpg',
  },
  {
    id: 'oglobo-pitch-vence',
    titulo: {
      pt: 'Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026',
      en: 'Brazilian startup Dalton Lab wins the Web Summit Rio 2026 Pitch',
    },
    veiculo: 'O Globo',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://oglobo.globo.com/google/amp/rio/web-summit-rio/noticia/2026/06/11/startup-brasileira-dalton-vence-pitch-do-web-summit-rio-2026.ghtml',
    img: '/novo/assets/press/oglobo.jpg',
  },
  {
    id: 'canaltech-ia-websummit',
    titulo: {
      pt: 'IA domina o Web Summit Rio 2026; veja os destaques do evento',
      en: 'AI dominates Web Summit Rio 2026; see the event highlights',
    },
    veiculo: 'Canaltech',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://canaltech.com.br/mercado/ia-domina-o-web-summit-rio-2026-veja-os-destaques-do-evento/',
    img: '/novo/assets/press/canaltech.jpg',
  },
  {
    id: 'nextbigidea-pitch-vencedor',
    titulo: {
      pt: 'Dalton Lab, o pitch vencedor do Web Summit Rio 2026',
      en: 'Dalton Lab, the winning pitch of Web Summit Rio 2026',
    },
    veiculo: 'The Next Big Idea',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://thenextbigidea.pt/dalton-lab-o-pitch-vencedor-do-web-summit-rio-2026/',
    img: '/novo/assets/press/nextbigidea.jpg',
  },
  {
    id: 'brasil-em-folhas-pitch',
    titulo: {
      pt: 'Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026',
      en: 'Brazilian startup Dalton Lab wins the Web Summit Rio 2026 Pitch',
    },
    veiculo: 'Brasil em Folhas',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://www.brasilemfolhas.com.br/2026/06/startup-brasileira-dalton-lab-vence-pitch-do-web-summit-rio-2026/',
    img: '/novo/assets/press/brasilemfolhas.jpg',
  },
  {
    id: 'gazeta-paulistana-pitch',
    titulo: {
      pt: 'Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional',
      en: 'Brazilian startup wins Web Summit Rio pitch competition and gains international spotlight',
    },
    veiculo: 'Gazeta Paulistana',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://gazetapaulistana.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/',
    img: '/novo/assets/press/gazetapaulistana.jpg',
  },
  {
    id: 'gazeta-corporativa-pitch',
    titulo: {
      pt: 'Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional',
      en: 'Brazilian startup wins Web Summit Rio pitch competition and gains international spotlight',
    },
    veiculo: 'Gazeta Corporativa',
    data: { pt: 'Jun 2026', en: 'Jun 2026' },
    url: 'https://gazetacorporativa.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/',
    img: '/novo/assets/press/gazetacorporativa.jpg',
  },
  {
    id: 'cnn-ia-infraestrutura',
    titulo: {
      pt: 'IA promete reduzir custos e acelerar projetos em infraestrutura',
      en: 'AI promises to cut costs and speed up infrastructure projects',
    },
    veiculo: 'CNN Brasil',
    data: { pt: 'Mar 2026', en: 'Mar 2026' },
    url: 'https://www.cnnbrasil.com.br/infra/ia-promete-reduzir-custos-e-acelerar-projetos-em-infraestrutura/',
    img: '/novo/assets/press/cnn.jpg',
  },
  {
    id: 'veja-mundial-mix-aporte',
    titulo: {
      pt: 'O aporte de um sócio do atacadista Mundial Mix em uma startup de IA',
      en: 'The investment by a partner of wholesaler Mundial Mix in an AI startup',
    },
    veiculo: 'VEJA · Radar Econômico',
    data: { pt: 'Fev 2026', en: 'Feb 2026' },
    url: 'https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/',
    img: '/novo/assets/press/veja.jpg',
  },
];

/** Gradientes de fallback para cards sem imagem (ciclados por índice % 4). */
export const PRESS_GRADS = [
  'linear-gradient(135deg,#3a4a63 0%,#20293a 60%,#131a27 100%)',
  'linear-gradient(135deg,#2e4257 0%,#1c2736 60%,#111826 100%)',
  'linear-gradient(135deg,#41485f 0%,#242b3d 60%,#141a28 100%)',
  'linear-gradient(135deg,#33506a 0%,#1e2c3d 60%,#101724 100%)',
];
