
import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Sobre = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-trust mb-4">
            📚 Sobre o Socorro Teen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma educativa moderna, interativa e totalmente pensada para ensinar 
            primeiros socorros aos adolescentes de forma divertida e eficaz.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-trust to-trust-600 p-8 rounded-2xl text-white text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🎯 Nossa Missão</h2>
            <p className="text-xl text-trust-100 max-w-3xl mx-auto">
              Capacitar adolescentes com conhecimentos essenciais de primeiros socorros 
              através de uma experiência digital envolvente, moderna e acessível.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            ✨ Por que Socorro Teen?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Gamificação</h3>
              <p className="text-gray-600">
                Aprender nunca foi tão divertido! Quiz interativo, simulador de situações 
                e sistema de conquistas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mobile First</h3>
              <p className="text-gray-600">
                Interface pensada para celular, onde os teens passam mais tempo. 
                Acesso rápido quando mais precisam.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Acessibilidade</h3>
              <p className="text-gray-600">
                Leitura em voz alta, design inclusivo e navegação intuitiva para 
                que todos possam aprender.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Modo Rápido</h3>
              <p className="text-gray-600">
                Em emergências reais, acesso imediato às instruções mais importantes. 
                Cada segundo conta!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Pedagogia Moderna</h3>
              <p className="text-gray-600">
                Baseado em métodos de ensino que funcionam com a geração digital. 
                Visual, interativo e memorável.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Impacto Social</h3>
              <p className="text-gray-600">
                Cada teen capacitado pode salvar vidas. Multiplicamos o conhecimento 
                e criamos uma rede de socorro.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emergency to-emergency-600 p-8 rounded-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-8">📊 Por que Isso Importa?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">70%</div>
                <p className="text-emergency-100">
                  Das emergências acontecem em casa ou escola, onde adolescentes podem ser 
                  os primeiros a ajudar
                </p>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2">4-6min</div>
                <p className="text-emergency-100">
                  Tempo crítico antes da chegada do socorro profissional. 
                  Sua ação pode fazer a diferença!
                </p>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <p className="text-emergency-100">
                  Dos jovens aprendem melhor com conteúdo visual e interativo 
                  do que apenas texto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            👥 Quem Somos
          </h2>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">
              Somos duas alunas apaixonadas por tecnologia, educação e, principalmente, por ajudar as pessoas. 
              Criamos o Socorro Teen com muito carinho, pensando em como é importante saber agir em emergências do dia a dia.
            </p>
            
            <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">
              Acreditamos que informação salva vidas e que, quando usamos a tecnologia para ensinar, 
              tudo fica mais fácil, rápido e divertido. Nossa missão é simples: fazer com que qualquer 
              adolescente se sinta capaz de ajudar, cuidar e fazer a diferença.
            </p>
            
            <div className="text-center text-2xl font-bold text-trust mb-6">
              🖥️✨ Tecnologia + Empatia + Conhecimento = Socorro Teen!
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl mb-2">💻</div>
                <h4 className="font-bold text-gray-800">Tecnologia</h4>
                <p className="text-sm text-gray-600">Interface moderna e intuitiva</p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl mb-2">❤️</div>
                <h4 className="font-bold text-gray-800">Empatia</h4>
                <p className="text-sm text-gray-600">Pensado para ajudar pessoas</p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-bold text-gray-800">Conhecimento</h4>
                <p className="text-sm text-gray-600">Informação que salva vidas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="mb-12">
          <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-orange-800">Aviso Importante</h3>
                <p className="text-orange-700 leading-relaxed">
                  O Socorro Teen é uma ferramenta educativa complementar. Em situações de 
                  emergência real, sempre chame os serviços de emergência (192, 193, 190) 
                  e busque ajuda de adultos responsáveis. Nossa plataforma não substitui 
                  treinamento profissional ou supervisão médica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-success p-8 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Pronto para Começar?</h2>
          <p className="text-xl text-success-100 mb-6">
            Junte-se a milhares de teens que já estão aprendendo a salvar vidas!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button 
              onClick={() => navigate('/primeiros-socorros')}
              className="bg-white text-success font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors"
            >
              📚 Começar a Aprender
            </button>
            <button 
              onClick={() => navigate('/quiz')}
              className="border-2 border-white text-white hover:bg-white hover:text-success font-bold py-4 px-8 rounded-xl transition-all duration-200"
            >
              ❓ Testar Conhecimento
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
