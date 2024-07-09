import React, { ReactElement, useState } from "react"
import { graphql } from "gatsby"
import ModelCard from "../../components/ModelCard"
import SEO from "../../components/SEO"
import Img from "gatsby-image"

interface MDNode {
  node: {
    frontmatter: {
      name: string
      short_description: string
      shell_price: number
      description: string
      photo: {
        childImageSharp?: {
          fixed: any
          fluid: any
        }
      }
      gallery: Array<{
        image?: {
          childImageSharp?: {
            fluid: any
          }
        }
      }>
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

function FlatBed(props: Props): ReactElement {
  const [selectedTruck, setSelectedTruck] = useState("")

  //sort by size matching full slugs
  const sortArray = ["/campers/flatbed/fullmed/", "/campers/flatbed/fulllong/"]
  return (
    <>
      <SEO
        title="Flatbed Campers"
        description="Flat bed camper models from Mesa Overland"
        image={
          props.data.allMarkdownRemark.edges[0].node.frontmatter.photo
            ?.childImageSharp?.fixed
        }
      />
      <div className="bg-mesa text-gray-100 md:py-8">
        <div className="flex w-full flex-wrap flex-row justify-between text-center mx-auto">
          <div className="m-auto w-full md:w-1/2 p-4 max-w-md">
            <h2 className="text-5xl font-title uppercase">Flatbed Campers</h2>
            <p className="text-xl flex-wrap">
              These flatbed campers attach to flatbed mid-size or full-size
              trucks
            </p>
          </div>
          <Img
            className="w-full md:w-1/2 md:rounded-l-lg"
            fluid={
              props.data.allMarkdownRemark.edges[0].node.frontmatter.photo
                ?.childImageSharp?.fluid
            }
            alt="Flat bed camper photo"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <label className="mx-4 text-lg">Truck Type</label>
        <select
          className="px-4"
          value={selectedTruck}
          onChange={(e) => setSelectedTruck(e.target.value)}
        >
          <option value="">All</option>
          <option value="mid">Mid-Size</option>
          <option value="full">Full-Size</option>
        </select>
      </div>
      <section className="mx-auto px-6 my-2 lg:m-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {props.data.allMarkdownRemark.edges.length > 0 ? (
              props.data.allMarkdownRemark.edges
                .filter(
                  (b) =>
                    !selectedTruck || b.node.fields.slug.includes(selectedTruck)
                ).sort((a,b) => sortArray.indexOf(a.node.fields.slug) - sortArray.indexOf(b.node.fields.slug))
                .map((b) => (
                  <div
                    key={b.node.fields.slug}
                    className="my-4 px-4 w-full sm:w-1/2 xl:w-1/3"
                  >
                    <ModelCard
                      name={b.node.frontmatter.name}
                      short_description={b.node.frontmatter.short_description}
                      price={b.node.frontmatter.shell_price}
                      image={b.node.frontmatter.photo?.childImageSharp?.fixed}
                      imageAlt={b.node.frontmatter.name}
                      linkTo={b.node.fields.slug}
                    />
                  </div>
                ))
            ) : (
              <h2 className="mx-auto">Oops, something went wrong!</h2>
            )}
          </div>
        </div>
      </section>
      <div className="my-4 text-center">
        <h2 className="text-2xl">Flatbed Camper Photos</h2>
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="w-full overflow-auto whitespace-nowrap mr-2">
            {props.data.allMarkdownRemark.edges.map((n) =>
              n.node.frontmatter.gallery.map((g) => {
                return (
                  <Img
                    className="ml-2 inline-block rounded-lg w-4/5 md:w-2/3"
                    style={{ maxHeight: "40em", minHeight: "20em" }}
                    fluid={g.image?.childImageSharp?.fluid}
                    alt={g.image?.childImageSharp?.fluid.alt}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query FlatBedQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/campers/flatbed/" } }
      sort: { frontmatter: {name: ASC} }
      limit: 10
    ) {
      edges {
        node {
          frontmatter {
            name
            short_description
            shell_price
            description
            photo {
              childImageSharp {
                fixed(height: 400) {
                  ...GatsbyImageSharpFixed
                }
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            gallery {
              image {
                childImageSharp {
                  fluid(maxWidth: 1600) {
                    ...GatsbyImageSharpFluid
                  }
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

export default FlatBed
