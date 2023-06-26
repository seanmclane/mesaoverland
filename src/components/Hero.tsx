import React, { ReactElement } from "react"
import Img from "gatsby-image"

interface Props {
  tagline: string
  details?: string
  gatsbyImage?: any
  gatsbyImageAlt?: string
  videoSrc?: string
  className?: string
}

function Hero(props: Props): ReactElement {
  return (
    <section className={props.className}>
      <div className="absolute left-4 z-10">
        <div className="flex my-4 md:my-20">
          <h1 className="font-title uppercase text-6xl md:text-8xl font-bold max-w-sm md:max-w-lg">
            {props.tagline}
          </h1>
        </div>
      </div>
      {props.videoSrc ? (
        <div style={{ maxHeight: "75vh" }} className="overflow-hidden relative">
          <iframe
            className="border-0 h-full w-full left-0 top-0 absolute"
            src={props.videoSrc}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            frameBorder="0"
          ></iframe>
        </div>
      ) : (
        <Img
          fluid={props.gatsbyImage}
          alt={props.gatsbyImageAlt}
          className=""
          style={{ maxHeight: "75vh" }}
        />
      )}
      <div className="flex w-full my-20 text-center">
        <p className="text-xl md:text-2xl font-bold px-8 py-0 mx-auto">
          {props.details}
        </p>
      </div>
    </section>
  )
}

export default Hero
