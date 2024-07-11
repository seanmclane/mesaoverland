import React from "react"

interface Props {
  path: string
}

export default function PanoViewer({path}: Props) {
  return (
    <iframe src={path} width="100%" height="600px" />
  )
}