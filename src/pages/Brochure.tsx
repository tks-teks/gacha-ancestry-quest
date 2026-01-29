import { 
  QrCode, 
  Box, 
  MessageCircle, 
  Images, 
  Volume2, 
  Home, 
  Leaf, 
  BookOpen,
  Smartphone,
  Sparkles,
  Globe
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-amber-700" />
    </div>
    <div className="min-w-0">
      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Brochure = () => {
  return (
    <div className="bg-white min-h-screen print:bg-white">
      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-break {
            page-break-before: always;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Print button - hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button 
          onClick={() => window.print()}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-amber-700 transition-colors font-medium"
        >
          🖨️ Imprimer la brochure
        </button>
      </div>

      {/* PAGE 1 */}
      <div className="w-full max-w-[297mm] mx-auto bg-gradient-to-br from-amber-50 to-orange-50 print:max-w-none" style={{ minHeight: '210mm' }}>
        <div className="p-8 print:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-amber-900">
                Fondation Jean-Félicien Gacha
              </h1>
              <p className="text-lg text-amber-700 mt-1">
                Application de visite interactive du patrimoine culturel camerounais
              </p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left column - App description */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl p-5 shadow-md border border-amber-200 h-full">
                <h2 className="text-xl font-serif font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  L'Application
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Une expérience immersive de découverte du patrimoine culturel camerounais, 
                  conçue pour les visiteurs du Centre JLD à Bangoulap.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    100% gratuite
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Accessible sur mobile
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Multilingue (FR)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Réalité Augmentée
                  </div>
                </div>

                <div className="mt-5 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 font-medium text-center">
                    📱 Scannez les QR codes dans le musée pour découvrir chaque objet
                  </p>
                </div>
              </div>
            </div>

            {/* Middle column - Screenshots mockup */}
            <div className="col-span-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-xl h-full flex flex-col">
                <h3 className="text-white text-sm font-medium mb-3 text-center">Aperçu de l'interface</h3>
                
                {/* Phone mockup */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    {/* Phone frame */}
                    <div className="w-36 h-72 bg-black rounded-3xl p-1.5 shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-b from-amber-100 to-orange-100 rounded-2xl overflow-hidden relative">
                        {/* Screen content mockup */}
                        <div className="h-8 bg-amber-600 flex items-center justify-center">
                          <span className="text-white text-[8px] font-medium">Fondation Gacha</span>
                        </div>
                        
                        {/* Hero image placeholder */}
                        <div className="h-20 bg-gradient-to-b from-amber-400 to-amber-600 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Home className="w-6 h-6 mx-auto mb-1" />
                            <span className="text-[6px]">Case Obus</span>
                          </div>
                        </div>
                        
                        {/* Cards */}
                        <div className="p-2 space-y-1.5">
                          <div className="bg-white rounded p-1.5 shadow-sm flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-amber-200 flex items-center justify-center">
                              <Box className="w-2 h-2 text-amber-700" />
                            </div>
                            <span className="text-[6px] text-gray-700">Visualisation 3D</span>
                          </div>
                          <div className="bg-white rounded p-1.5 shadow-sm flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-green-200 flex items-center justify-center">
                              <MessageCircle className="w-2 h-2 text-green-700" />
                            </div>
                            <span className="text-[6px] text-gray-700">Chat avec l'ancêtre</span>
                          </div>
                          <div className="bg-white rounded p-1.5 shadow-sm flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-blue-200 flex items-center justify-center">
                              <Images className="w-2 h-2 text-blue-700" />
                            </div>
                            <span className="text-[6px] text-gray-700">Galerie photos</span>
                          </div>
                        </div>
                        
                        {/* Bottom nav */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white border-t border-gray-200 flex items-center justify-around px-2">
                          <Home className="w-3 h-3 text-amber-600" />
                          <QrCode className="w-3 h-3 text-gray-400" />
                          <Leaf className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-[10px] text-center mt-2">
                  Interface optimisée pour smartphone
                </p>
              </div>
            </div>

            {/* Right column - Key features */}
            <div className="col-span-1 space-y-3">
              <h2 className="text-lg font-serif font-bold text-amber-900 mb-2">
                Fonctionnalités principales
              </h2>
              
              <FeatureCard 
                icon={QrCode}
                title="Scanner QR Code"
                description="Scannez les codes sur chaque objet pour accéder instantanément à sa fiche descriptive complète."
              />
              
              <FeatureCard 
                icon={Box}
                title="Visualisation 3D & AR"
                description="Explorez les objets en 3D et projetez-les dans votre environnement grâce à la réalité augmentée."
              />
              
              <FeatureCard 
                icon={MessageCircle}
                title="Chat avec l'Ancêtre"
                description="Dialoguez avec un sage virtuel qui partage l'histoire et les traditions de chaque objet."
              />
              
              <FeatureCard 
                icon={Volume2}
                title="Audio-guide"
                description="Écoutez les descriptions narratives grâce à la synthèse vocale intégrée."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between">
            <p className="text-xs text-amber-700">
              Centre JLD • Bangoulap, Cameroun
            </p>
            <p className="text-xs text-amber-600 font-medium">
              gacha-ancestry-quest.lovable.app
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page-break w-full max-w-[297mm] mx-auto bg-gradient-to-br from-green-50 to-emerald-50 print:max-w-none" style={{ minHeight: '210mm' }}>
        <div className="p-8 print:p-6">
          {/* Header page 2 */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-green-900">
              Contenu culturel & Sections thématiques
            </h2>
            <p className="text-green-700 mt-1">
              Découvrez la richesse du patrimoine camerounais à travers nos collections
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 - Heritage Objects */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-green-200">
                <h3 className="text-lg font-serif font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Objets patrimoniaux
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 text-sm">Case Obus Mousgoum</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Architecture traditionnelle unique construite par les femmes. 
                      Modèle 3D interactif avec annotations détaillées.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 text-sm">Sculpture Recyclée</h4>
                    <p className="text-xs text-purple-700 mt-1">
                      Œuvre d'art contemporain en matériaux recyclés. 
                      Représentation 3D procédurale interactive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-green-200">
                <h3 className="text-lg font-serif font-bold text-green-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Livre d'or numérique
                </h3>
                <p className="text-sm text-gray-600">
                  Les visiteurs peuvent laisser leurs impressions et émotions 
                  pour chaque objet visité, créant une mémoire collective.
                </p>
              </div>
            </div>

            {/* Column 2 - Houses */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-green-200 h-full">
                <h3 className="text-lg font-serif font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Maisons de Patrimoine
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Trois styles architecturaux représentatifs des peuples du Cameroun :
                </p>
                
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-16 h-12 rounded bg-gradient-to-br from-amber-300 to-amber-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-lg">🏠</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Maison Mousgoum</h4>
                      <p className="text-xs text-gray-600">Architecture en terre crue, forme obus caractéristique</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-16 h-12 rounded bg-gradient-to-br from-green-300 to-green-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-lg">🏡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Maison Bamiléké</h4>
                      <p className="text-xs text-gray-600">Toiture en paille, sculptures traditionnelles</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-16 h-12 rounded bg-gradient-to-br from-orange-300 to-red-400 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-lg">⛺</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Maison Bororo</h4>
                      <p className="text-xs text-gray-600">Habitat nomade des éleveurs peuls</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 - Botanical Garden */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-green-200">
                <h3 className="text-lg font-serif font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Jardin Botanique
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Collection de 8 plantes médicinales traditionnelles avec leurs usages thérapeutiques :
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Neem", use: "Antipaludéen" },
                    { name: "Moringa", use: "Nutritif" },
                    { name: "Artemisia", use: "Antipaludéen" },
                    { name: "Kinkeliba", use: "Digestif" },
                    { name: "Eucalyptus", use: "Respiratoire" },
                    { name: "Gingembre", use: "Anti-inflammatoire" },
                    { name: "Aloe Vera", use: "Cicatrisant" },
                    { name: "Cola", use: "Stimulant" },
                  ].map((plant) => (
                    <div key={plant.name} className="p-2 bg-green-50 rounded text-xs">
                      <span className="font-medium text-green-800">{plant.name}</span>
                      <span className="text-green-600 block">{plant.use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-md text-white">
                <h3 className="text-sm font-bold mb-3">Technologies utilisées</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind CSS", "Three.js", "WebXR", "IA Générative"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer page 2 */}
          <div className="mt-6 pt-4 border-t border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">
                  Application développée avec Lovable
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Pour la Fondation Jean-Félicien Gacha • Préservation du patrimoine camerounais
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600">
                  Contact : fondation.gacha@example.com
                </p>
                <p className="text-xs text-green-600">
                  © 2025 Tous droits réservés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
