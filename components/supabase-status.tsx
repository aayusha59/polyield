"use client"

import { useState, useEffect } from "react"
import { Database, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { isSupabaseConfigured } from "@/lib/database/positions-service"
import { supabase } from "@/lib/database/supabase"

// 🎯 TOGGLE THIS TO SHOW/HIDE THE STATUS INDICATOR
const SHOW_SUPABASE_STATUS = false // Set to false to hide

interface StatusInfo {
  isConfigured: boolean
  isConnected: boolean | null
  projectUrl: string | null
  error: string | null
}

export function SupabaseStatus() {
  const [status, setStatus] = useState<StatusInfo>({
    isConfigured: false,
    isConnected: null,
    projectUrl: null,
    error: null,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    checkSupabaseStatus()
  }, [])

  const checkSupabaseStatus = async () => {
    const configured = isSupabaseConfigured()
    const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null

    if (!configured) {
      setStatus({
        isConfigured: false,
        isConnected: false,
        projectUrl: null,
        error: "Supabase not configured. Using localStorage fallback.",
      })
      return
    }

    try {
      // Test connection by querying the user_positions table
      const { error } = await supabase.from("user_positions").select("id").limit(1)

      if (error) {
        setStatus({
          isConfigured: true,
          isConnected: false,
          projectUrl,
          error: error.message,
        })
      } else {
        setStatus({
          isConfigured: true,
          isConnected: true,
          projectUrl,
          error: null,
        })
      }
    } catch (err) {
      setStatus({
        isConfigured: true,
        isConnected: false,
        projectUrl,
        error: err instanceof Error ? err.message : "Unknown error",
      })
    }
  }

  // Don't render if disabled
  if (!SHOW_SUPABASE_STATUS) {
    return null
  }

  const getStatusIcon = () => {
    if (!status.isConfigured) {
      return <AlertCircle className="w-4 h-4 text-amber-400" />
    }
    if (status.isConnected === null) {
      return <Database className="w-4 h-4 text-foreground/40 animate-pulse" />
    }
    if (status.isConnected) {
      return <CheckCircle className="w-4 h-4 text-emerald-400" />
    }
    return <XCircle className="w-4 h-4 text-rose-400" />
  }

  const getStatusColor = () => {
    if (!status.isConfigured) return "border-amber-500/30 bg-amber-500/5"
    if (status.isConnected === null) return "border-border/30 bg-background/50"
    if (status.isConnected) return "border-emerald-500/30 bg-emerald-500/5"
    return "border-rose-500/30 bg-rose-500/5"
  }

  const getStatusText = () => {
    if (!status.isConfigured) return "localStorage"
    if (status.isConnected === null) return "Checking..."
    if (status.isConnected) return "Connected"
    return "Error"
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`border ${getStatusColor()} backdrop-blur-sm transition-all duration-200 ${isExpanded ? "w-72" : "w-auto"
          }`}
      >
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-2 w-full hover:bg-foreground/5 transition-colors"
        >
          {getStatusIcon()}
          <span className="font-mono text-xs">Supabase: {getStatusText()}</span>
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-border/30 px-3 py-2 space-y-2">
            <div className="text-xs font-mono space-y-1">
              {/* Configuration Status */}
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Configured:</span>
                <span
                  className={status.isConfigured ? "text-emerald-400" : "text-amber-400"}
                >
                  {status.isConfigured ? "Yes" : "No"}
                </span>
              </div>

              {/* Connection Status */}
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Connected:</span>
                <span
                  className={
                    status.isConnected
                      ? "text-emerald-400"
                      : status.isConnected === null
                        ? "text-foreground/40"
                        : "text-rose-400"
                  }
                >
                  {status.isConnected === null
                    ? "..."
                    : status.isConnected
                      ? "Yes"
                      : "No"}
                </span>
              </div>

              {/* Project URL */}
              {status.projectUrl && (
                <div className="pt-1 border-t border-border/20">
                  <div className="text-foreground/60 mb-0.5">Project:</div>
                  <div className="text-foreground/80 text-[10px] break-all">
                    {status.projectUrl}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status.error && (
                <div className="pt-1 border-t border-border/20">
                  <div className="text-rose-400 mb-0.5">Error:</div>
                  <div className="text-rose-400/80 text-[10px] break-words">
                    {status.error}
                  </div>
                </div>
              )}

              {/* Storage Mode */}
              <div className="pt-1 border-t border-border/20">
                <div className="text-foreground/60 mb-0.5">Storage:</div>
                <div className="text-foreground/80">
                  {status.isConfigured && status.isConnected
                    ? "Database"
                    : "localStorage (fallback)"}
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                checkSupabaseStatus()
              }}
              className="w-full text-xs font-mono text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/50 py-1 transition-colors"
            >
              Refresh Status
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
