import React, { ReactElement } from "react"
import Link from "gatsby-link"

interface Props {
  children: string
  to: string
  classNames?: string
  bgColor?: string
  textColor?: string
}

function LinkButton({
  children,
  to,
  classNames,
  bgColor,
  textColor,
}: Props): ReactElement {
  return (
    <Link to={to} className={classNames}>
      <button
        className={`p-4 text-xl font-bold font-title uppercase no-underline ${
          bgColor ? bgColor : "bg-outline"
        } ${textColor ? textColor : "text-gray-100"}`}
      >
        {children}
      </button>
    </Link>
  )
}

export default LinkButton
