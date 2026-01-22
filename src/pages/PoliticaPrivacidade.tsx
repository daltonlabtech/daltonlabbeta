import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

const PoliticaPrivacidade = () => {
  return (
    <main className="min-h-screen bg-[#101823]">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-inter text-4xl md:text-5xl text-[#F5F3F0] font-light mb-12">
            Política de Privacidade
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">1. Introdução</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                O Dalton Lab valoriza a privacidade de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">2. Informações Coletadas</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e dados da empresa ao preencher formulários ou entrar em contato conosco. Também podemos coletar dados de uso automaticamente, como endereço IP, tipo de navegador e páginas visitadas.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">3. Uso das Informações</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Utilizamos suas informações para: fornecer e melhorar nossos serviços; personalizar sua experiência; enviar comunicações relevantes sobre nossos produtos; responder a suas solicitações; e cumprir obrigações legais.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">4. Compartilhamento de Dados</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Não vendemos suas informações pessoais. Podemos compartilhar dados com parceiros de confiança que nos auxiliam na operação do negócio, sempre sob acordos de confidencialidade, ou quando exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">5. Segurança</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">6. Seus Direitos</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Você tem direito a acessar, corrigir, excluir ou portar seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail administrativo@daltonlab.ai.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">7. Contato</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail: administrativo@daltonlab.ai
              </p>
            </section>

            <p className="font-inter text-sm text-[#F5F3F0]/50 mt-12">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PoliticaPrivacidade;
