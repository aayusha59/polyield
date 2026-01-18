"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Position } from "@/lib/solana/constants"

export interface UserPosition {
  id: string
  marketId: string
  marketQuestion: string
  position: Position
  amount: number
  timestamp: number
  expiryTimestamp: number
  status: "active" | "claimed" | "refunded"
}

// Mock APY for yield calculation (e.g., 12%)
const MOCK_APY = 0.12

export function usePositions() {
  const { publicKey } = useWallet()
  const [positions, setPositions] = useState<UserPosition[]>([])
  const [totalYield, setTotalYield] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  // Load positions from local storage
  useEffect(() => {
    if (!publicKey) {
      setPositions([])
      return
    }

    const loadPositions = () => {
      try {
        const stored = localStorage.getItem(`polyield_positions_${publicKey.toBase58()}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          setPositions(parsed)
          calculateTotals(parsed)
        }
      } catch (e) {
        console.error("Failed to load positions", e)
      }
    }

    loadPositions()
    
    // Listen for storage events to update real-time
    window.addEventListener("storage", loadPositions)
    return () => window.removeEventListener("storage", loadPositions)
  }, [publicKey])

  const calculateTotals = (currentPositions: UserPosition[]) => {
    const now = Date.now()
    let yieldSum = 0
    let valueSum = 0

    currentPositions.forEach(pos => {
      // Calculate yield: Principal * APY * (TimeDelta in Years)
      const timeDiff = now - pos.timestamp
      const yearsElapsed = timeDiff / (1000 * 60 * 60 * 24 * 365)
      
      // In this model, assume yield is generated continuously
      // For winners, they get a share of total yield. 
      // For this demo, we'll simulate a projected yield based on the mock APY.
      const estimatedYield = pos.amount * MOCK_APY * yearsElapsed
      
      if (pos.status === "active") {
        yieldSum += estimatedYield
        valueSum += pos.amount
      }
    })

    setTotalYield(yieldSum)
    setTotalValue(valueSum)
  }

  const addPosition = (
    marketId: string, 
    marketQuestion: string, 
    position: Position, 
    amount: number,
    expiryTimestamp: number
  ) => {
    if (!publicKey) return

    const newPosition: UserPosition = {
      id: Math.random().toString(36).substring(7),
      marketId,
      marketQuestion,
      position,
      amount,
      timestamp: Date.now(),
      expiryTimestamp,
      status: "active"
    }

    const updated = [...positions, newPosition]
    setPositions(updated)
    calculateTotals(updated)
    
    localStorage.setItem(
      `polyield_positions_${publicKey.toBase58()}`, 
      JSON.stringify(updated)
    )
  }

  return {
    positions,
    totalYield,
    totalValue,
    addPosition,
    apy: MOCK_APY
  }
}
