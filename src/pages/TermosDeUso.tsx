import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

const TermosDeUso = () => {
  return (
    <main className="min-h-screen bg-[#101823]">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-inter text-4xl md:text-5xl text-[#F5F3F0] font-light mb-12">
            Termos de Uso
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Ao acessar e utilizar os serviços do Dalton Lab, você concorda em cumprir estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">2. Descrição dos Serviços</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                O Dalton Lab oferece soluções de automação comercial baseadas em Inteligência Artificial, incluindo agentes de IA para prospecção, qualificação de leads, follow-up e gestão comercial.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">3. Uso Aceitável</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes Termos. É proibido: usar os serviços para atividades ilegais; tentar acessar áreas não autorizadas do sistema; interferir na operação dos serviços; ou violar direitos de terceiros.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">4. Propriedade Intelectual</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Todo o conteúdo, marcas, logotipos e tecnologia do Dalton Lab são de nossa propriedade ou licenciados para nós. Nenhum direito de propriedade intelectual é transferido a você pelo uso dos serviços.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">5. Limitação de Responsabilidade</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                O Dalton Lab não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso de nossos serviços. Nossos serviços são fornecidos "como estão", sem garantias expressas ou implícitas.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">6. Modificações</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através do site ou por e-mail.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">7. Lei Aplicável</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-xl text-[#F5F3F0] font-semibold mb-4">8. Contato</h2>
              <p className="font-inter text-base text-[#F5F3F0]/70 leading-relaxed">
                Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: administrativo@daltonlab.ai
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

export default TermosDeUso;
