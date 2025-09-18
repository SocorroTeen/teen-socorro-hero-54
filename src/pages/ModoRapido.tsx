import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ModoRapido = () => {
  const navigate = useNavigate();
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Scroll para o topo quando a página carrega
  useScrollToTop();

  // Timer para parada cardíaca e epilepsia
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Scroll para o topo quando seleciona uma emergência
  useEffect(() => {
    if (selectedEmergency) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedEmergency]);

  const emergencies = [
    {
      id: 'desmaio',
      title: 'Desmaio',
      emoji: '😵',
      color: 'bg-emergency',
      description: 'Pessoa perdeu a consciência'
    },
    {
      id: 'engasgo',
      title: 'Engasgo',
      emoji: '🚫',
      color: 'bg-trust',
      description: 'Dificuldade para respirar'
    },
    {
      id: 'parada',
      title: 'Parada Cardíaca',
      emoji: '💔',
      color: 'bg-emergency',
      description: 'Pessoa não responde nem respira'
    },
    {
      id: 'epileptica',
      title: 'Crise Epiléptica',
      emoji: '⚡',
      color: 'bg-trust',
      description: 'Movimentos involuntários'
    }
  ];

  const callSAMU = () => {
    window.open('tel:192', '_self');
  };

  const toggleReading = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const content = getEmergencyContent(selectedEmergency);
      if (content) {
        const utterance = new SpeechSynthesisUtterance(content.steps.join('. '));
        utterance.lang = 'pt-BR';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
        setIsReading(true);
        utterance.onend = () => setIsReading(false);
      }
    }
  };

  const startTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      setTimer(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmergencyContent = (id: string | null) => {
    const contents = {
      desmaio: {
        title: 'Desmaio - Aja Agora!',
        steps: [
          '1️⃣ Deite a pessoa de costas e levante as pernas',
          '2️⃣ Afrouxe roupas apertadas',
          '3️⃣ Verifique se ela está respirando normalmente',
          '4️⃣ Se não acordar em até 1 minuto, ligue 192',
          '5️⃣ Se recuperar, mantenha-a deitada e em repouso'
        ],
        color: 'bg-emergency'
      },
      engasgo: {
        title: 'Engasgo - Aja Agora!',
        steps: [
          '1️⃣ Pergunte: "Você está engasgado?"',
          '2️⃣ Se não conseguir falar, tossir ou respirar, aplique 5 tapas nas costas',
          '3️⃣ Se não funcionar, faça a manobra de Heimlich:',
          '   • Pressione o abdômen, entre o umbigo e o tórax, para dentro e para cima',
          '4️⃣ Repita até desobstruir ou até a pessoa desmaiar',
          '5️⃣ Se desmaiar, inicie RCP e ligue 192'
        ],
        color: 'bg-trust'
      },
      parada: {
        title: 'Parada Cardíaca - Aja Agora!',
        steps: [
          '1️⃣ Verifique se a pessoa está consciente e respirando',
          '2️⃣ Se não, ligue imediatamente 192',
          '3️⃣ Inicie as compressões torácicas:',
          '   • Pressione forte e rápido no centro do peito',
          '   • Ritmo: 100 a 120 compressões por minuto',
          '   • Permita o retorno total do tórax entre as compressões',
          '4️⃣ Continue sem parar até chegar o socorro'
        ],
        color: 'bg-emergency'
      },
      epileptica: {
        title: 'Crise Epiléptica - Aja Agora!',
        steps: [
          '1️⃣ Mantenha a calma',
          '2️⃣ Afaste objetos que possam machucar a pessoa',
          '3️⃣ Coloque algo macio sob a cabeça',
          '4️⃣ Nunca segure a pessoa nem coloque nada na boca',
          '5️⃣ Cronometre o tempo da convulsão:',
          '   • Se durar mais de 5 minutos, ligue 192',
          '6️⃣ Após a convulsão, vire a pessoa de lado e aguarde ela se recuperar'
        ],
        color: 'bg-trust'
      }
    };
    return contents[id as keyof typeof contents];
  };

  if (selectedEmergency) {
    const content = getEmergencyContent(selectedEmergency);
    return (
      <div className="min-h-screen bg-gray-50 relative">
        {/* Header sticky */}
        <div className="sticky top-0 bg-white shadow-lg z-50 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button
              onClick={() => {
                setSelectedEmergency(null);
                setTimer(0);
                setIsTimerRunning(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
            
            <h1 className="text-xl font-bold text-emergency text-center flex-1">
              🚨 EMERGÊNCIA ATIVA
            </h1>
            
            <div className="flex space-x-2">
              <button
                onClick={toggleReading}
                className={`p-2 rounded-xl transition-all ${isReading ? 'bg-success text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal com padding adequado */}
        <div className="p-4 max-w-4xl mx-auto">
          <div className={`${content?.color} text-white p-6 rounded-2xl mb-6 text-center`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {content?.title}
            </h2>
            <p className="text-lg">Siga estas instruções imediatamente!</p>
          </div>

          {/* Instruções passo a passo */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="space-y-4">
              {content?.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emergency text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.startsWith('   •') ? '•' : index + 1}
                  </div>
                  <p className={`text-lg ${step.startsWith('   •') ? 'ml-4 text-gray-700' : 'text-gray-800 font-medium'} leading-relaxed`}>
                    {step.replace(/^[0-9]️⃣\s/, '').replace(/^   •\s/, '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cronômetro para parada cardíaca */}
          {selectedEmergency === 'parada' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-emergency">
                ⏱️ Cronômetro para Compressões
              </h3>
              <div className="text-4xl font-bold text-emergency mb-4">
                {formatTime(timer)}
              </div>
              <button
                onClick={startTimer}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  isTimerRunning ? 'bg-emergency hover:bg-emergency-600 text-white' : 'bg-success hover:bg-success-600 text-white'
                }`}
              >
                {isTimerRunning ? 'Pausar' : 'Iniciar'} Cronômetro
              </button>
            </div>
          )}

          {/* Cronômetro para crise epiléptica */}
          {selectedEmergency === 'epileptica' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-trust">
                ⏱️ Cronômetro da Convulsão
              </h3>
              <div className="text-4xl font-bold text-trust mb-2">
                {formatTime(timer)}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {timer >= 300 ? '🚨 Mais de 5 minutos! Ligue 192 AGORA!' : 'Cronometrando a convulsão...'}
              </p>
              <button
                onClick={startTimer}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  isTimerRunning ? 'bg-trust hover:bg-trust-600 text-white' : 'bg-success hover:bg-success-600 text-white'
                }`}
              >
                {isTimerRunning ? 'Pausar' : 'Iniciar'} Cronômetro
              </button>
            </div>
          )}

          {/* Espaço extra para evitar sobreposição com o botão SAMU */}
          <div className="h-32"></div>
        </div>

        {/* Botão SAMU fixo */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={callSAMU}
            className="emergency-button text-xl px-8 py-4 animate-pulse-glow"
          >
            <Phone size={24} className="mr-2" />
            🚑 LIGUE 192 - SAMU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all mb-6 mx-auto"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao Início</span>
        </button>
        
        <h1 className="text-4xl md:text-5xl font-bold text-emergency mb-4">
          🚨 Emergência Agora!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Escolha a situação de emergência e siga as instruções imediatamente
        </p>
      </div>

      {/* Cards de emergência */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {emergencies.map((emergency) => (
            <div
              key={emergency.id}
              onClick={() => setSelectedEmergency(emergency.id)}
              className={`${emergency.color} text-white p-8 rounded-2xl cursor-pointer card-hover shadow-lg`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{emergency.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{emergency.title}</h3>
                <p className="text-lg opacity-90 mb-4">{emergency.description}</p>
                <div className="flex items-center justify-center text-white font-semibold">
                  <span>Ver Instruções</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aviso importante */}
        <div className="bg-emergency text-white p-6 rounded-2xl text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">⚡ Importante!</h2>
          <p className="text-lg mb-4">
            Em emergências graves, sempre ligue primeiro para o SAMU (192)
          </p>
          <div className="flex justify-center space-x-8 text-xl font-bold">
            <div>🚑 SAMU: 192</div>
            <div>🚒 Bombeiros: 193</div>
            <div>👮 Polícia: 190</div>
          </div>
        </div>
      </div>

      {/* Botão SAMU fixo */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={callSAMU}
          className="emergency-button text-xl px-8 py-4 animate-pulse-glow"
        >
          <Phone size={24} className="mr-2" />
          🚑 LIGUE 192 - SAMU
        </button>
      </div>
    </div>
  );
};

export default ModoRapido;
