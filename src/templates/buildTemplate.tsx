import React from "react"
import { graphql } from "gatsby"

interface TemplateInput {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        slug: string
        name: string
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
    <div className="mx-auto px-6 my-2 lg:m-4">
      <div className="">
        <h1>{frontmatter.name}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="" dangerouslySetInnerHTML={{ __html: html }} />
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
      }
    }
  }
`
