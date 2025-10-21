"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Features() {
  const [activeTab, setActiveTab] = useState(0)

  const featureCategories = [
    {
      title: "Pregnancy Support",
      description: "Comprehensive guidance throughout your pregnancy journey",
      features: [
        {
          title: "Weekly Updates",
          description: "Get personalized updates about your baby's development each week",
          icon: "📅",
        },
        {
          title: "Symptom Tracker",
          description: "Track symptoms and get insights about what's normal",
          icon: "📊",
        },
        {
          title: "Nutrition Guide",
          description: "Customized nutrition recommendations for each trimester",
          icon: "🥗",
        },
        {
          title: "Exercise Plans",
          description: "Safe, trimester-appropriate exercise routines",
          icon: "🏃",
        },
      ],
    },
    {
      title: "Expert Access",
      description: "Connect with healthcare professionals anytime",
      features: [
        {
          title: "Video Consultations",
          description: "Schedule video calls with certified healthcare providers",
          icon: "📹",
        },
        {
          title: "Chat Support",
          description: "Get quick answers from healthcare professionals",
          icon: "💬",
        },
        {
          title: "Medical Records",
          description: "Securely store and share your medical history",
          icon: "📋",
        },
        {
          title: "Prescription Management",
          description: "Track and manage your medications safely",
          icon: "💊",
        },
      ],
    },
    {
      title: "Child Development",
      description: "Monitor your child's growth and development",
      features: [
        {
          title: "Growth Tracking",
          description: "Monitor height, weight, and developmental milestones",
          icon: "📈",
        },
        {
          title: "Milestone Alerts",
          description: "Get notified about important developmental milestones",
          icon: "🎯",
        },
        {
          title: "Vaccination Schedule",
          description: "Never miss a vaccination with our smart reminders",
          icon: "💉",
        },
        {
          title: "Nutrition Plans",
          description: "Age-appropriate feeding and nutrition guidance",
          icon: "🍼",
        },
      ],
    },
    {
      title: "Community & Learning",
      description: "Learn from experts and connect with other mothers",
      features: [
        {
          title: "Expert Articles",
          description: "Read evidence-based articles from healthcare professionals",
          icon: "📚",
        },
        {
          title: "Video Courses",
          description: "Complete courses on pregnancy, birth, and parenting",
          icon: "🎓",
        },
        {
          title: "Community Forum",
          description: "Connect with other mothers and share experiences",
          icon: "👥",
        },
        {
          title: "Live Webinars",
          description: "Join live sessions with experts and specialists",
          icon: "🎤",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Powerful Features for Every Stage</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From pregnancy planning to child development, MomSync provides comprehensive support at every step of your
            journey.
          </p>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {featureCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {featureCategories[activeTab].title}
              </h2>
              <p className="text-lg text-muted-foreground">{featureCategories[activeTab].description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featureCategories[activeTab].features.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">Why Choose MomSync?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Privacy & Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your health data is encrypted and protected with enterprise-grade security. We never share your
                information without consent.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Evidence-Based</h3>
              <p className="text-muted-foreground leading-relaxed">
                All content is reviewed by healthcare professionals and based on the latest medical research and
                guidelines.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Accessible Globally</h3>
              <p className="text-muted-foreground leading-relaxed">
                Available in multiple languages and designed for low-bandwidth environments to reach mothers worldwide.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Mobile First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fully optimized for mobile devices so you can access support anytime, anywhere, on any device.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Community Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with thousands of mothers, share experiences, and build a supportive community around you.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant notifications about important health information, appointments, and community updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-bold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-foreground">Free</th>
                  <th className="text-center py-4 px-4 font-bold text-foreground">Premium</th>
                  <th className="text-center py-4 px-4 font-bold text-foreground">Professional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Pregnancy Tracking", free: true, premium: true, professional: true },
                  { feature: "Expert Articles", free: true, premium: true, professional: true },
                  { feature: "Community Access", free: true, premium: true, professional: true },
                  { feature: "Video Consultations", free: false, premium: true, professional: true },
                  { feature: "Priority Support", free: false, premium: true, professional: true },
                  { feature: "Personalized Plans", free: false, premium: true, professional: true },
                  { feature: "Medical Records", free: false, premium: false, professional: true },
                  { feature: "Dedicated Advisor", free: false, premium: false, professional: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-primary/5 transition">
                    <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">{row.free ? "✓" : "—"}</td>
                    <td className="py-4 px-4 text-center">{row.premium ? "✓" : "—"}</td>
                    <td className="py-4 px-4 text-center">{row.professional ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
