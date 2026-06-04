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

const PoliticaPrivacidade = () => {
  useEffect(() => {
    const pageTitle = 'Política de Privacidade | Dalton Lab';
    document.title = pageTitle;
    trackPageView('/politica-de-privacidade', 'Política de Privacidade');
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
          Política de Privacidade
        </h1>
        <span
          aria-hidden="true"
          className="block"
          style={{ width: 60, height: 2, marginTop: 22, marginBottom: 8, background: "var(--cyan-deep)", borderRadius: 2 }}
        />

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Introdução</h2>
          <p style={pStyle}>
            O Dalton Lab valoriza a privacidade de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Informações Coletadas</h2>
          <p style={pStyle}>
            Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e dados da empresa ao preencher formulários ou entrar em contato conosco. Também podemos coletar dados de uso automaticamente, como endereço IP, tipo de navegador e páginas visitadas.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Uso das Informações</h2>
          <p style={pStyle}>
            Utilizamos suas informações para: fornecer e melhorar nossos serviços; personalizar sua experiência; enviar comunicações relevantes sobre nossos produtos; responder a suas solicitações; e cumprir obrigações legais.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Compartilhamento de Dados</h2>
          <p style={pStyle}>
            Não vendemos suas informações pessoais. Podemos compartilhar dados com parceiros de confiança que nos auxiliam na operação do negócio, sempre sob acordos de confidencialidade, ou quando exigido por lei.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Segurança</h2>
          <p style={pStyle}>
            Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Seus Direitos</h2>
          <p style={pStyle}>
            Você tem direito a acessar, corrigir, excluir ou portar seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail{" "}
            <a href="mailto:administrativo@daltonlab.ai" style={linkStyle}>administrativo@daltonlab.ai</a>.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>7. Contato</h2>
          <p style={pStyle}>
            Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail:{" "}
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

const linkStyle: React.CSSProperties = {
  color: "var(--cyan)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
  textDecorationColor: "rgba(76,184,232,0.45)",
};

export default PoliticaPrivacidade;
