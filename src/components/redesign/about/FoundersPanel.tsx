import { useTranslation } from 'react-i18next';
import FounderCard from './FounderCard';

/**
 * Painel "Fundadores" — porta `#panel-founders`.
 * Grid de 3 FounderCard (stack mobile, 3 colunas ≥720px via .qs-founders).
 */
export default function FoundersPanel() {
  const { t } = useTranslation();

  const founders = [
    {
      index: '01',
      name: 'Rodrigo Spínola',
      photo: '/novo/assets/team/rodrigo-sm.jpg',
      linkedin: 'https://www.linkedin.com/in/orodrigospinola/',
      instagram: 'https://www.instagram.com/orodrigospinola',
      role: t('qs.fo.1.role', 'Fundador e CEO'),
      bio: t(
        'qs.fo.1.bio',
        'Foi CEO da maior operação comercial da Serasa para PMEs no Brasil. Liderou e formou +500 vendedores de alta performance. Recebeu diversos prêmios nacionais e internacionais (Paris 2018, Hawaii 2019, Montevideo 2019 e USA 2020). Hoje lidera o Dalton Lab na transformação de empresas em Organizações Agênticas. Embaixador da Escola de IA da Pós PUC/PR. Obcecado por cultura, resultado e crescimento.',
      ),
    },
    {
      index: '02',
      name: 'Marcelo Ramos',
      photo: '/novo/assets/team/marcelo-sm.jpg',
      linkedin: 'https://www.linkedin.com/in/marceloramossa/',
      instagram: 'https://www.instagram.com/marceloramos.ia',
      role: t('qs.fo.2.role', 'Fundador e COO'),
      bio: t(
        'qs.fo.2.bio',
        'Gerenciou mais de 120 projetos de iniciativas digitais no mercado de Saúde e Educação, gerando +7000 clientes em seu primeiro empreendimento, aos 21 anos. Tendo experiência em multinacionais como Deloitte, hoje desenha a arquitetura operacional que transforma estratégia em execução no Dalton Lab.',
      ),
    },
    {
      index: '03',
      name: 'Julio Lohn',
      photo: '/novo/assets/team/julio-sm.jpg',
      linkedin: 'https://www.linkedin.com/in/julio-cesar-lohn-6b63b231/',
      instagram: 'https://www.instagram.com/julioclohn',
      role: t('qs.fo.3.role', 'Sócio-conselheiro'),
      bio: t(
        'qs.fo.3.bio',
        'Diretor Comercial e Marketing do Grupo Mundial Mix, que controla Brasil Atacadista e Supermercados Imperatriz, uma das maiores redes do varejo alimentar de Santa Catarina. Presidente do Conselho da Rede Brasil - RBSM. +13 anos liderando estratégia comercial e inovação no setor.',
      ),
    },
  ];

  return (
    <div role="tabpanel">
      <span className="eyebrow reveal in" style={{ display: 'inline-flex' }}>
        {t('qs.fo.kicker', 'Liderança')}
      </span>
      <h2
        className="headline reveal in"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.04,
          fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
          margin: '14px 0 28px',
        }}
      >
        {t('qs.fo.title', 'Os fundadores')}
      </h2>

      <div className="qs-founders" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {founders.map((f) => (
          <FounderCard key={f.index} {...f} />
        ))}
      </div>
    </div>
  );
}
