import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"

interface TemplateInput {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        price: number
        title: string
        status: string
        image?: {
          childImageSharp?: {
            fluid: any
          }
        }
      }
      fields: {
        slug: string
      }
    }
  }
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateInput) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.title}
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
            {frontmatter.title}
          </h1>
          <h2 className="text-md mb-0">
            <span className="text-mesa">
              {formatter.format(frontmatter.price)}
            </span>
          </h2>
          <h2 className="text-sm mb-2">
            <span className="text-black"> {frontmatter.status}</span>
          </h2>
          <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        price
        status
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
