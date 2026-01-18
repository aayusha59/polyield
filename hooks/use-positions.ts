"use client"

import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Position } from "@/lib/solana/constants"
import { PublicKey } from "@solana/web3.js"

const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcQb")

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
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [positions, setPositions] = useState<UserPosition[]>([])
  const [totalYield, setTotalYield] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  // Fetch positions from chain history
  useEffect(() => {
    if (!publicKey) {
      setPositions([])
      return
    }

    const fetchPositions = async () => {
      try {
        // Fetch last 20 signatures
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 })
        if (signatures.length === 0) return

        // Fetch parsed transactions
        const txs = await connection.getParsedTransactions(
          signatures.map(s => s.signature),
          { maxSupportedTransactionVersion: 0 }
        )

        const loadedPositions: UserPosition[] = []

        txs.forEach(tx => {
          if (!tx || !tx.meta || tx.meta.err) return

          // Look for Memo instruction
          const instructions = tx.transaction.message.instructions
          for (const ix of instructions) {
            if (ix.programId.equals(MEMO_PROGRAM_ID)) {
              // Handle parsed vs raw instruction
              let memoString = ""
              if ("parsed" in ix) {
                memoString = ix.parsed as string
              } else if ("data" in ix) {
                // If data is base58 encoded
                // Not typical for getParsedTransactions but handling safety
                // Ideally parsed transactions handle SplMemo
                // We'll rely on it being parsed or check raw data decoding if needed
                // For simplicity assuming parsed for now as standard RPC does it
                continue 
              }

              try {
                // Try to parse our JSON format
                if (memoString.includes("polyield_position")) {
                  const data = JSON.parse(memoString)
                  if (data.type === "polyield_position") {
                    loadedPositions.push({
                      id: tx.transaction.signatures[0], // Use tx sig as ID
                      marketId: data.marketId,
                      marketQuestion: data.marketQuestion,
                      position: data.position,
                      amount: data.amount,
                      timestamp: data.timestamp,
                      expiryTimestamp: data.expiry,
                      status: "active"
                    })
                  }
                }
              } catch (e) {
                // Not our memo or invalid JSON, ignore
              }
            }
          }
        })

        if (loadedPositions.length > 0) {
          setPositions(loadedPositions)
          calculateTotals(loadedPositions)
        }
      } catch (e) {
        console.error("Failed to fetch positions", e)
      }
    }

    fetchPositions()
    
    // Poll every 15 seconds
    const interval = setInterval(fetchPositions, 15000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

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
  }

  return {
    positions,
    totalYield,
    totalValue,
    addPosition,
    apy: MOCK_APY
  }
}
