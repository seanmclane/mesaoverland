import React, { ReactElement } from "react"
import {Link} from "gatsby-link"
import Img from "gatsby-image"

interface Props {
  name: string
  short_description: string
  price: number
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
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white p-0">
      <h1 className="text-2xl my-4 ml-4">
        <Link
          className="no-underline text-outline font-title uppercase"
          to={props.linkTo}
        >
          {props.name}
        </Link>
      </h1>
      <Link className="flex flex-1 bg-gray-100" to={props.linkTo}>
        {props.image ? (
          <Img alt="Placeholder" className="" fixed={props.image} />
        ) : (
          <div style={{ height: 400 }} className="h-full"></div>
        )}
      </Link>
      <span className="-mt-8 ml-4 z-10 text-gray-100">
        {props.short_description}
      </span>
      <div className="flex flex-1 justify-between">
        <h2 className="text-sm text-outline mt-2 mb-0 py-4 ml-4 h-full">
          From {formatter.format(props.price)}
        </h2>
        <Link className="no-underline" to={props.linkTo}>
          <h2 className="text-sm text-gray-100 bg-mesa mt-2 mb-0 p-4 h-full">
            See Details
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default ImageCard
