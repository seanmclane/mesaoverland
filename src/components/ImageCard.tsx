import React, { ReactElement } from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"

interface Props {
  title: string
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
      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 className="text-lg">
          <Link className="no-underline text-black" to={props.linkTo}>
            {props.title}
          </Link>
        </h1>
        <p className="text-grey-darker text-sm">{props.date}</p>
      </header>
    </article>
  )
}

export default ImageCard
