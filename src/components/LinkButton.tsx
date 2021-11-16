import React, { ReactElement } from "react"
import Link from "gatsby-link"

interface Props {
  children: string
  to: string
  className?: string
  bgColor?: string
}

function LinkButton({ children, to, className, bgColor }: Props): ReactElement {
  return (
    <Link to={to} className={className}>
      <button
        className={`p-4 text-xl font-bold font-title uppercase ${
          bgColor ? bgColor : "bg-outline"
        }`}
      >
        {children}
      </button>
    </Link>
  )
}

export default LinkButton
