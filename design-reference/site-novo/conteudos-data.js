/* Dados da página de conteúdos — compartilhado entre conteudos-desktop.html e conteudos-mobile.html
   Para adicionar um ARTIGO do Dalton Lab: acrescente um objeto em `artigos` no formato:
   { titulo:"...", data:"05 Ago 2026", url:"...", img:"fotos/artigos/slug.jpg", resumo:"opcional" }
   A imagem é opcional: sem `img`, o card usa o fundo de gradiente com a marca. */
window.CONTEUDOS = {
  artigos: [
    /* em breve — publicações do Dalton Lab entram aqui */
  ],
  midia: [
    {titulo:"As 8 startups brasileiras que disputam vaga na final global do Global Tech Innovator, da KPMG", veiculo:"Época Negócios", data:"Jul 2026", url:"https://epocanegocios.globo.com/startups/noticia/2026/07/as-8-startups-brasileiras-que-disputam-vaga-na-final-global-do-global-tech-innovator-da-kpmg.ghtml", img:"fotos/midia/epoca.jpg"},
    {titulo:"A empresa brasileira Dalton Lab venceu o PITCH na Web Summit Rio 2026 com uma IA que muda a forma como trabalhamos", veiculo:"Web Summit Rio", data:"Jun 2026", url:"https://rio.websummit.com/pt-br/blog/news/dalton-pitch-winner-web-summit-rio-2026/", img:"fotos/midia/websummit.jpg"},
    {titulo:"Dalton Lab é a vencedora do PITCH no Web Summit Rio 2026", veiculo:"Pequenas Empresas Grandes Negócios", data:"Jun 2026", url:"https://revistapegn.globo.com/web-summit-rio/noticia/2026/06/dalton-lab-e-a-vencedora-do-pitch-no-web-summit-rio-2026.ghtml", img:"fotos/midia/pegn.jpg"},
    {titulo:"Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026", veiculo:"O Globo", data:"Jun 2026", url:"https://oglobo.globo.com/google/amp/rio/web-summit-rio/noticia/2026/06/11/startup-brasileira-dalton-vence-pitch-do-web-summit-rio-2026.ghtml", img:"fotos/midia/oglobo.jpg"},
    {titulo:"IA domina o Web Summit Rio 2026; veja os destaques do evento", veiculo:"Canaltech", data:"Jun 2026", url:"https://canaltech.com.br/mercado/ia-domina-o-web-summit-rio-2026-veja-os-destaques-do-evento/", img:"fotos/midia/canaltech.jpg"},
    {titulo:"Dalton Lab, o pitch vencedor do Web Summit Rio 2026", veiculo:"The Next Big Idea", data:"Jun 2026", url:"https://thenextbigidea.pt/dalton-lab-o-pitch-vencedor-do-web-summit-rio-2026/", img:"fotos/midia/nextbigidea.jpg"},
    {titulo:"Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026", veiculo:"Brasil em Folhas", data:"Jun 2026", url:"https://www.brasilemfolhas.com.br/2026/06/startup-brasileira-dalton-lab-vence-pitch-do-web-summit-rio-2026/", img:"fotos/midia/brasilemfolhas.jpg"},
    {titulo:"Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional", veiculo:"Gazeta Paulistana", data:"Jun 2026", url:"https://gazetapaulistana.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/", img:"fotos/midia/gazetapaulistana.jpg"},
    {titulo:"Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional", veiculo:"Gazeta Corporativa", data:"Jun 2026", url:"https://gazetacorporativa.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/", img:"fotos/midia/gazetacorporativa.jpg"},
    {titulo:"IA promete reduzir custos e acelerar projetos em infraestrutura", veiculo:"CNN Brasil", data:"Mar 2026", url:"https://www.cnnbrasil.com.br/infra/ia-promete-reduzir-custos-e-acelerar-projetos-em-infraestrutura/", img:"fotos/midia/cnn.jpg"},
    {titulo:"O aporte de um sócio do atacadista Mundial Mix em uma startup de IA", veiculo:"VEJA · Radar Econômico", data:"Fev 2026", url:"https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/", img:"fotos/midia/veja.jpg"}
  ],
  /* gradientes de fallback para cards sem imagem */
  grads: [
    "linear-gradient(135deg,#3a4a63 0%,#20293a 60%,#131a27 100%)",
    "linear-gradient(135deg,#2e4257 0%,#1c2736 60%,#111826 100%)",
    "linear-gradient(135deg,#41485f 0%,#242b3d 60%,#141a28 100%)",
    "linear-gradient(135deg,#33506a 0%,#1e2c3d 60%,#101724 100%)"
  ]
};
