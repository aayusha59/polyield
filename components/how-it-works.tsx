"use client"

import { ArrowRight, CircleDollarSign, PiggyBank, Trophy, Wallet } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Deposit USDC",
    description:
      "Connect your wallet and deposit funds into any prediction market. Your principal is locked and protected.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Make Your Prediction",
    description: "Choose your position on the market outcome. Will the Fed cut rates? Will Bitcoin hit $100K?",
    icon: CircleDollarSign,
  },
  {
    number: "03",
    title: "Yield Generation",
    description: "While the market is active, your deposit earns yield through DeFi lending protocols.",
    icon: PiggyBank,
  },
  {
    number: "04",
    title: "Collect Rewards",
    description:
      "Winners receive the yield. Losers get their full deposit back. Everyone wins (or at least doesn't lose).",
    icon: Trophy,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-border/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-sentient mt-4">
            Predict without <i className="font-light">risk</i>
          </h2>
          <p className="text-foreground/60 font-mono mt-4 max-w-xl mx-auto">
            Our no-lose mechanism ensures your principal is always safe while giving you the thrill of prediction
            markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <div className="bg-[#111]/80 border border-border/50 p-6 h-full hover:border-primary/50 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-primary font-mono text-sm">{step.number}</span>
                  <step.icon className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-sentient mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/50 font-mono leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-4 h-4 text-border -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
