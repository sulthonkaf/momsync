"use client"

import { Badge } from "@/components/ui/badge"

export default function Experts() {
  const experts = [
    {
      name: "Dr. Siti Nurhaliza",
      role: "Obstetrics & Gynecology Specialist",
      expertise: ["Prenatal Care", "High-Risk Pregnancy", "Labor Management"],
      credentials: "MD, SPOG, 15+ years experience",
      image: "/female-doctor-obgyn.jpg",
      bio: "Specializes in comprehensive prenatal care and managing complex pregnancies with evidence-based protocols.",
    },
    {
      name: "Bidan Eka Wijaya",
      role: "Certified Midwife",
      expertise: ["Natural Birth", "Postpartum Care", "Lactation Support"],
      credentials: "Bidan Profesional, 12+ years experience",
      image: "/female-midwife-healthcare.jpg",
      bio: "Expert in supporting natural birth processes and providing compassionate postpartum care for mothers.",
    },
    {
      name: "Dr. Bambang Sutrisno",
      role: "Pediatrician & Child Development",
      expertise: ["Child Growth", "Nutrition", "Development Screening"],
      credentials: "MD, Sp.A, 18+ years experience",
      image: "/male-doctor-pediatrician.jpg",
      bio: "Dedicated to monitoring child development and preventing stunting through early intervention.",
    },
    {
      name: "Rini Kusuma, S.Gz",
      role: "Clinical Nutritionist",
      expertise: ["Maternal Nutrition", "Meal Planning", "Supplementation"],
      credentials: "Registered Dietitian, 10+ years experience",
      image: "/female-nutritionist-healthcare.jpg",
      bio: "Provides personalized nutrition guidance for optimal maternal and fetal health outcomes.",
    },
    {
      name: "Dr. Hendra Wijaya",
      role: "Mental Health Specialist",
      expertise: ["Perinatal Mental Health", "Anxiety Management", "Counseling"],
      credentials: "MD, Psychiatrist, 14+ years experience",
      image: "/male-doctor-psychiatrist.jpg",
      bio: "Specializes in supporting maternal mental health and preventing postpartum depression.",
    },
    {
      name: "Ibu Sinta Rahayu",
      role: "Community Health Worker",
      expertise: ["Community Outreach", "Health Education", "Support Groups"],
      credentials: "CHW Certified, 20+ years experience",
      image: "/female-community-health-worker.jpg",
      bio: "Bridges healthcare services with communities, ensuring accessible maternal health support.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Expert Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Healthcare Professionals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MomSync is backed by a team of experienced healthcare professionals dedicated to supporting your maternal
            health journey
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{expert.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{expert.role}</p>

                {/* Credentials */}
                <p className="text-xs text-muted-foreground mb-4 font-medium">{expert.credentials}</p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{expert.bio}</p>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <p className="text-muted-foreground">Healthcare Professionals</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500K+</div>
            <p className="text-muted-foreground">Mothers Supported</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">User Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
