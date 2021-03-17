import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"

interface FAQProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        slug: string
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

export default function FAQ({
  data, // this prop will be injected by the GraphQL query below.
}: FAQProps) {
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
      <div className="mx-auto px-6 mt-8 max-w-screen-md mb-8">
        <div className="">
          <Img
            alt={frontmatter.image?.childImageSharp?.fluid}
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
  query FAQQuery {
    markdownRemark(frontmatter: { slug: { eq: "/faq" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
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
