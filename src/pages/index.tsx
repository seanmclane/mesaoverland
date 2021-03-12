import React, { ReactElement } from "react"
import { graphql, Link } from "gatsby"
import Hero from "../components/Hero"
import SEO from "../components/SEO"

interface Props {
  data: any
}

function Index(props: Props): ReactElement {
  return (
    <>
      <SEO title="Home" />
      <Hero
        tagline="Build your dreams"
        details="We build custom 4x4 campers, so you can get way out there and camp in style."
        image={props.data.file.childImageSharp.fluid}
      />
      <div className="bg-mesa text-gray-100 py-40 mb-8 mt-2">
        <div className="flex flex-grow justify-between">
          <div>
            <h2 className="text-3xl font-title uppercase ml-8 md:ml-16">
              Check out our builds
            </h2>
            <p className="ml-8 md:ml-16 text-xl">
              You can have 41-inch tires AND a shower. No compromises.
            </p>
          </div>
          <Link to="/builds" className="flex mx-8 md:mx-16 items-center">
            <button className="p-4 text-xl font-bold font-title uppercase bg-gray-500">
              Builds
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query HeroImageQuery {
    file(relativePath: { eq: "tex2.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Index
