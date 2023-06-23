import React, { ReactElement } from "react"
import Img from "gatsby-image"

interface Props {
  tagline: string
  details?: string
  image?: string
  imageAlt?: string
  gatsbyImage?: any
  gatsbyImageAlt?: string
  videoSrc?: string
  className?: string
}

function Hero(props: Props): ReactElement {
  return (
    <section className={props.className}>
      {props.videoSrc ? (
        <div
          style={{ paddingTop: "56.25%" }}
          className="overflow-hidden relative mb-1"
        >
          <iframe
            className="border-0 h-full w-full left-0 top-0 absolute"
            src={props.videoSrc}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            frameBorder="0"
          ></iframe>
        </div>
      ) : props.gatsbyImage ? (
        <Img
          fluid={props.gatsbyImage}
          alt={props.gatsbyImageAlt}
          className="mx-auto max-w-5xl"
        />
      ) : (
        <img src={props.image} alt={props.imageAlt} />
      )}
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
