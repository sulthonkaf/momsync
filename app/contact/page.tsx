"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Contact() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const faqs = [
    {
      question: "Is MomSync available in my country?",
      answer:
        "MomSync is currently available in 15+ countries across Asia, Africa, and Latin America. We're expanding to new regions regularly. Check our website or contact us to see if we're available in your area.",
    },
    {
      question: "How much does MomSync cost?",
      answer:
        "MomSync offers a free tier with basic features, premium plans starting at $9.99/month, and professional plans for healthcare providers. All plans include access to our community and educational resources.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, we use enterprise-grade encryption and comply with international healthcare data protection standards including HIPAA and GDPR. Your data is never shared without your explicit consent.",
    },
    {
      question: "Can I consult with a doctor through MomSync?",
      answer:
        "Yes! Premium and Professional plan members can schedule video consultations with certified healthcare professionals. You can also use our chat feature for quick questions.",
    },
    {
      question: "What if I have concerns about my pregnancy?",
      answer:
        "If you have urgent medical concerns, please contact your local healthcare provider or emergency services immediately. MomSync is a supportive tool, not a replacement for professional medical care.",
    },
    {
      question: "Can I use MomSync after my baby is born?",
      answer:
        "MomSync supports you through pregnancy and the first 5 years of your child's life, including postpartum care, nutrition tracking, and developmental milestones.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. There are no hidden fees or long-term contracts. Your data will be securely stored for 30 days in case you want to reactivate.",
    },
    {
      question: "Is there a community feature?",
      answer:
        "Yes! Our community forum allows you to connect with other mothers, share experiences, and get support. All community interactions are moderated to ensure a safe, respectful environment.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team or explore our FAQ section.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Contact Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have a question or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">support@momsync.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground">123 Health Street, Medical City, MC 12345</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-primary hover:text-accent transition text-2xl">
                    f
                  </a>
                  <a href="#" className="text-primary hover:text-accent transition text-2xl">
                    𝕏
                  </a>
                  <a href="#" className="text-primary hover:text-accent transition text-2xl">
                    in
                  </a>
                  <a href="#" className="text-primary hover:text-accent transition text-2xl">
                    📷
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                  <span className={`text-2xl transition ${expandedFAQ === index ? "rotate-180" : ""}`}>▼</span>
                </button>

                {expandedFAQ === index && (
                  <div className="px-6 py-4 border-t border-border bg-card">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
