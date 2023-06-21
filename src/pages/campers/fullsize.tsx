import React from "react"
import { graphql } from "gatsby"
//import Img from "gatsby-image"
import SEO from "../../components/SEO"
import LinkButton from "../../components/LinkButton"

interface FullSizeProps {
  data: {
    file: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

export default function FullSize({
  data, // this prop will be injected by the GraphQL query below.
}: FullSizeProps) {
  return (
    <>
      <SEO
        title="FullSize"
        description="FullSize"
        image={data.file.childImageSharp.fluid.src}
        article
      />
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">The Indian Creek</h2>
            <p className="text-xl flex-wrap">
              Our most popular cabover camper made for a full-size ~6.5' bed
            </p>
            <p className="text-xl flex-wrap">Photos coming soon!</p>
          </div>
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              The Whole Enchilada
            </h2>
            <p className="text-xl flex-wrap">
              Get more space with this cabover camper made for an 8' bed
            </p>
            <p className="text-xl flex-wrap">Photos coming soon!</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-outline py-40 px-2">
        <div className="flex mx-auto flex-wrap justify-around text-center max-w-screen-xl">
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Features</h2>
            <ul className="text-xl flex-wrap m-8 text-left list-disc">
              <li>Lightweight, hard-side construction</li>
              <li>Cabover sleeping area with queen bed</li>
              <li>Full list coming soon!</li>
            </ul>
          </div>
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Options</h2>
            <ul className="text-xl flex-wrap m-8 text-left list-disc">
              <li>Full list coming soon!</li>
            </ul>
          </div>
          <p>
            *Listed features, options, and pricing subject to change and vehicle
            approval. Contact us for a quote.
          </p>
        </div>
      </div>
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Custom Models</h2>
            <p className="text-xl flex-wrap">
              If you want something a little different than our standard models,
              reach out! We can fabricate almost anything you can dream up.
            </p>
            <LinkButton to="/about" className="text-gray-100">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  )
}
export const query = graphql`
  query FullSizeQuery {
    file(relativePath: { eq: "negotiator.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
