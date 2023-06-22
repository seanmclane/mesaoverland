import React, { ReactElement } from "react"

interface Props {
  children: string
  type: any
  onClick: React.MouseEventHandler<HTMLButtonElement>
  classNames?: string
  bgColor?: string
  textColor?: string
}

function Button({
  children,
  type,
  onClick,
  classNames,
  bgColor,
  textColor,
}: Props): ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-4 text-xl font-bold font-title uppercase no-underline ${
        bgColor ? bgColor : "bg-outline"
      } ${textColor ? textColor : "text-gray-100"} ${
        classNames ? classNames : ""
      }`}
    >
      {children}
    </button>
  )
}

export default Button
