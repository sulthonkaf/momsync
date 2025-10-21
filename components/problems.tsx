export default function Problems() {
  const problems = [
    {
      number: "1",
      title: "Lack of Guidance",
      description:
        "Many mothers lack access to reliable, personalized maternal health information during pregnancy and early childhood.",
    },
    {
      number: "2",
      title: "Stunting Risk",
      description:
        "Stunting affects millions of children globally. Early intervention and proper nutrition are critical for prevention.",
    },
    {
      number: "3",
      title: "Limited Access",
      description:
        "Healthcare professionals are often unavailable or inaccessible, especially in underserved communities.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Challenge We're Solving</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maternal health and child development require comprehensive support and guidance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.number}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition"
            >
              <div className="text-5xl font-bold text-primary mb-4">{problem.number}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
