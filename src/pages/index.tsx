import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Hero from "../components/Hero"
import SEO from "../components/SEO"
import LinkButton from "../components/LinkButton"
const logo = require("../../static/images/logo.png")

interface Props {
  data: any
}

function Index(props: Props): ReactElement {
  return (
    <>
      <SEO title="Home" image={logo} />
      <Hero
        className="text-outline bg-gray-100 lg:pt-20"
        tagline="Build your dreams"
        details="We build custom 4x4 campers, so you can get way out there and camp in style."
        image={props.data.file.childImageSharp.fluid}
      />
      <div className="bg-mesa text-gray-100 py-40 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              Check out our builds
            </h2>
            <p className="text-xl flex-wrap">
              You can have 41-inch tires AND a shower. No compromises.
            </p>
          </div>
          <LinkButton to="/builds" className="flex mx-16 md:mx-16 items-center">
            Builds
          </LinkButton>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query HeroImageQuery {
    file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Index
