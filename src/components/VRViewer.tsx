import React from "react"

interface Props {
  slug: string
}

export default function VRViewer({slug}: Props) {
  return (
    <iframe src={`/vr${slug}`} width="100%" height="600px" />
  )
}