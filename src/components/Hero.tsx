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
    <section className="">
      <Img fluid={props.image} alt={props.imageAlt} />
      <div className="flex-col text-center my-16 px-2">
        <h1 className="font-title uppercase text-5xl font-bold text-gray-800">
          {props.tagline}
        </h1>
        <p className="text-xl font-light text-gray-600">{props.details}</p>
      </div>
    </section>
  )
}

export default Hero
