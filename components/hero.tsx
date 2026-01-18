"use client"

import Link from "next/link"
import Image from "next/image"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col h-svh justify-center items-center">
      <GL hovering={hovering} />

      <div className="text-center relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Predict the <br />
          <i className="font-light">future,</i> risk nothing
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[500px] mx-auto">
          No-lose prediction markets where your principal is always protected. Winners earn yield, losers get their
          deposit back.
        </p>

        <Link className="contents max-sm:hidden" href="/markets">
          <Button className="mt-14" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            [Explore Markets]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/markets">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Explore Markets]
          </Button>
        </Link>

        <div className="mt-18 relative z-20">
          <p className="text-xs font-mono text-foreground/40 mb-3 tracking-wider">POWERED BY</p>
          <div className="flex items-center justify-center gap-8">
            <Image
              src="/polymarket.png"
              alt="Polymarket"
              width={192}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="/solana.png"
              alt="Solana"
              width={120}
              height={30}
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
