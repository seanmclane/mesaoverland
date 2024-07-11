import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"
import LinkButton from "../components/LinkButton"
import PanoViewer from "../components/PanoViewer"

interface TemplateInput {
  data: {
    markdownRemark: {
      frontmatter: {
        name: string
        description: string
        photo: {
          childImageSharp?: {
            fluid: any
          }
        }
        shell_price: number
        lead_time_weeks: number
        features: Array<{
          name: string
          description: string
        }>
        specs: Array<{
          name: string
          value: string
        }>
        options: Array<{
          name: string
          price: number
          description: string
          category: string
        }>
        gallery: Array<{
          image?: {
            childImageSharp?: {
              fluid: any
            }
          }
        }>
        panos: string[]
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
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const ModelData = data.markdownRemark.frontmatter
  return (
    <div className="">
      <SEO
        title={ModelData.name}
        description={ModelData.description}
        image={ModelData.photo.childImageSharp?.fluid}
      />
      <div className="bg-mesa text-gray-100 md:py-8">
        <div className="flex w-full flex-wrap flex-row justify-between text-center mx-auto">
          <div className="m-auto w-full md:w-1/2 p-4 max-w-md">
            <h2 className="text-5xl font-title uppercase">{ModelData.name}</h2>
            <p className="text-xl flex-wrap">{ModelData.description}</p>
            <p className="text-xl flex-wrap">
              Starting at{" "}
              <span className="font-bold">
                {formatter.format(ModelData.shell_price)}
              </span>
            </p>
          </div>
          <Img
            className="w-full md:w-1/2 md:rounded-l-lg"
            fluid={ModelData.photo.childImageSharp?.fluid}
            alt={ModelData.name}
          />
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-20 px-2">
        <div className="flex mx-auto flex-wrap justify-around text-center max-w-screen-xl">
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase px-4">
              Standard Build Out
            </h2>
            <ul className="text-xl flex-wrap m-8 text-left">
              {ModelData.features.map((f) => (
                <li key={f.name} className="py-1 ml-0 group">
                  - {f.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase px-4">
              Available Options
            </h2>
            <ul className="text-xl flex-wrap m-8 text-left">
              {ModelData.options
                .filter((o) => o.category !== "color")
                .map((o) => (
                  <li
                    key={o.name}
                    className="flex flex-row justify-between py-1 ml-0"
                  >
                    <span>{o.name}</span>
                    <span className="pl-1 font-bold">
                      {formatter.format(o.price)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <p>
            *Listed features, options, pricing, and delivery subject to change
            and vehicle approval. Contact us for a quote.
          </p>
        </div>
      </div>
      {ModelData.panos && ModelData.panos.length > 0 ? 
        ModelData.panos.map(p => 
        <div className="mt-2" style={{minHeight: '50vh', minWidth: '100%'}}>
          <PanoViewer path={p} />
        </div>)
        : null}
      <div className="mt-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="w-full overflow-auto whitespace-nowrap mr-2">
            {ModelData.gallery.map((g) => {
              return (
                <Img
                  className="ml-2 inline-block rounded-lg w-4/5 md:w-2/3"
                  style={{ maxHeight: "40em", minHeight: "20em" }}
                  fluid={g.image?.childImageSharp?.fluid}
                  alt={g.image?.childImageSharp?.fluid.alt}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-outline py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Specifications</h2>
            <table className="text-lg text-left w-full">
              {ModelData.specs.map((s) => (
                <tr
                  key={s.name}
                  style={{ borderBottomWidth: "1px", borderColor: "black" }}
                >
                  <td className="px-8 font-title">{s.name}</td>
                  <td className="px-8">{s.value}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 z-10">
        <LinkButton
          textColor="text-outline"
          bgColor="bg-white"
          classNames="rounded-r-lg shadow-lg my-6"
          to={`${data.markdownRemark.fields.slug}configure`}
        >
          Build & Price
        </LinkButton>
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        description
        shell_price
        lead_time_weeks
        options {
          name
          price
          description
          category
        }
        features {
          name
          description
        }
        specs {
          name
          value
        }
        photo {
          childImageSharp {
            fluid(maxWidth: 1600) {
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
        panos
      }
      fields {
        slug
      }
    }
  }
`
