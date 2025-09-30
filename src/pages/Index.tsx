import React from 'react';
import Layout from '../components/Layout';
import EmergencyCard from '../components/EmergencyCard';
import QuickAccessButton from '../components/QuickAccessButton';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const emergencyTypes = [
    {
      title: 'Desmaio',
      emoji: '😵',
      description: 'Pessoa perdeu a consciência e não responde',
      urgency: 'high' as const,
      action: () => navigate('/emergencia/desmaio')
    },
    {
      title: 'Engasgo',
      emoji: '🚫',
      description: 'Dificuldade para respirar ou engolir',
      urgency: 'high' as const,
      action: () => navigate('/emergencia/engasgo')
    },
    {
      title: 'Corte',
      emoji: '🩸',
      description: 'Ferimento com sangramento',
      urgency: 'medium' as const,
      action: () => navigate('/emergencia/corte-ferimento')
    },
    {
      title: 'Queimadura',
      emoji: '🔥',
      description: 'Lesão causada por calor, frio ou químicos',
      urgency: 'medium' as const,
      action: () => navigate('/emergencia/queimadura')
    },
    {
      title: 'Crise Epiléptica',
      emoji: '⚡',
      description: 'Pessoa tendo convulsões ou movimentos involuntários',
      urgency: 'high' as const,
      action: () => navigate('/emergencia/crise-epileptica')
    },
    {
      title: 'Queda',
      emoji: '🤕',
      description: 'Pessoa caiu e pode ter se machucado',
      urgency: 'low' as const,
      action: () => navigate('/emergencia/queda-fratura')
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-trust mb-4">
            Socorro Teen 🚑
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Aprenda primeiros socorros de forma <span className="text-emergency font-semibold">rápida</span>, 
            <span className="text-success font-semibold"> fácil</span> e 
            <span className="text-trust font-semibold"> divertida</span>! 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <QuickAccessButton
              title="EMERGÊNCIA AGORA!"
              emoji="🚨"
              variant="emergency"
              onClick={() => navigate('/modo-rapido')}
            />
            <QuickAccessButton
              title="Socorro IA"
              emoji="🤖"
              onClick={() => navigate('/socorro-ia')}
            />
            <QuickAccessButton
              title="Quero Aprender"
              emoji="📚"
              onClick={() => navigate('/primeiros-socorros')}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-emergency">3 min</div>
            <div className="text-gray-600">Para aprender o básico</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-success">100%</div>
            <div className="text-gray-600">Feito para adolescentes</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-trust">Salve</div>
            <div className="text-gray-600">Vidas de verdade</div>
          </div>
        </div>

        {/* Emergency Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🆘 Situações de Emergência
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyTypes.map((emergency, index) => (
              <EmergencyCard
                key={index}
                title={emergency.title}
                emoji={emergency.emoji}
                description={emergency.description}
                urgency={emergency.urgency}
                onClick={emergency.action}
              />
            ))}
          </div>
        </section>

        {/* Interactive Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div 
            className="bg-gradient-to-br from-trust to-trust-600 p-8 rounded-2xl text-white cursor-pointer card-hover"
            onClick={() => navigate('/simulador')}
          >
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-3">Simulador Interativo</h3>
            <p className="text-trust-100 mb-4">
              Pratique situações reais em um ambiente seguro e divertido!
            </p>
            <div className="flex items-center text-white font-semibold">
              <span>Começar agora</span>
              <span className="ml-2">→</span>
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-success to-success-600 p-8 rounded-2xl text-white cursor-pointer card-hover"
            onClick={() => navigate('/quiz')}
          >
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-2xl font-bold mb-3">Quiz Interativo</h3>
            <p className="text-success-100 mb-4">
              Teste seus conhecimentos e ganhe selos de socorrista teen!
            </p>
            <div className="flex items-center text-white font-semibold">
              <span>Fazer quiz</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            🌟 Pronto para salvar vidas?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Junte-se a milhares de teens que já aprenderam primeiros socorros!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button 
              onClick={() => navigate('/primeiros-socorros')}
              className="trust-button text-lg py-4 px-8"
            >
              🚀 Começar Aprendizado
            </button>
            <button 
              onClick={() => navigate('/sobre')}
              className="border-2 border-trust text-trust hover:bg-trust hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200"
            >
              📖 Saber Mais
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
