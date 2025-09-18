
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import EmergencyCard from '../components/EmergencyCard';
import { Search } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const PrimeirosSocorros = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Scroll para o topo quando a página carrega
  useScrollToTop();

  const emergencies = [
    {
      id: 'desmaio',
      title: 'Pessoa Desmaiada',
      emoji: '😵',
      description: 'O que fazer quando alguém perde a consciência repentinamente',
      urgency: 'high' as const
    },
    {
      id: 'engasgo',
      title: 'Engasgo',
      emoji: '🚫',
      description: 'Como ajudar quando algo está bloqueando as vias respiratórias',
      urgency: 'high' as const
    },
    {
      id: 'crise-ansiedade',
      title: 'Crise de Ansiedade',
      emoji: '😰',
      description: 'Como acalmar e ajudar alguém em crise de pânico ou ansiedade',
      urgency: 'medium' as const
    },
    {
      id: 'corte-ferimento',
      title: 'Cortes e Ferimentos',
      emoji: '🩹',
      description: 'Primeiros cuidados com feridas e sangramento',
      urgency: 'medium' as const
    },
    {
      id: 'queimadura',
      title: 'Queimaduras',
      emoji: '🔥',
      description: 'Como tratar queimaduras de diferentes graus',
      urgency: 'medium' as const
    },
    {
      id: 'queda-fratura',
      title: 'Quedas e Fraturas',
      emoji: '🦴',
      description: 'O que fazer em caso de quedas e possíveis fraturas',
      urgency: 'medium' as const
    },
    {
      id: 'intoxicacao',
      title: 'Intoxicação',
      emoji: '☠️',
      description: 'Primeiros socorros em casos de intoxicação ou envenenamento',
      urgency: 'high' as const
    },
    {
      id: 'crise-epileptica',
      title: 'Crise Epiléptica',
      emoji: '⚡',
      description: 'Como ajudar alguém durante uma convulsão',
      urgency: 'high' as const
    }
  ];

  const filteredEmergencies = emergencies.filter(emergency =>
    emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-trust mb-4">
            🚑 Primeiros Socorros
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guias rápidos e fáceis para situações de emergência. 
            Clique em qualquer situação para ver o passo a passo detalhado!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 Buscar situação de emergência..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-trust focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Quick Access Banner */}
        <div className="bg-emergency text-white p-6 rounded-2xl mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">⚡ Acesso Rápido</h2>
          <p className="mb-4">Em caso de emergência grave, ligue imediatamente:</p>
          <div className="flex justify-center space-x-8 text-xl font-bold">
            <div>🚑 SAMU: 192</div>
            <div>🚒 Bombeiros: 193</div>
            <div>👮 Polícia: 190</div>
          </div>
        </div>

        {/* Emergency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEmergencies.map((emergency) => (
            <Link key={emergency.id} to={`/emergencia/${emergency.id}`}>
              <EmergencyCard
                title={emergency.title}
                emoji={emergency.emoji}
                description={emergency.description}
                urgency={emergency.urgency}
                onClick={() => {}}
              />
            </Link>
          ))}
        </div>

        {filteredEmergencies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Nenhuma situação encontrada
            </h3>
            <p className="text-gray-500">
              Tente buscar por outras palavras-chave
            </p>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="text-xl font-bold mb-2 text-blue-800">Lembre-se!</h3>
          <p className="text-blue-700">
            Estes guias são para primeiros socorros básicos. 
            Em situações graves, sempre procure ajuda médica profissional!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrimeirosSocorros;
