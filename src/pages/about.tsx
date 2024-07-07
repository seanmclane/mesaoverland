import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import Image from "gatsby-image"

interface Props {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
      }
    }
    site: {
      siteMetadata: {
        contact_email: string
        contact_phone: string
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
      <SEO title={props.data.markdownRemark.frontmatter.title} />
      <section className="mx-auto px-6 mt-8 text-center">
        <h1 className="text-2xl mb-2 font-title">Mesa Overland</h1>
        {/* <p className="text-lg pb-0">1020 Old 6 and 50</p>
        <p className="text-lg pb-0">Mack, CO 81525</p> */}
        <p className="text-lg pb-0">
          {props.data.site.siteMetadata.contact_email}
        </p>
        {/* <p className="text-lg pb-0">
          {props.data.site.siteMetadata.contact_phone}
        </p> */}
      </section>
      <section className="mx-auto mt-8 text-center">
        <div
          className="mt-8 max-w-5xl mx-auto px-4"
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />
      </section>
      <section className="mx-auto mt-8 text-center">
        <h2 className="font-title text-3xl bg-mesa text-white py-8">
          The Team
        </h2>
        <div className="px-6 flex flex-col md:flex-row">
          <div className="flex-1 text-center m-4">
            <h3 className="font-title text-xl py-2">Blayne</h3>
            <Image
              className="rounded-full h-40 w-40 m-auto"
              fluid={props.data.blayne.childImageSharp.fluid}
              alt="Blayne"
            />
            <p className="py-4">Founder</p>
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
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query AboutQuery {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    site {
      siteMetadata {
        contact_email
        contact_phone
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
