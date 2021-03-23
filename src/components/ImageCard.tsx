import React, { ReactElement } from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"

interface Props {
  title: string
  subtitle?: string
  date: string
  linkTo: string
  image: any
  imageAlt: string
}

function ImageCard(props: Props): ReactElement {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <Link className="flex flex-1 bg-gray-100" to={props.linkTo}>
        {props.image ? (
          <Img alt="Placeholder" className="" fixed={props.image} />
        ) : (
          <div style={{ height: 400 }} className="h-full"></div>
        )}
      </Link>
      <header className="p-4">
        <h1 className="text-lg mb-2 mt-0">
          <Link
            className="no-underline text-black font-title uppercase"
            to={props.linkTo}
          >
            {props.title}
          </Link>
        </h1>
        <h2 className="text-sm text-mesa mb-2">{props.subtitle}</h2>
        <p className="text-grey-darker text-sm mb-auto p-0">{props.date}</p>
      </header>
    </article>
  )
}

export default ImageCard
