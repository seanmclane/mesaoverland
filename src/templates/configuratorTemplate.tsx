import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/SEO"
import Button from "../components/Button"
import FormOption from "../components/FormOption"

interface TemplateInput {
  data: {
    markdownRemark: {
      frontmatter: {
        name: string
        short_description: string
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
      }
      fields: {
        slug: string
      }
    }
  }
}

interface Configuration {
  camper: string
  price: number
  selectedOptions: Array<{
    name: string
    price: number
  }>
  customerName: string
  customerEmail: string
  customerMessage: string
}

function encode(data: FormData) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateInput) {
  const camper = data.markdownRemark.frontmatter

  //Configuration state will be form data sent in the end
  const [configuration, setConfiguration]: [Configuration, any] = useState({
    camper: camper.name,
    price: camper.shell_price,
    selectedOptions: [],
    customerName: "",
    customerEmail: "",
    customerMessage: "",
  })

  //Keep other unnecessary form data local
  const [optionState, setOptionState] = useState({})

  const calculatePrice = (basePrice, options) => {
    return options.reduce(
      (total, current) => total + parseInt(current.price),
      basePrice
    )
  }

  const [emailValidState, setEmailValidState] = useState(true)
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    setEmailValidState(re.test(email))
  }

  const handleChange = (e) => {
    //Go through all options and see if they're selected or not
    var newSelectedOptions = []
    if (e.target.checked) {
      newSelectedOptions = [
        ...configuration.selectedOptions,
        {
          name: e.target.name,
          price: e.target.value,
        },
      ]
    } else {
      newSelectedOptions = configuration.selectedOptions.filter(
        (o) => !o.name.includes(e.target.name)
      )
    }
    //Set the options list and the updated price
    const newPrice = calculatePrice(camper.shell_price, newSelectedOptions)
    setConfiguration({
      ...configuration,
      price: newPrice,
      selectedOptions: newSelectedOptions,
    })

    //Control checkboxes state
    setOptionState({ ...optionState, [e.target.name]: e.target.checked })
  }

  const handleContact = (e) => {
    setConfiguration({ ...configuration, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line
    const form = e.target
    const serializedOptions = configuration.selectedOptions.reduce(
      (total, current) => total + current.name + ", ",
      ""
    )
    if (emailValidState && configuration.customerEmail) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "configure",
          ...configuration,
          selectedOptions: serializedOptions,
        }),
      })
        .then(() => navigate("/thankyou"))
        .catch((error) => alert(error))
    }
  }

  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  //Calculate lead time to display
  const lead_time = new Date()
  lead_time.setDate(lead_time.getDate() + camper.lead_time_weeks * 7)

  const ModelData = data.markdownRemark.frontmatter
  return (
    <div className="">
      <SEO
        title={`Build & Price ${ModelData.name}`}
        description={ModelData.description}
        image={ModelData.photo.childImageSharp?.fluid}
      />
      <div className="bg-mesa text-gray-100 md:py-8">
        <div className="flex w-full flex-wrap flex-row justify-between text-center mx-auto">
          <div className="m-auto w-full md:w-1/2 p-4 max-w-xl">
            <h2 className="text-5xl font-title uppercase">
              Configure Your {ModelData.name}
            </h2>
            <h4>{ModelData.short_description}</h4>
          </div>
          <Img
            className="w-full md:w-1/2 md:rounded-l-lg"
            fluid={ModelData.photo.childImageSharp?.fluid}
            alt={ModelData.name}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col justify-center text-center mx-auto">
          <form onSubmit={handleSubmit} className="mt-4">
            <h3 className="bg-outline text-gray-100 rounded-lg mb-0">
              Standard Build Out
            </h3>
            <div className="text-left flex flex-row flex-wrap">
              {camper.features.map((f) => (
                <p
                  key={f.name}
                  className="px-4 pb-0 w-full md:w-1/2"
                  style={{ borderBottomWidth: "1px", borderColor: "black" }}
                >
                  {f.name}
                </p>
              ))}
            </div>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "standard")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={true}
                    />
                  )
                })}
            </div>
            <h3 className="bg-outline text-gray-100 rounded-lg mb-0">
              Windows
            </h3>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "window")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={false}
                    />
                  )
                })}
            </div>
            <h3 className="bg-outline text-gray-100 rounded-lg mb-0">
              Paint Color
            </h3>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "color")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={false}
                    />
                  )
                })}
            </div>
            <h3 className="bg-outline text-gray-100 rounded-lg mb-0">
              Exterior Options
            </h3>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "exterior")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={false}
                    />
                  )
                })}
            </div>
            <h3 className="bg-outline text-gray-100 rounded-lg mb-0">
              Interior Options
            </h3>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "interior")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={false}
                    />
                  )
                })}
            </div>
            <h3 className="bg-outline text-gray-100 rounded-lg mb-4">
              Accessories
            </h3>
            <div className="flex flex-row flex-wrap">
              {camper.options
                .filter((o) => o.category === "accessory")
                .map((o) => {
                  return (
                    <FormOption
                      option={o}
                      handleChange={handleChange}
                      checked={optionState[o.name]}
                      fullWidth={false}
                    />
                  )
                })}
            </div>
            <div className="mb-4">
              <p className="py-0 text-xs">
                *Note custom options or specific requests in the message box
                below
              </p>
              <p className="py-0 text-xs">
                *Available color selections and prices subject to change
              </p>
            </div>
            {/* <div className="">
                  <h3 className="mb-0">Selected Options</h3>
                  <ul className="text-left w-full px-4">
                    {configuration.selectedOptions.map((o) => (
                      <li key={o.name} className="p-1">
                        {o.name}
                      </li>
                    ))}
                  </ul>
                </div> */}
            <p>
              <label className="font-title">
                Name
                <br />
                <input
                  className="text-outline font-body p-2 w-2/3 border-gray-300 border-2"
                  type="text"
                  name="customerName"
                  required
                  value={configuration.customerName}
                  onChange={handleContact}
                />
              </label>
            </p>
            <p>
              <label className="font-title">
                Email
                <br />
                <input
                  className="text-outline font-body p-2 w-2/3 border-gray-300 border-2"
                  type="email"
                  name="customerEmail"
                  required
                  value={configuration.customerEmail}
                  onChange={handleContact}
                  onBlur={() => validateEmail(configuration.customerEmail)}
                />
                {emailValidState ? null : (
                  <p className="text-sm text-red-600 font-body p-0 m-0">
                    Please enter a valid email
                  </p>
                )}
              </label>
            </p>
            <p style={{ minHeight: "30em" }}>
              <label className="font-title">
                Message
                <br />
                <textarea
                  className="resize-none text-outline font-body p-2 w-2/3 h-40 border-gray-300 border-2"
                  name="customerMessage"
                  value={configuration.customerMessage}
                  onChange={handleContact}
                />
              </label>
            </p>
            <div className="fixed flex flex-col md:flex-row justify-between left-0 bottom-0 min-w-full bg-outline text-gray-100 px-4">
              <div className="flex flex-col mt-2 md:my-auto">
                <h4 className="my-auto text-lg md:text-xl ">{camper.name}</h4>
                <h5 className="my-auto text-md md:text-lg">
                  {formatter.format(configuration.price)}
                </h5>
              </div>
              <div className="flex flex-col mb-0 md:my-auto">
                <h4 className="my-auto text-sm md:text-md">Est. Delivery</h4>
                <h5 className="my-auto text-xs md:text-sm">
                  {lead_time.toLocaleString("en-us", {
                    month: "short",
                    year: "numeric",
                  })}
                </h5>
              </div>
              <Button
                type="submit"
                bgColor="bg-mesa"
                classNames="min-w-full md:min-w-0 my-4"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
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
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        short_description
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
      fields {
        slug
      }
    }
  }
`
