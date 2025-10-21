"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Problems from "@/components/problems"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Experts from "@/components/experts"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problems />
      <Features />
      <Experts />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
