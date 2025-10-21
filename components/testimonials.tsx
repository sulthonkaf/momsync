export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Two",
      content: "MomSync gave me the confidence I needed during my pregnancy. The personalized guidance was invaluable.",
      avatar: "/diverse-woman-avatar.png",
    },
    {
      name: "Dr. Amelia Chen",
      role: "Pediatrician",
      content: "I recommend MomSync to all my patients. It bridges the gap between clinical care and daily support.",
      avatar: "/doctor-avatar.png",
    },
    {
      name: "Maria Rodriguez",
      role: "Healthcare Worker",
      content: "This platform has transformed how we reach mothers in underserved communities. Truly impactful.",
      avatar: "/healthcare-worker-avatar.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Mothers and Professionals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their MomSync experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
