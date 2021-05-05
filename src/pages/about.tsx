import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import Image from "gatsby-image"

interface Props {
  data: {
    site: {
      siteMetadata: {
        contact_email: string
        contact_phone: string
      }
    }
    sean: {
      childImageSharp: {
        fluid: any
      }
    }
    blayne: {
      childImageSharp: {
        fluid: any
      }
    }
    floyd: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

function About(props: Props): ReactElement {
  return (
    <>
      <SEO title="About" />
      <section
        className="mx-auto px-6 mt-8 text-center"
        style={{ height: "30rem" }}
      >
        <iframe
          title="Google Maps Embed"
          width="100%"
          height="100%"
          className="max-w-screen-md"
          style={{ border: 0, margin: "auto" }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1582495.266049488!2d-109.98525688437546!3d39.22445647952158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874657611d928359%3A0xe73ae95d3bafebdb!2sMesa%20Overland!5e0!3m2!1sen!2sus!4v1620247470260!5m2!1sen!2sus"
        ></iframe>
      </section>
      <section className="mx-auto px-6 mt-8 text-center">
        <h1 className="text-2xl mb-2 font-title">Mesa Overland</h1>
        <p className="text-lg pb-0">1020 Old 6 and 50</p>
        <p className="text-lg pb-0">Mack, CO 81525</p>
        <p className="text-lg pb-0">
          {props.data.site.siteMetadata.contact_email}
        </p>
        <p className="text-lg pb-0">
          {props.data.site.siteMetadata.contact_phone}
        </p>
      </section>
      <section className="mx-auto px-6 mt-8 flex flex-col md:flex-row">
        <div className="flex-1 text-center m-4">
          <h3 className="font-title text-xl py-2">Sean</h3>
          <Image
            className="rounded-full h-40 w-40 m-auto"
            fluid={props.data.sean.childImageSharp.fluid}
            alt="Sean"
          />
          <p className="py-4">Co-founder</p>
        </div>
        <div className="flex-1 text-center m-4">
          <h3 className="font-title text-xl py-2">Blayne</h3>
          <Image
            className="rounded-full h-40 w-40 m-auto"
            fluid={props.data.blayne.childImageSharp.fluid}
            alt="Blayne"
          />
          <p className="py-4">Co-founder</p>
        </div>
        <div className="flex-1 text-center m-4">
          <h3 className="font-title text-xl py-2">Floyd</h3>
          <Image
            className="rounded-full h-40 w-40 m-auto"
            fluid={props.data.floyd.childImageSharp.fluid}
            alt="Floyd"
          />
          <p className="py-4">Goodest Boy</p>
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        contact_email
        contact_phone
      }
    }
    sean: file(relativePath: { eq: "sean.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    blayne: file(relativePath: { eq: "blayne.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    floyd: file(relativePath: { eq: "floyd.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default About
