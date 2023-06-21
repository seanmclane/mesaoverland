import React from "react"
import { graphql } from "gatsby"
//import Img from "gatsby-image"
import SEO from "../../components/SEO"
import LinkButton from "../../components/LinkButton"

import JSONData from "../../content/campers/midsize.json"
import Configurator from "../../components/Configurator"

interface MidSizeProps {
  data: {
    file: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

export default function MidSize({
  data, // this prop will be injected by the GraphQL query below.
}: MidSizeProps) {
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
  return (
    <>
      <SEO
        title="MidSize"
        description="MidSize"
        image={data.file.childImageSharp.fluid.src}
        article
      />
      <Configurator {...JSONData} />
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">{JSONData.name}</h2>
            <p className="text-xl flex-wrap">MAIN PHOTO??</p>
            <p className="text-xl flex-wrap">
              Starting at{" "}
              <span className="font-bold">
                {formatter.format(JSONData.upfit_price)}
              </span>{" "}
              fully upfit
            </p>
            <p className="text-xl flex-wrap">
              Only{" "}
              <span className="font-bold">
                {formatter.format(JSONData.shell_price)}
              </span>{" "}
              as a shell
            </p>
          </div>
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-40 px-2">
        <div className="flex mx-auto flex-wrap justify-around text-center max-w-screen-xl">
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Features</h2>
            <ul className="text-xl flex-wrap m-8 text-left list-none">
              {JSONData.features.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Options</h2>
            <ul className="text-xl flex-wrap m-8 text-left list-none">
              {JSONData.options.map((o) => (
                <li key={o.name}>{o.name}</li>
              ))}
            </ul>
          </div>
          <p>
            *Listed features, options, and pricing subject to change and vehicle
            approval. Contact us for a quote.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Custom Models</h2>
            <p className="text-xl flex-wrap">
              If you want something a little different than our standard models,
              reach out! We can fabricate almost anything you can dream up.
            </p>
            <LinkButton to="/contact" textColor="text-gray-100">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  )
}
export const query = graphql`
  query MidSizeQuery {
    file(relativePath: { eq: "negotiator.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
