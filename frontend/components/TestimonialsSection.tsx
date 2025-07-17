import React, { useState } from 'react';

/**
 * Interface pour les témoignages
 */
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

/**
 * Composant TestimonialsSection
 * Section des témoignages clients avec carrousel
 */
export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Directrice Commerciale",
      company: "Auto Plus",
      content: "AutoPredict nous a permis d'optimiser nos prix de rachat. La précision est impressionnante !",
      rating: 5,
      avatar: "/assets/img/robot_1.png"
    },
    {
      id: 2,
      name: "Jean Martin",
      role: "Particulier",
      company: "",
      content: "J'ai vendu ma voiture 15% plus cher grâce à leur estimation. Un outil incontournable !",
      rating: 5,
      avatar: "/assets/img/robotwaving.png"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Gestionnaire de Flotte",
      company: "FleetMax",
      content: "Pour gérer notre parc automobile, AutoPredict est devenu notre référence pour les valorisations.",
      rating: 5,
      avatar: "/assets/img/robot_1.png"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="w-full max-w-6xl mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ce que disent nos utilisateurs
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Découvrez pourquoi des milliers d'utilisateurs font confiance à AutoPredict
        </p>
      </div>

      <div className="relative bg-slate-900/50 rounded-2xl border border-slate-800 p-8 overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Témoignage actuel */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
            
            <blockquote className="text-xl text-slate-200 italic mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <img 
                src={testimonials[currentTestimonial].avatar} 
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full border-2 border-cyan-400"
              />
              <div className="text-left">
                <div className="font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-slate-400 text-sm">
                  {testimonials[currentTestimonial].role}
                  {testimonials[currentTestimonial].company && 
                    ` chez ${testimonials[currentTestimonial].company}`
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
              aria-label="Témoignage précédent"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicateurs */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-cyan-400' : 'bg-slate-600'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
              aria-label="Témoignage suivant"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
