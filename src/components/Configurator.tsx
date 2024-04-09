import React, { ReactElement, useState, useEffect } from "react"
import { navigate } from "gatsby-link"
import Button from "./Button"

interface Props {
  name: string
  shell_price: number
  lead_time_weeks: number
  features: Array<{
    name: string
    description: string
  }>
  photo: {
    childImageSharp?: {
      fluid: any
    }
  }
  options: Array<{
    name: string
    price: number
    description: string
  }>
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

//Configurator view mostly in this modal
function Modal({ show, setShow, camper }) {
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

  return (
    show && (
      <div className="fixed left-0 top-0 min-w-full min-h-full bg-white overflow-scroll z-20">
        <div className="absolute min-w-full">
          <div className="fixed left-4 top-4 m-0">
            <Button
              bgColor="bg-transparent"
              textColor="text-outline"
              classNames="text-4xl"
              onClick={() => {
                setShow(false)
              }}
            >
              &times;
            </Button>
          </div>
          <div className="">
            <div className="flex flex-col md:flex-row w-full justify-center text-center mx-auto">
              <div className="w-full max-h-screen md:w-3/5">
                <div
                  className="h-full bg-no-repeat bg-cover bg-center rounded-br-lg"
                  style={{
                    backgroundImage: `url('${camper.photo.childImageSharp.fluid.src}'`,
                    minHeight: "20em",
                  }}
                ></div>
                <div className="hidden md:block">
                  <h3 className="mb-0">Standard Build Out</h3>
                  <ul className="text-left w-full px-4">
                    {camper.features.map((f) => (
                      <li key={f.name} className="p-1">
                        {f.name}
                      </li>
                    ))}
                  </ul>
                  <p className="py-0 text-xs">
                    *Must select "Standard Build Out" option
                  </p>
                </div>
                <div className="hidden md:block">
                  <h3 className="mb-0">Selected Options</h3>
                  <ul className="text-left w-full px-4">
                    {configuration.selectedOptions.map((o) => (
                      <li key={o.name} className="p-1">
                        {o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <form
                name="configure"
                method="post"
                action="/thankyou"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="w-full md:w-2/5 min-h-screen mt-4"
              >
                <input type="hidden" name="form-name" value="configure" />
                {camper.options.map((o) => {
                  return (
                    <p key={o.name} className="text-left">
                      <label className="">
                        <h4 className="mb-1 mt-0 mx-4 text-sm">{o.name}</h4>
                        <div className="flex flex-row justify-between p-4 mx-4 rounded-lg bg-gray-100 text-outline text-sm">
                          <div>
                            <input
                              className="text-black"
                              type="checkbox"
                              name={o.name}
                              value={o.price}
                              checked={optionState[o.name]}
                              onChange={handleChange}
                            />
                            {optionState[o.name] ? (
                              <span className="px-4">Option selected</span>
                            ) : (
                              <span className="text-gray-500 px-4">
                                Add option
                              </span>
                            )}
                          </div>
                          <span className="font-bold">
                            {formatter.format(o.price)}
                          </span>
                        </div>
                      </label>
                    </p>
                  )
                })}
                <div className="mb-4">
                  <p className="py-0 text-xs">
                    *Some combinations of options are required and/or not
                    possible.
                  </p>
                  <p className="py-0 text-xs">
                    *Contact me for custom options or specific requests.
                  </p>
                  <p className="py-0 text-xs">
                    *Available color selections and prices subject to change
                  </p>
                </div>
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
                    <h4 className="my-auto text-lg md:text-xl ">
                      {camper.name}
                    </h4>
                    <h5 className="my-auto text-md md:text-lg">
                      {formatter.format(configuration.price)}
                    </h5>
                  </div>
                  <div className="flex flex-col mb-0 md:my-auto">
                    <h4 className="my-auto text-sm md:text-md">
                      Est. Delivery
                    </h4>
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
        </div>
      </div>
    )
  )
}

function Configurator(props: Props): ReactElement {
  const [show, setShow] = useState(false)

  //stop body scroll when modal shown so modal scrolls and add scroll back when closed
  useEffect(() => {
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset")
  }, [show])

  return (
    <>
      {/* Overlay "Build and Price" button */}
      <div className="fixed left-0 bottom-0 z-10">
        <Button
          textColor="text-outline"
          bgColor="bg-white"
          classNames="rounded-r-lg shadow-lg my-6"
          onClick={() => setShow(true)}
        >
          Build & Price
        </Button>
      </div>
      {/* Modal overlay */}
      <Modal show={show} setShow={setShow} camper={props} />
    </>
  )
}

export default Configurator
