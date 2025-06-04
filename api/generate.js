export default function handler(req, res) {
  const { description, genre } = req.body || {};

  const fallbackNames = {
    tech: [
      'Techify', 'InnoBot', 'CodePulse', 'NextGen AI', 'CyberNest', 'ByteWave', 
      'QuantumLeap', 'AlgoSpark', 'PixelForge', 'DataHive', 'NeuraLink', 'BotForge',
      'CircuitFlow', 'NanoCore', 'SynthWave', 'LogicNest', 'ByteCraft', 'CloudMinds',
      'CyberBloom', 'AI Nexus', 'TechNest', 'PulseCode', 'CoreBot', 'MatrixLabs'
    ],
    food: [
      'TastyBite', 'YumYum AI', 'FoodiePal', 'Snackify', 'BiteCraft', 'FlavorLoop', 
      'DelishHub', 'GrubNest', 'Epicurean AI', 'NoshPoint', 'SavorySpot', 'CraveBot',
      'BiteWave', 'SavorNest', 'FreshFork', 'Cooksy', 'TasteLab', 'FlavorHive',
      'SnackLab', 'DishBot', 'MunchNest', 'GourmetLoop', 'BiteNest', 'FoodFlick'
    ],
    fashion: [
      'StyleMate', 'Trendify', 'ChicAI', 'GlamourBot', 'VogueWave', 'ModaPulse', 
      'CoutureLab', 'FashionNest', 'EleganceAI', 'RunwayBot', 'StyleHive', 'DressCode',
      'GlamNest', 'FashionFlow', 'ModaNest', 'TrendLoop', 'ChicNest', 'VogueBot',
      'StylePulse', 'CoutureWave', 'RunwayNest', 'EleganceLoop', 'TrendHive', 'FashionCraft'
    ],
    school: [
      'LearnLoop', 'EduGenie', 'SmartClass', 'BrainBoost', 'StudyBuddy', 'ClassNest', 
      'Knowly', 'TutorBot', 'MindSpring', 'Academia AI', 'QuizMaster', 'ScholarHub',
      'EduNest', 'ClassWave', 'BrightMinds', 'StudyNest', 'TutorLoop', 'BrainWave',
      'LearnNest', 'SmartTutor', 'QuizNest', 'KnowledgeBot', 'EduCraft', 'SchoolFlow'
    ],
    general: [
      'NameZap', 'IdeaForge', 'BrandSpark', 'CatchyName', 'NameNest', 'ZapGenie', 
      'BrandBot', 'SparkLab', 'IdeaPulse', 'NameWave', 'CatchyNest', 'FreshBrand',
      'ZapNest', 'BrandLoop', 'IdeaNest', 'CatchyBot', 'SparkNest', 'NameCraft',
      'BrandFlow', 'IdeaBloom', 'NameForge', 'CatchyPulse', 'ZapBot', 'FreshNest'
    ],
  };

  const names = fallbackNames[genre] || fallbackNames.general;

  res.status(200).json({ names });
}
