"use client"

import { usePositions } from "@/hooks/use-positions"
import { useWallet } from "@solana/wallet-adapter-react"
import { Shield, TrendingUp, Wallet, AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "./ui/button"
import { Position } from "@/lib/solana/constants"

export function PositionsList() {
  const { connected } = useWallet()
  const { positions, totalValue, totalYield, apy } = usePositions()

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Wallet className="w-16 h-16 text-foreground/20 mb-6" />
        <h2 className="text-2xl font-sentient mb-2">Connect Your Wallet</h2>
        <p className="text-foreground/60 font-mono mb-6 max-w-md">
          Connect your wallet to view your active positions and accrued yield.
        </p>
      </div>
    )
  }

  if (positions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="w-16 h-16 text-foreground/20 mb-6" />
        <h2 className="text-2xl font-sentient mb-2">No Active Positions</h2>
        <p className="text-foreground/60 font-mono mb-6 max-w-md">
          You haven't made any predictions yet. Explore markets to start earning yield on your predictions.
        </p>
        <Button onClick={() => window.location.href = "/markets"}>
          [Explore Markets]
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] border border-border/50 p-6">
          <div className="flex items-center gap-2 text-foreground/60 font-mono text-sm mb-2">
            <Shield className="w-4 h-4" />
            <span>Total Protected Value</span>
          </div>
          <div className="text-3xl font-mono font-medium">
            ${totalValue.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-2 text-emerald-400/80 font-mono text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Accrued Yield</span>
          </div>
          <div className="text-3xl font-mono font-medium text-emerald-400">
            +${totalYield.toFixed(6)}
          </div>
          <div className="text-xs text-foreground/40 font-mono mt-1">
            Est. APY: {(apy * 100).toFixed(0)}%
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-border/50 p-6">
          <div className="flex items-center gap-2 text-foreground/60 font-mono text-sm mb-2">
            <Clock className="w-4 h-4" />
            <span>Active Positions</span>
          </div>
          <div className="text-3xl font-mono font-medium">
            {positions.length}
          </div>
        </div>
      </div>

      {/* Positions List */}
      <div className="space-y-4">
        <h3 className="font-sentient text-xl">Your Positions</h3>
        <div className="grid gap-4">
          {positions.map((pos) => {
            const isYes = pos.position === Position.Yes
            
            // Check expiry
            const now = Date.now()
            const isExpired = now > pos.expiryTimestamp
            
            // Calculate yield based on time elapsed (capped at expiry)
            const endTime = isExpired ? pos.expiryTimestamp : now
            const durationMs = Math.max(0, endTime - pos.timestamp)
            const durationYears = durationMs / (1000 * 60 * 60 * 24 * 365)
            const yieldAmount = pos.amount * apy * durationYears

            return (
              <div 
                key={pos.id} 
                className="bg-[#0a0a0a] border border-border/50 p-6 hover:border-primary/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs uppercase px-2 py-0.5 border ${
                      isYes
                        ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" 
                        : "text-rose-400 border-rose-500/30 bg-rose-500/10"
                    }`}>
                      Predict {isYes ? "Yes" : "No"}
                    </span>
                    <span className="text-xs font-mono text-foreground/40">
                      Placed {new Date(pos.timestamp).toLocaleDateString()}
                    </span>
                    {isExpired && (
                      <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-1.5 py-0.5 border border-red-500/20">
                        Expired
                      </span>
                    )}
                  </div>
                  <h4 className="font-sentient text-lg">{pos.marketQuestion}</h4>
                </div>

                <div className="flex items-center gap-8 md:gap-12">
                  <div>
                    <div className="text-xs text-foreground/60 font-mono mb-1">Principal</div>
                    <div className="font-mono text-lg">${pos.amount.toFixed(2)}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-foreground/60 font-mono mb-1">
                      {isExpired ? "Final Yield" : "Current Yield"}
                    </div>
                    <div className="font-mono text-lg text-emerald-400">
                      +${yieldAmount.toFixed(6)}
                    </div>
                  </div>

                  <div className="min-w-[120px]">
                    {isExpired ? (
                      <Button className="w-full" variant="default" size="sm">
                        [Claim Payout]
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-2 border border-emerald-500/20 rounded-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        Yielding
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
