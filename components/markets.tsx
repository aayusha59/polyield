"use client"

import { useState } from "react"
import { MarketCard } from "./market-card"
import { Button } from "./ui/button"

const mockMarkets = [
  {
    id: "1",
    question: "Will the Fed cut interest rates by March 2025?",
    category: "Economics",
    totalPool: 245000,
    yesPool: 156000,
    noPool: 89000,
    endDate: "Mar 15, 2025",
    apy: 8.2,
  },
  {
    id: "2",
    question: "Will Bitcoin exceed $150,000 in 2025?",
    category: "Crypto",
    totalPool: 892000,
    yesPool: 534000,
    noPool: 358000,
    yesOdds: 60,
    noOdds: 40,
    endDate: "Dec 31, 2025",
    apy: 7.5,
  },
  {
    id: "3",
    question: "Will AI replace 10% of tech jobs by 2026?",
    category: "Technology",
    totalPool: 178000,
    yesPool: 89000,
    noPool: 89000,
    endDate: "Dec 31, 2026",
    apy: 6.8,
  },
  {
    id: "4",
    question: "Will SpaceX complete Starship orbital flight in Q1 2025?",
    category: "Science",
    totalPool: 324000,
    yesPool: 210000,
    noPool: 114000,
    endDate: "Mar 31, 2025",
    apy: 9.1,
  },
  {
    id: "5",
    question: "Will the US pass major crypto legislation in 2025?",
    category: "Politics",
    totalPool: 456000,
    yesPool: 273000,
    noPool: 183000,
    endDate: "Dec 31, 2025",
    apy: 7.2,
  },
  {
    id: "6",
    question: "Will Ethereum merge to sharding by end of 2025?",
    category: "Crypto",
    totalPool: 567000,
    yesPool: 340000,
    noPool: 227000,
    endDate: "Dec 31, 2025",
    apy: 8.0,
  },
]

const categories = ["All", "Crypto", "Economics", "Politics", "Technology", "Science"]

export function Markets() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredMarkets =
    selectedCategory === "All" ? mockMarkets : mockMarkets.filter((m) => m.category === selectedCategory)

  return (
    <section id="markets" className="py-24 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-sm text-primary uppercase tracking-wider">Active Markets</span>
            <h2 className="text-4xl md:text-5xl font-sentient mt-4">
              Make your <i className="font-light">predictions</i>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-primary text-background border-primary"
                    : "border-border/50 text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">[View All Markets]</Button>
        </div>
      </div>
    </section>
  )
}
