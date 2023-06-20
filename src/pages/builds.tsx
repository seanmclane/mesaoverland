import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import ImageCard from "../components/ImageCard"
import SEO from "../components/SEO"

interface MDNode {
  node: {
    frontmatter: {
      title: string
      date: string
      status: string
      active: string
      image?: {
        childImageSharp?: {
          fixed: any
        }
      }
    }
    fields: {
      slug: string
    }
  }
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<MDNode>
    }
  }
}

function Builds(props: Props): ReactElement {
  console.log(props)
  return (
    <>
      <SEO title="Builds" />
      <section className="mx-auto px-6 my-2 lg:m-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {props.data.allMarkdownRemark.edges.map((b) =>
              b.node.frontmatter.active ? (
                <div
                  key={b.node.fields.slug}
                  className="my-4 px-4 w-full sm:w-1/2 xl:w-1/3"
                >
                  <ImageCard
                    title={b.node.frontmatter.title}
                    subtitle={b.node.frontmatter.status}
                    date={b.node.frontmatter.date}
                    image={b.node.frontmatter.image?.childImageSharp?.fixed}
                    imageAlt={b.node.frontmatter.title}
                    linkTo={b.node.fields.slug}
                  />
                </div>
              ) : (
                <div></div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query BuildsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/build/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            status
            active
            image {
              childImageSharp {
                fixed(height: 400) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Builds
