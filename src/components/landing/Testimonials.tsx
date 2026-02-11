export default function Testimonials() {
  const testimonials = [
    {
      quote: "After 3 months of shadowing practice, native speakers started complimenting my accent!",
      author: "Maria K.",
      language: "Spanish learner",
    },
    {
      quote: "Finally a tool that focuses on pronunciation. My listening comprehension improved too.",
      author: "James T.",
      language: "Japanese learner",
    },
    {
      quote: "I use this during my commute. 10 minutes a day made a huge difference.",
      author: "Sophie L.",
      language: "French learner",
    },
  ];

  return (
    <section className="py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
          What Learners Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-amber-800 italic mb-4">"{t.quote}"</p>
              <p className="font-bold text-amber-900">{t.author}</p>
              <p className="text-amber-600 text-sm">{t.language}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
