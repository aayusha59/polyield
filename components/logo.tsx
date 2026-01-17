import type React from "react"
export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Shield icon representing safety */}
      <path
        d="M16 4L4 9V18C4 26.5 9 33.5 16 36C23 33.5 28 26.5 28 18V9L16 4Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M12 18L15 21L21 15" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* PolySafeBets text */}
      <text x="36" y="26" fill="currentColor" fontFamily="monospace" fontSize="16" fontWeight="600">
        PolySafeBets
      </text>
    </svg>
  )
}
