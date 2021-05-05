import React, { ReactElement } from "react"
import Link from "gatsby-link"

interface Props {
  children: string
  to: string
  className?: string
}

function LinkButton({ children, to, className }: Props): ReactElement {
  return (
    <Link to={to} className={className}>
      <button className="p-4 text-xl font-bold font-title uppercase bg-outline">
        {children}
      </button>
    </Link>
  )
}

export default LinkButton
