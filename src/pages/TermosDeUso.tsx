import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";

const sectionStyle: React.CSSProperties = { marginTop: 36 };
const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--text)",
  marginBottom: 12,
};
const pStyle: React.CSSProperties = {
  fontSize: "1rem",
  lineHeight: 1.75,
  color: "var(--text-dim)",
};
const linkStyle: React.CSSProperties = {
  color: "var(--cyan)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
  textDecorationColor: "rgba(76,184,232,0.45)",
};

const TermosDeUso = () => {
  useEffect(() => {
    const pageTitle = 'Termos de Uso | Dalton Lab';
    document.title = pageTitle;
    trackPageView('/termos-de-uso', 'Termos de Uso');
  }, []);

  return (
    <div
      className="redesign-scope"
      style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}
    >
      <SiteHeader />

      <main
        className="mx-auto px-6 md:px-12"
        style={{
          maxWidth: 760,
          width: "100%",
          boxSizing: "border-box",
          paddingTop: "clamp(120px, 16vh, 180px)",
          paddingBottom: "clamp(64px, 10vw, 120px)",
        }}
      >
        <span className="eyebrow">Legal</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          Termos de Uso
        </h1>
        <span
          aria-hidden="true"
          className="block"
          style={{ width: 60, height: 2, marginTop: 22, marginBottom: 8, background: "var(--cyan-deep)", borderRadius: 2 }}
        />

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Aceitação dos Termos</h2>
          <p style={pStyle}>
            Ao acessar e utilizar os serviços do Dalton Lab, você concorda em cumprir estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Descrição dos Serviços</h2>
          <p style={pStyle}>
            O Dalton Lab oferece soluções de automação comercial baseadas em Inteligência Artificial, incluindo agentes de IA para prospecção, qualificação de leads, follow-up e gestão comercial.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Uso Aceitável</h2>
          <p style={pStyle}>
            Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes Termos. É proibido: usar os serviços para atividades ilegais; tentar acessar áreas não autorizadas do sistema; interferir na operação dos serviços; ou violar direitos de terceiros.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Propriedade Intelectual</h2>
          <p style={pStyle}>
            Todo o conteúdo, marcas, logotipos e tecnologia do Dalton Lab são de nossa propriedade ou licenciados para nós. Nenhum direito de propriedade intelectual é transferido a você pelo uso dos serviços.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Limitação de Responsabilidade</h2>
          <p style={pStyle}>
            O Dalton Lab não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso de nossos serviços. Nossos serviços são fornecidos "como estão", sem garantias expressas ou implícitas.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Modificações</h2>
          <p style={pStyle}>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através do site ou por e-mail.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>7. Lei Aplicável</h2>
          <p style={pStyle}>
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>8. Contato</h2>
          <p style={pStyle}>
            Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail:{" "}
            <a href="mailto:administrativo@daltonlab.ai" style={linkStyle}>administrativo@daltonlab.ai</a>
          </p>
        </section>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted-navy)",
            marginTop: 48,
          }}
        >
          Última atualização: Janeiro de 2026
        </p>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TermosDeUso;
