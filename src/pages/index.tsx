import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Hero from "../components/Hero"

interface Props {
  data: any
}

function Index(props: Props): ReactElement {
  return (
    <>
      <Hero
        tagline="Build your dreams"
        details="We build custom 4x4 RVs and campers, so you can get way out there and camp in style."
        image={props.data.file.childImageSharp.fluid}
      />
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
