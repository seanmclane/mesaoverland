import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

interface TemplateInput {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        slug: string
        name: string
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
    <div className="mx-auto px-6 mt-8 max-w-screen-md">
      <div className="">
        <Img
          alt={frontmatter.image?.childImageSharp?.fluid}
          fluid={frontmatter.image?.childImageSharp?.fluid}
        />
        <h1 className="mt-8 text-3xl">{frontmatter.name}</h1>
        <h2 className="text-mesa text-sm mt-2">{frontmatter.date}</h2>
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
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
