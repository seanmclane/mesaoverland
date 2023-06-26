import React, { ReactElement } from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"

interface Props {
  title: string
  subtitle?: string
  price?: number
  date: string
  linkTo: string
  image: any
  imageAlt: string
}

function ImageCard(props: Props): ReactElement {
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
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
        {props.price ? (
          <h2 className="text-md text-mesa mb-0">
            {formatter.format(props.price)}
          </h2>
        ) : null}
        <h2 className="text-sm text-black mb-2">{props.subtitle}</h2>
        <p className="text-grey-darker text-sm mb-auto p-0">{props.date}</p>
      </header>
    </article>
  )
}

export default ImageCard
