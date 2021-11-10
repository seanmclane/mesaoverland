import React, { ReactElement } from "react"
import Img from "gatsby-image"

interface Props {
  tagline: string
  details?: string
  image?: any
  imageAlt?: string
  className?: string
}

function Hero(props: Props): ReactElement {
  return (
    <section className={props.className}>
      <Img
        fluid={props.image}
        alt={props.imageAlt}
        className="mx-auto max-w-5xl"
      />
      <div className="flex-col text-center py-8 px-2">
        <h1 className="font-title uppercase text-5xl font-bold">
          {props.tagline}
        </h1>
        <p className="text-xl font-light">{props.details}</p>
      </div>
    </section>
  )
}

export default Hero
