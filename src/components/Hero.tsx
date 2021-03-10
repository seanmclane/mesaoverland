import React, { ReactElement } from "react"
import Img from "gatsby-image"

interface Props {
  tagline: string
  details?: string
  image?: any
  imageAlt?: string
}

function Hero(props: Props): ReactElement {
  return (
    <section className="mx-8">
      <Img fluid={props.image} alt={props.imageAlt} />
      <div className="">
        <h1 className="font-title uppercase text-5xl font-bold text-gray-800 py-8">
          {props.tagline}
        </h1>
        <p className="text-xl font-light text-gray-600 pb-8">{props.details}</p>
      </div>
    </section>
  )
}

export default Hero
