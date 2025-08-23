import * as React from "react"
import { cn } from "@/lib/utils"

interface TrustScoreIndicatorProps {
  score: number
  size: number
  className?: string
}

const TrustScoreIndicator = React.forwardRef<
  HTMLDivElement,
  TrustScoreIndicatorProps
>(({ score, size, className }, ref) => {
  const [animatedScore, setAnimatedScore] = React.useState(0)
  
  // Clamp score between 0 and 100
  const clampedScore = Math.min(100, Math.max(0, score))
  
  // Calculate circle properties
  const strokeWidth = Math.max(4, size * 0.08) // Responsive stroke width
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference
  
  // Determine color and label based on score
  const getScoreColor = (score: number) => {
    if (score >= 75) return "stroke-success"
    if (score >= 50) return "stroke-warning"
    return "stroke-destructive"
  }
  
  const getScoreLabel = (score: number) => {
    if (score >= 75) return "High Integrity"
    if (score >= 50) return "Medium Integrity"
    return "Low Integrity"
  }
  
  // Animate score on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(clampedScore)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [clampedScore])
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center",
        className
      )}
      style={{ width: size, height: size + 40 }}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Background Circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted"
          />
        </svg>
        
        {/* Progress Circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-1000 ease-out",
              getScoreColor(clampedScore)
            )}
          />
        </svg>
        
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-bold text-foreground tabular-nums"
            style={{ 
              fontSize: Math.max(12, size * 0.2),
              lineHeight: 1 
            }}
          >
            {Math.round(animatedScore)}
          </span>
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-2 text-center">
        <span 
          className={cn(
            "font-medium transition-colors duration-300",
            clampedScore >= 75 && "text-success",
            clampedScore >= 50 && clampedScore < 75 && "text-warning",
            clampedScore < 50 && "text-destructive"
          )}
          style={{ fontSize: Math.max(10, size * 0.12) }}
        >
          {getScoreLabel(clampedScore)}
        </span>
      </div>
    </div>
  )
})

TrustScoreIndicator.displayName = "TrustScoreIndicator"

export { TrustScoreIndicator }