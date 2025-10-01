import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  emoji: string;
}

interface QuizTopic {
  id: number;
  title: string;
  emoji: string;
  description: string;
  questions: Question[];
}

const Quiz = () => {
  useScrollToTop();
  
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const quizTopics: QuizTopic[] = [
    {
      id: 1,
      title: "Desmaio",
      emoji: "😵",
      description: "Perda súbita de consciência",
      questions: [
        {
          id: 1,
          question: "O que fazer PRIMEIRO ao encontrar alguém desmaiado?",
          options: [
            "Verificar se a pessoa responde e se o local é seguro",
            "Jogar água no rosto",
            "Levantar a pessoa imediatamente",
            "Dar tapinhas no rosto"
          ],
          correct: 0,
          explanation: "Sempre verifique a responsividade e a segurança do local antes de qualquer ação! 🛡️",
          emoji: "😵"
        },
        {
          id: 2,
          question: "A pessoa está inconsciente mas respirando. Qual posição é mais segura?",
          options: [
            "Posição lateral de segurança (de lado)",
            "Deitada de costas",
            "Sentada",
            "De bruços"
          ],
          correct: 0,
          explanation: "A posição lateral evita engasgo caso a pessoa vomite! 🌟",
          emoji: "😵"
        },
        {
          id: 3,
          question: "Quando NÃO devemos mover uma pessoa desmaiada?",
          options: [
            "Se houver suspeita de trauma na coluna ou cabeça",
            "Se estiver em local público",
            "Se estiver consciente",
            "Sempre podemos mover"
          ],
          correct: 0,
          explanation: "Mover alguém com trauma pode causar lesões graves! Só mova se houver perigo iminente. ⚠️",
          emoji: "😵"
        },
        {
          id: 4,
          question: "Após a pessoa acordar do desmaio, o que fazer?",
          options: [
            "Mantê-la deitada por alguns minutos e oferecer água",
            "Fazer ela levantar rapidamente",
            "Dar comida pesada",
            "Fazer exercícios"
          ],
          correct: 0,
          explanation: "Levantar muito rápido pode causar novo desmaio! 💧",
          emoji: "😵"
        },
        {
          id: 5,
          question: "Quando ligar para o SAMU (192) em caso de desmaio?",
          options: [
            "Se a pessoa não acordar em 1 minuto ou não estiver respirando",
            "Apenas se a pessoa pedir",
            "Só se houver sangramento",
            "Nunca é necessário"
          ],
          correct: 0,
          explanation: "Desmaio prolongado ou sem respiração é emergência! 🚨",
          emoji: "😵"
        }
      ]
    },
    {
      id: 2,
      title: "Engasgo",
      emoji: "🚫",
      description: "Obstrução das vias aéreas",
      questions: [
        {
          id: 1,
          question: "Uma pessoa está engasgada mas ainda consegue tossir. O que fazer?",
          options: [
            "Encorajar a continuar tossindo",
            "Aplicar manobra de Heimlich imediatamente",
            "Bater nas costas com força",
            "Dar água"
          ],
          correct: 0,
          explanation: "Se a pessoa tosse, o ar ainda passa! A tosse é a melhor forma de expelir o objeto. 👏",
          emoji: "🚫"
        },
        {
          id: 2,
          question: "A pessoa parou de tossir e não consegue falar. Qual técnica usar?",
          options: [
            "Manobra de Heimlich (compressões abdominais)",
            "Bater nas costas levemente",
            "Dar água",
            "Esperar passar"
          ],
          correct: 0,
          explanation: "Quando há obstrução total, Heimlich é essencial para salvar vidas! 🎯",
          emoji: "🚫"
        },
        {
          id: 3,
          question: "Como fazer a manobra de Heimlich?",
          options: [
            "Abraçar por trás e fazer compressões rápidas entre umbigo e costelas",
            "Pressionar o peito",
            "Bater nas costas",
            "Pressionar a garganta"
          ],
          correct: 0,
          explanation: "Compressões abdominais rápidas aumentam a pressão e expelem o objeto! 💪",
          emoji: "🚫"
        },
        {
          id: 4,
          question: "Bebê engasgado: qual a diferença no atendimento?",
          options: [
            "Usar apenas 2 dedos e alternar palmadas nas costas com compressões no peito",
            "Aplicar Heimlich normal",
            "Virar de cabeça para baixo",
            "Dar água"
          ],
          correct: 0,
          explanation: "Bebês são frágeis! Use técnica específica com 2 dedos. 👶",
          emoji: "🚫"
        },
        {
          id: 5,
          question: "Após desobstruir, o que fazer?",
          options: [
            "Levar ao médico mesmo se parecer bem",
            "Não é necessário atendimento se melhorou",
            "Dar comida para recuperar",
            "Deitar e dormir"
          ],
          correct: 0,
          explanation: "Pode haver lesões internas! Sempre procure avaliação médica. 🏥",
          emoji: "🚫"
        }
      ]
    },
    {
      id: 3,
      title: "Parada Cardíaca",
      emoji: "💔",
      description: "Coração parou de bater",
      questions: [
        {
          id: 1,
          question: "Como identificar uma parada cardíaca?",
          options: [
            "Pessoa não responde e não respira (ou respiração anormal)",
            "Pessoa está com dor no peito",
            "Pessoa está pálida",
            "Pessoa está tonta"
          ],
          correct: 0,
          explanation: "Sem resposta + sem respiração = parada cardíaca! Aja rápido! ⚡",
          emoji: "💔"
        },
        {
          id: 2,
          question: "Primeira ação em parada cardíaca?",
          options: [
            "Gritar por ajuda, ligar 192 e iniciar massagem cardíaca",
            "Dar respiração boca a boca",
            "Procurar um médico",
            "Esperar socorro chegar"
          ],
          correct: 0,
          explanation: "Cada segundo conta! Chame ajuda e inicie RCP imediatamente! 🚨",
          emoji: "💔"
        },
        {
          id: 3,
          question: "Qual o ritmo correto da massagem cardíaca?",
          options: [
            "100 a 120 compressões por minuto (ritmo da música 'Staying Alive')",
            "30 compressões por minuto",
            "Devagar e com calma",
            "O mais rápido possível"
          ],
          correct: 0,
          explanation: "Ritmo rápido mantém o sangue circulando! 🎵 Pense em 'Staying Alive'!",
          emoji: "💔"
        },
        {
          id: 4,
          question: "Onde pressionar durante a RCP?",
          options: [
            "Centro do peito, entre os mamilos",
            "Lado esquerdo do peito",
            "Barriga",
            "Pescoço"
          ],
          correct: 0,
          explanation: "Centro do peito garante compressão eficaz do coração! 🎯",
          emoji: "💔"
        },
        {
          id: 5,
          question: "Posso parar a RCP?",
          options: [
            "Apenas quando socorro chegar ou pessoa voltar a respirar",
            "Quando cansar",
            "Após 5 minutos",
            "Se não houver melhora rápida"
          ],
          correct: 0,
          explanation: "Continue até ajuda profissional! Você está mantendo a pessoa viva! 💪",
          emoji: "💔"
        }
      ]
    },
    {
      id: 4,
      title: "Crise Epiléptica",
      emoji: "⚡",
      description: "Convulsões e movimentos involuntários",
      questions: [
        {
          id: 1,
          question: "O que NÃO fazer durante uma convulsão?",
          options: [
            "Segurar a pessoa ou colocar objetos na boca",
            "Afastar objetos perigosos",
            "Proteger a cabeça",
            "Ficar ao lado"
          ],
          correct: 0,
          explanation: "NUNCA segure ou coloque nada na boca! Pode causar lesões graves! ⚠️",
          emoji: "⚡"
        },
        {
          id: 2,
          question: "Qual a melhor posição durante a convulsão?",
          options: [
            "Deixar no chão, afastando objetos ao redor",
            "Segurar sentado",
            "Colocar em pé",
            "Deitar na cama"
          ],
          correct: 0,
          explanation: "No chão a pessoa não cai! Afaste perigos mas não contenha. 🛡️",
          emoji: "⚡"
        },
        {
          id: 3,
          question: "Após a convulsão parar, o que fazer?",
          options: [
            "Colocar de lado e aguardar acordar",
            "Dar água imediatamente",
            "Fazer levantar rápido",
            "Dar comida"
          ],
          correct: 0,
          explanation: "Posição lateral é segura enquanto a pessoa se recupera! 🌟",
          emoji: "⚡"
        },
        {
          id: 4,
          question: "Quando ligar para o SAMU durante convulsão?",
          options: [
            "Se durar mais de 5 minutos ou houver lesões",
            "Apenas se a pessoa pedir depois",
            "Nunca é necessário",
            "Só na segunda convulsão"
          ],
          correct: 0,
          explanation: "Convulsão longa é emergência! Primeira vez também precisa avaliação! 🚨",
          emoji: "⚡"
        },
        {
          id: 5,
          question: "Como proteger a cabeça durante convulsão?",
          options: [
            "Colocar algo macio (roupa, travesseiro) sob a cabeça",
            "Segurar a cabeça com força",
            "Não precisa proteger",
            "Elevar a cabeça"
          ],
          correct: 0,
          explanation: "Proteção suave evita batidas, mas sem segurar! 🛡️",
          emoji: "⚡"
        }
      ]
    },
    {
      id: 5,
      title: "Hemorragia",
      emoji: "🩸",
      description: "Sangramento intenso",
      questions: [
        {
          id: 1,
          question: "Prioridade em sangramento intenso?",
          options: [
            "Aplicar pressão direta no ferimento com pano limpo",
            "Lavar o ferimento primeiro",
            "Colocar gelo",
            "Esperar parar sozinho"
          ],
          correct: 0,
          explanation: "Pressão direta estanca o sangramento! Use pano limpo. 🩹",
          emoji: "🩸"
        },
        {
          id: 2,
          question: "Se o sangramento não para com pressão, o que fazer?",
          options: [
            "Manter pressão e adicionar mais panos por cima",
            "Tirar o pano ensanguentado",
            "Jogar água",
            "Desistir da pressão"
          ],
          correct: 0,
          explanation: "Nunca tire o pano! Adicione mais por cima mantendo pressão. 💪",
          emoji: "🩸"
        },
        {
          id: 3,
          question: "Quando elevar o membro machucado?",
          options: [
            "Se não houver suspeita de fratura",
            "Sempre elevar",
            "Nunca elevar",
            "Só se a pessoa pedir"
          ],
          correct: 0,
          explanation: "Elevar ajuda a reduzir sangramento, mas só se não houver fratura! ⬆️",
          emoji: "🩸"
        },
        {
          id: 4,
          question: "O que NÃO usar em ferimentos com sangramento?",
          options: [
            "Torniquete caseiro (só em último caso e com orientação)",
            "Pano limpo",
            "Gaze",
            "Pressão direta"
          ],
          correct: 0,
          explanation: "Torniquete mal feito pode causar amputação! Só use em extremo risco de morte. ⚠️",
          emoji: "🩸"
        },
        {
          id: 5,
          question: "Sangramento nasal: o que fazer?",
          options: [
            "Sentar, inclinar cabeça para frente e apertar narinas",
            "Deitar de costas",
            "Jogar cabeça para trás",
            "Colocar papel no nariz"
          ],
          correct: 0,
          explanation: "Cabeça para frente evita engolir sangue! Aperte narinas por 10 min. 👃",
          emoji: "🩸"
        }
      ]
    },
    {
      id: 6,
      title: "Queimadura",
      emoji: "🔥",
      description: "Lesões causadas por calor",
      questions: [
        {
          id: 1,
          question: "Primeira ação em queimadura?",
          options: [
            "Resfriar com água corrente fria por 10-15 minutos",
            "Passar pasta de dente",
            "Estourar bolhas",
            "Passar manteiga"
          ],
          correct: 0,
          explanation: "Água fria remove o calor e alivia dor! Nunca use receitas caseiras! 🚿",
          emoji: "🔥"
        },
        {
          id: 2,
          question: "O que NUNCA fazer em queimadura?",
          options: [
            "Passar pasta de dente, manteiga ou óleos",
            "Resfriar com água",
            "Cobrir com pano limpo",
            "Procurar médico se grave"
          ],
          correct: 0,
          explanation: "Receitas caseiras pioram! Só água fria, pano limpo e médico se necessário. ❌",
          emoji: "🔥"
        },
        {
          id: 3,
          question: "Quando ir ao hospital em queimadura?",
          options: [
            "Se for grande, profunda, em rosto/mãos/genitais ou com bolhas grandes",
            "Apenas se doer muito",
            "Só se tiver febre",
            "Nunca é necessário"
          ],
          correct: 0,
          explanation: "Queimaduras graves precisam tratamento especializado! 🏥",
          emoji: "🔥"
        },
        {
          id: 4,
          question: "Como cobrir uma queimadura após resfriar?",
          options: [
            "Com pano limpo, úmido e sem apertar",
            "Com band-aid apertado",
            "Deixar descoberta",
            "Com algodão"
          ],
          correct: 0,
          explanation: "Pano limpo e úmido protege sem grudar na pele! 🩹",
          emoji: "🔥"
        },
        {
          id: 5,
          question: "Queimadura com roupa grudada: o que fazer?",
          options: [
            "Resfriar com água sem tirar a roupa e procurar médico",
            "Arrancar a roupa imediatamente",
            "Puxar devagar",
            "Cortar ao redor"
          ],
          correct: 0,
          explanation: "NUNCA arranque roupa grudada! Pode arrancar pele. Só médico remove. ⚕️",
          emoji: "🔥"
        }
      ]
    },
    {
      id: 7,
      title: "Queda/Fratura",
      emoji: "🦴",
      description: "Quedas e possíveis ossos quebrados",
      questions: [
        {
          id: 1,
          question: "Sinais de possível fratura?",
          options: [
            "Dor intensa, inchaço, deformidade e dificuldade de mover",
            "Apenas dor leve",
            "Só arranhões",
            "Vermelhidão"
          ],
          correct: 0,
          explanation: "Dor forte + inchaço + deformidade = suspeita de fratura! 🦴",
          emoji: "🦴"
        },
        {
          id: 2,
          question: "O que NUNCA fazer em suspeita de fratura?",
          options: [
            "Tentar colocar o osso no lugar ou fazer a pessoa andar",
            "Chamar ajuda",
            "Imobilizar",
            "Acalmar a pessoa"
          ],
          correct: 0,
          explanation: "Mover pode piorar MUITO! Só profissionais manipulam fraturas. ⚠️",
          emoji: "🦴"
        },
        {
          id: 3,
          question: "Como imobilizar até o socorro chegar?",
          options: [
            "Use objetos rígidos (revista, madeira) ao redor do membro",
            "Amarre bem apertado",
            "Balance o membro",
            "Não precisa imobilizar"
          ],
          correct: 0,
          explanation: "Imobilizar evita movimentos que pioram a lesão! 🛡️",
          emoji: "🦴"
        },
        {
          id: 4,
          question: "Fratura exposta (osso aparecendo): o que fazer?",
          options: [
            "Cobrir com pano limpo SEM tocar no osso e chamar SAMU",
            "Empurrar o osso para dentro",
            "Lavar com água",
            "Colocar gelo direto"
          ],
          correct: 0,
          explanation: "Fratura exposta é emergência grave! Só cubra e chame 192. 🚨",
          emoji: "🦴"
        },
        {
          id: 5,
          question: "Suspeita de fratura na coluna: o que fazer?",
          options: [
            "NÃO MOVER a pessoa de jeito nenhum e chamar SAMU",
            "Sentar a pessoa",
            "Virar de lado",
            "Ajudar a levantar"
          ],
          correct: 0,
          explanation: "Fratura na coluna pode causar paralisia se mover! Chame 192! ⚠️⚠️",
          emoji: "🦴"
        }
      ]
    },
    {
      id: 8,
      title: "Intoxicação",
      emoji: "☠️",
      description: "Envenenamento e intoxicações",
      questions: [
        {
          id: 1,
          question: "Alguém ingeriu produto químico: primeira ação?",
          options: [
            "Ligar para 192 ou Centro de Intoxicação (0800-722-6001)",
            "Provocar vômito imediatamente",
            "Dar leite",
            "Dar água com sal"
          ],
          correct: 0,
          explanation: "Especialistas sabem o antídoto! NUNCA provoque vômito sem orientação. ☎️",
          emoji: "☠️"
        },
        {
          id: 2,
          question: "Por que NÃO provocar vômito em intoxicação?",
          options: [
            "Produto pode queimar ainda mais ao voltar",
            "É desnecessário",
            "Sempre pode provocar",
            "Demora muito"
          ],
          correct: 0,
          explanation: "Produtos corrosivos queimam esôfago e boca ao voltar! ☠️",
          emoji: "☠️"
        },
        {
          id: 3,
          question: "O que guardar para levar ao hospital?",
          options: [
            "Embalagem do produto ou resto do que foi ingerido",
            "Não precisa guardar nada",
            "Apenas receita",
            "Só nota fiscal"
          ],
          correct: 0,
          explanation: "Embalagem ajuda médicos a identificar o antídoto correto! 📦",
          emoji: "☠️"
        },
        {
          id: 4,
          question: "Intoxicação alimentar: sintomas?",
          options: [
            "Náusea, vômito, diarreia, dor abdominal",
            "Apenas dor de cabeça",
            "Só febre",
            "Apenas cansaço"
          ],
          correct: 0,
          explanation: "Sintomas digestivos surgem horas após comer alimento contaminado. 🤢",
          emoji: "☠️"
        },
        {
          id: 5,
          question: "Inalação de gás ou fumaça tóxica: o que fazer?",
          options: [
            "Levar a pessoa para ar fresco imediatamente e chamar 192",
            "Dar água",
            "Fazer deitar",
            "Dar comida"
          ],
          correct: 0,
          explanation: "Ar puro é urgente! Saia do ambiente contaminado rápido. 💨",
          emoji: "☠️"
        }
      ]
    },
    {
      id: 9,
      title: "Ansiedade/Pânico",
      emoji: "😰",
      description: "Crises de ansiedade e ataques de pânico",
      questions: [
        {
          id: 1,
          question: "Como identificar uma crise de pânico?",
          options: [
            "Respiração rápida, tremores, coração acelerado, sensação de morte",
            "Apenas tristeza",
            "Só cansaço",
            "Apenas fome"
          ],
          correct: 0,
          explanation: "Sintomas físicos intensos caracterizam crise de pânico! 😰",
          emoji: "😰"
        },
        {
          id: 2,
          question: "Melhor forma de ajudar em crise de ansiedade?",
          options: [
            "Ajudar a respirar devagar (inspire 4, segure 4, expire 6)",
            "Falar 'calma, não é nada'",
            "Dar água gelada",
            "Deixar sozinho"
          ],
          correct: 0,
          explanation: "Respiração controlada acalma o corpo! Conte junto. 🫁",
          emoji: "😰"
        },
        {
          id: 3,
          question: "O que NÃO dizer para alguém em crise de ansiedade?",
          options: [
            "'Calma, não é nada' ou 'você está exagerando'",
            "'Estou aqui com você'",
            "'Vamos respirar juntos'",
            "'Você está seguro'"
          ],
          correct: 0,
          explanation: "Invalidar o que a pessoa sente piora a crise! Seja empático. 💙",
          emoji: "😰"
        },
        {
          id: 4,
          question: "Técnica do 5-4-3-2-1 para ansiedade serve para quê?",
          options: [
            "Focar nos sentidos e trazer para o presente",
            "Contar até dormir",
            "Fazer exercícios",
            "Medir pressão"
          ],
          correct: 0,
          explanation: "5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que prova = foco no agora! 🧠",
          emoji: "😰"
        },
        {
          id: 5,
          question: "Quando procurar ajuda profissional?",
          options: [
            "Se crises são frequentes ou afetam vida diária",
            "Apenas se durar dias",
            "Só quando muito grave",
            "Nunca é necessário"
          ],
          correct: 0,
          explanation: "Psicólogo/psiquiatra podem ensinar técnicas e tratar a causa! 🩺",
          emoji: "😰"
        }
      ]
    },
    {
      id: 10,
      title: "Cortes e Ferimentos",
      emoji: "🩹",
      description: "Lesões cortantes e feridas",
      questions: [
        {
          id: 1,
          question: "Primeiro passo em um corte leve?",
          options: [
            "Lavar com água corrente e sabão neutro",
            "Soprar no ferimento",
            "Lamber o corte",
            "Passar álcool direto"
          ],
          correct: 0,
          explanation: "Lavar remove sujeira e bactérias! Água e sabão são ideais. 🚿",
          emoji: "🩹"
        },
        {
          id: 2,
          question: "Após lavar, como cobrir o ferimento?",
          options: [
            "Com curativo limpo ou band-aid",
            "Deixar descoberto na rua",
            "Cobrir com folha",
            "Passar pomada sem lavar"
          ],
          correct: 0,
          explanation: "Curativo protege de contaminação e ajuda cicatrização! 🩹",
          emoji: "🩹"
        },
        {
          id: 3,
          question: "Quando procurar médico em cortes?",
          options: [
            "Se for profundo, sangramento intenso ou em rosto/mãos",
            "Apenas se doer muito",
            "Só se tiver febre",
            "Nunca é necessário"
          ],
          correct: 0,
          explanation: "Cortes profundos podem precisar de pontos! 🏥",
          emoji: "🩹"
        },
        {
          id: 4,
          question: "Objeto encravado no ferimento: o que fazer?",
          options: [
            "NÃO TIRAR! Imobilizar o objeto e ir ao hospital",
            "Puxar o objeto imediatamente",
            "Empurrar mais para dentro",
            "Girar o objeto"
          ],
          correct: 0,
          explanation: "Tirar pode causar hemorragia grave! Só médico remove. ⚠️",
          emoji: "🩹"
        },
        {
          id: 5,
          question: "Sinais de infecção em ferimento?",
          options: [
            "Vermelhidão crescente, calor, inchaço, pus",
            "Apenas dor leve",
            "Só coceira",
            "Cicatriz"
          ],
          correct: 0,
          explanation: "Infecção precisa tratamento médico! Pode precisar antibiótico. 🦠",
          emoji: "🩹"
        }
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === selectedTopic!.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < selectedTopic!.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / selectedTopic!.questions.length) * 100;
    if (percentage >= 80) return "🏆 Socorrista Teen Expert! Você arrasou!";
    if (percentage >= 60) return "🥉 Socorrista Teen! Muito bem, continue praticando!";
    if (percentage >= 40) return "📚 Quase lá! Estude um pouco mais e tente novamente!";
    return "💪 Não desista! Estude o conteúdo e tente novamente!";
  };

  const getScoreEmoji = () => {
    const percentage = (score / selectedTopic!.questions.length) * 100;
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "😊";
    if (percentage >= 40) return "🤔";
    return "😅";
  };

  // Result Screen
  if (showResult && selectedTopic) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">{getScoreEmoji()}</div>
              <h1 className="text-4xl font-bold mb-4 text-trust">
                Quiz Finalizado!
              </h1>
              
              <div className="text-6xl font-bold text-emergency mb-4">
                {score}/{selectedTopic.questions.length}
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                {getScoreMessage()}
              </p>
              
              {score < selectedTopic.questions.length && (
                <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
                  <p className="text-blue-800">
                    💡 <strong>Dica:</strong> Converse com o SOCORRO IA para aprender mais sobre {selectedTopic.title}!
                  </p>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-bold mb-2">🎯 Seu Desempenho:</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-success h-4 rounded-full transition-all duration-1000" 
                    style={{ width: `${(score / selectedTopic.questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round((score / selectedTopic.questions.length) * 100)}% de acertos
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetQuiz}
                  className="trust-button text-lg py-4 px-8"
                >
                  🔄 Escolher Outro Quiz
                </button>
                <button 
                  onClick={() => window.location.href = '/socorro-ia'}
                  className="success-button text-lg py-4 px-8"
                >
                  💬 Ir para SOCORRO IA
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Quiz in Progress
  if (selectedTopic) {
    const currentQ = selectedTopic.questions[currentQuestion];

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-2">{selectedTopic.emoji}</div>
              <h1 className="text-4xl font-bold text-trust mb-2">Quiz: {selectedTopic.title}</h1>
              <p className="text-xl text-gray-600">
                {selectedTopic.description}
              </p>
            </div>
            
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pergunta {currentQuestion + 1} de {selectedTopic.questions.length}
                </span>
                <span className="text-sm font-medium text-trust">
                  Score: {score}/{currentQuestion + (answered ? 1 : 0)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-trust h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / selectedTopic.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{currentQ.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
                  
                  if (answered) {
                    if (index === currentQ.correct) {
                      buttonClass += "bg-success-100 border-success text-success-700 font-semibold";
                    } else if (index === selectedAnswer) {
                      buttonClass += "bg-emergency-100 border-emergency text-emergency-700";
                    } else {
                      buttonClass += "bg-gray-100 border-gray-200 text-gray-500";
                    }
                  } else {
                    buttonClass += "bg-white border-gray-200 hover:border-trust hover:bg-trust-50 text-gray-700";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answered}
                      className={buttonClass}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)})
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {answered && (
                <div className="mt-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h4 className="font-bold text-blue-800 mb-1">Explicação:</h4>
                        <p className="text-blue-700">{currentQ.explanation}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedAnswer !== currentQ.correct && (
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-300">
                      <p className="text-orange-800 text-sm">
                        💬 <strong>Dica:</strong> Converse com o SOCORRO IA para entender melhor essa situação!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Next indicator */}
            {answered && currentQuestion < selectedTopic.questions.length - 1 && (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <span>Próxima pergunta em</span>
                  <div className="w-6 h-6 border-2 border-trust border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Topic Selection Screen
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-trust mb-4">
            ❓ Quiz Socorro Teen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha um tema e teste seus conhecimentos em primeiros socorros!<br />
            Cada quiz tem 5 perguntas práticas e úteis.
          </p>
        </div>

        {/* Quiz Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quizTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer card-hover"
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{topic.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {topic.description}
                </p>
                <div className="text-trust font-semibold text-sm">
                  📝 {topic.questions.length} perguntas
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-6 rounded-2xl mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-bold mb-2 text-blue-800">Como Funciona?</h3>
            <p className="text-blue-700">
              Escolha um tema, responda 5 perguntas e receba feedback imediato com explicações!
              Se errar, o SOCORRO IA pode te ajudar a aprender mais.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
