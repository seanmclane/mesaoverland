import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/SEO"
import LinkButton from "../../components/LinkButton"
import Configurator from "../../components/Configurator"

interface Props {
  data: {
    midSizeData: {
      frontmatter: {
        name: string
        photo: {
          childImageSharp?: {
            fluid: any
          }
        }
        upfit_price: number
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
        }>
        gallery: Array<{
          image?: {
            childImageSharp?: {
              fluid: any
            }
          }
        }>
      }
    }
  }
}

function MidSize({ data }: Props) {
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const MidSizeData = data.midSizeData.frontmatter
  return (
    <div className="">
      <SEO
        title={MidSizeData.name}
        description={MidSizeData.name}
        image={MidSizeData.photo.childImageSharp?.fluid}
        article
      />
      <Configurator {...MidSizeData} />
      <div className="bg-mesa text-gray-100 py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="w-full">
            <h2 className="text-3xl font-title uppercase">
              {MidSizeData.name}
            </h2>
            <Img
              className="max-w-3xl mx-auto my-8"
              fluid={MidSizeData.photo.childImageSharp?.fluid}
              alt={MidSizeData.name}
            />
            <p className="text-xl flex-wrap">
              Starting at{" "}
              <span className="font-bold">
                {formatter.format(MidSizeData.upfit_price)}
              </span>{" "}
              fully upfit
            </p>
            <p className="text-xl flex-wrap">
              Only{" "}
              <span className="font-bold">
                {formatter.format(MidSizeData.shell_price)}
              </span>{" "}
              as a shell
            </p>
          </div>
        </div>
      </div>
      <div className="bg-outline text-gray-100 py-20 px-2">
        <div className="flex mx-auto flex-wrap justify-around text-center max-w-screen-xl">
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Features</h2>
            <ul className="text-xl flex-wrap m-8 text-left">
              {MidSizeData.features.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
          <div className="my-8 md:w-1/2">
            <h2 className="text-3xl font-title uppercase">Options</h2>
            <ul className="text-xl flex-wrap m-8 text-left">
              {MidSizeData.options.map((o) => (
                <li key={o.name} className="flex flex-row justify-between">
                  <span>{o.name}</span>
                  <span className="font-bold">{formatter.format(o.price)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            *Listed features, options, and pricing subject to change and vehicle
            approval. Contact us for a quote.
          </p>
        </div>
      </div>
      <div className="my-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="w-auto overflow-auto whitespace-nowrap">
            {MidSizeData.gallery.map((g) => {
              return (
                <img
                  className="m-0 px-2 inline-block w-auto max-h-[40em] object-cover"
                  src={g.image?.childImageSharp?.fluid.src}
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
            <ul className="m-4 text-lg text-left flex flex-wrap flex-row">
              {MidSizeData.specs.map((s) => (
                <li key={s.name} className="ml-0 px-4 w-1/3">
                  <h4 className="m-0">{s.name}</h4>
                  <p className="m-0">{s.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-mesa text-gray-100 py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">Custom Models</h2>
            <p className="text-xl flex-wrap">
              If you want something a little different than our standard models,
              reach out! We can fabricate almost anything you can dream up.
            </p>
            <LinkButton to="/contact" textColor="text-gray-100">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </div>
      {/* hidden configurator form for netlify to pick up */}
      <form
        name="configure"
        data-netlify="true"
        action="/thankyou"
        method="post"
      >
        <input type="hidden" name="form-name" value="configure" />
        <input type="hidden" name="camper" value="" />
        <input type="hidden" name="selectedOptions" value="" />
        <input type="hidden" name="price" value="" />
        <input type="hidden" name="customerName" value="" />
        <input type="hidden" name="customerEmail" value="" />
        <input type="hidden" name="customerMessage" value="" />
      </form>
    </div>
  )
}

export const query = graphql`
  query MidSizeQuery {
    midSizeData: markdownRemark(
      fileAbsolutePath: { regex: "/content/campers/midsize/" }
    ) {
      frontmatter {
        name
        upfit_price
        shell_price
        lead_time_weeks
        options {
          name
          price
          description
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
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        gallery {
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default MidSize
