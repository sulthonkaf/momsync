export default function Features() {
  const features = [
    {
      title: "Personalized Guidance",
      description: "AI-powered recommendations tailored to your pregnancy stage and health profile.",
      icon: "📋",
    },
    {
      title: "Expert Consultations",
      description: "Connect with certified healthcare professionals for personalized advice.",
      icon: "👨‍⚕️",
    },
    {
      title: "Nutrition Tracking",
      description: "Monitor nutrition intake and get meal recommendations for optimal fetal development.",
      icon: "🥗",
    },
    {
      title: "Growth Monitoring",
      description: "Track your child's growth milestones and receive early intervention alerts.",
      icon: "📈",
    },
    {
      title: "Community Support",
      description: "Connect with other mothers and share experiences in a safe, supportive environment.",
      icon: "👥",
    },
    {
      title: "Educational Resources",
      description: "Access comprehensive articles, videos, and guides on maternal and child health.",
      icon: "📚",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features for Every Stage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ensure a healthy pregnancy and child development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
