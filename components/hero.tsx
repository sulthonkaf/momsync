export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Trusted by Healthcare Professionals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Expert-Guided Maternal Health Platform
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MomSync connects you with certified healthcare professionals—doctors, midwives, nutritionists, and
              specialists—to provide personalized guidance throughout your pregnancy and early childhood journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Start Free Trial
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <img
              src="/pregnant-woman-with-healthcare-app-on-phone.jpg"
              alt="MomSync App"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
