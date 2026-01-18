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
    <div className="flex flex-col h-svh justify-center items-center px-4">
      <GL hovering={hovering} />

      <div className="text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sentient">
          Predict the <br />
          <i className="font-light">future,</i> risk nothing
        </h1>
        <p className="font-mono text-xs sm:text-sm md:text-base text-foreground/60 text-balance mt-6 sm:mt-8 max-w-[500px] mx-auto px-4">
          No-lose prediction markets where your principal is always protected. Winners earn yield, losers get their
          deposit back.
        </p>

        <Link className="contents max-sm:hidden" href="/markets">
          <Button className="mt-10 sm:mt-14" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            [Explore Markets]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/markets">
          <Button
            size="sm"
            className="mt-10 sm:mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Explore Markets]
          </Button>
        </Link>

        <div className="mt-8 sm:mt-12 md:mt-16 relative z-20">
          <p className="text-xs font-mono text-foreground/40 mb-2 sm:mb-3 tracking-wider">POWERED BY</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <Image
              src="/polymarket.png"
              alt="Polymarket"
              width={192}
              height={48}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
            <Image
              src="/solana.png"
              alt="Solana"
              width={120}
              height={30}
              className="h-5 sm:h-6 md:h-7 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
