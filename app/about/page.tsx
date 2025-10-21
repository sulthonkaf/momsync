import Header from "@/components/header"
import Footer from "@/components/footer"

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Generasi Emas (Golden Generation)</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our mission is to create a golden generation of healthy, thriving children by empowering mothers with
              knowledge, support, and access to quality maternal healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                MomSync was founded with a simple yet powerful vision: to bridge the gap between maternal health
                education and real-world support. We recognized that millions of mothers around the world lack access to
                reliable, personalized guidance during one of the most critical periods of their lives.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Stunting affects over 149 million children globally, yet many cases are preventable through proper
                nutrition, healthcare, and education. We believe that every mother deserves access to the tools and
                knowledge needed to ensure her child's healthy development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, MomSync is committed to transforming maternal health outcomes and creating a generation of
                healthier, more resilient children.
              </p>
            </div>
            <div className="relative h-96">
              <img
                src="/diverse-mothers-community-support.jpg"
                alt="Our Community"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">Our Mission & Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower mothers with knowledge, support, and access to quality healthcare, ensuring healthy
                pregnancies and preventing child stunting globally.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Core Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Compassion and Care</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Evidence-Based Solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Accessibility for All</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Community Empowerment</span>
                </li>
              </ul>
            </div>

            {/* Impact */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to reducing stunting rates, improving maternal health outcomes, and creating lasting
                positive change in communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">Meet Our Team</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Dr. Sarah Mitchell", role: "Founder & CEO", specialty: "Maternal Health Expert" },
              { name: "Dr. James Chen", role: "Chief Medical Officer", specialty: "Pediatrician" },
              { name: "Maria Santos", role: "Head of Community", specialty: "Community Health Worker" },
              { name: "Alex Johnson", role: "CTO", specialty: "Healthcare Technology" },
            ].map((member, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <img
                  src={`/professional-headshot-.jpg?height=200&width=200&query=professional-headshot-${index}`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">50K+</div>
              <p className="text-primary-foreground/90">Active Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">15+</div>
              <p className="text-primary-foreground/90">Countries</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">100+</div>
              <p className="text-primary-foreground/90">Healthcare Partners</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">1M+</div>
              <p className="text-primary-foreground/90">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
