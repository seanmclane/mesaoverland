import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"

interface ServicesProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        title: string
        image?: {
          childImageSharp?: {
            fluid: any
          }
        }
      }
    }
  }
}

export default function Services({
  data, // this prop will be injected by the GraphQL query below.
}: ServicesProps) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.title}
        image={frontmatter.image?.childImageSharp?.fluid.src}
        article
      />
      <div className="mx-auto px-4 mt-8 max-w-5xl mb-8">
        <div className="">
          <Img
            alt={frontmatter.title}
            fluid={frontmatter.image?.childImageSharp?.fluid}
          />
          <h1 className="mt-8 text-3xl font-title uppercase">
            {frontmatter.title}
          </h1>
          <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
export const query = graphql`
  query ServicesQuery {
    markdownRemark(fields: { slug: { eq: "/services/" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
