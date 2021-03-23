import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"

interface TemplateInput {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        slug: string
        name: string
        status: string
        image?: {
          childImageSharp?: {
            fluid: any
          }
        }
      }
    }
  }
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateInput) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <SEO
        title={frontmatter.name}
        description={frontmatter.name}
        image={frontmatter.image?.childImageSharp?.fluid.src}
        article
      />
      <div className="mx-auto px-6 mt-8 max-w-screen-md mb-8">
        <div className="">
          <Img
            alt={frontmatter.image?.childImageSharp?.fluid}
            fluid={frontmatter.image?.childImageSharp?.fluid}
          />
          <h1 className="mt-8 text-3xl font-title uppercase">
            {frontmatter.name}
          </h1>
          <h2 className="text-sm mb-2">
            STATUS:<span className="text-mesa"> {frontmatter.status}</span>
          </h2>
          <h2 className="text-sm">
            LAST UPDATED: <span className="text-mesa">{frontmatter.date}</span>
          </h2>
          <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        name
        status
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
