import React, { ReactElement, useState } from "react"
import { navigate } from "gatsby-link"
import Button from "./Button"

interface Props {
  name: string
  shell_price: number
  upfit_price: number
  photo: string
  features: Array<{
    name: string
    description: string
  }>
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
    price: camper.upfit_price, //default to upfit price
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
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
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
    const newPrice = calculatePrice(camper.upfit_price, newSelectedOptions)
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
    const form = e.target
    const serializedOptions = configuration.selectedOptions.reduce(
      (total, current) => total + current.name + ", ",
      ""
    )
    if (validateEmail(configuration.customerEmail)) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "configure",
          ...configuration,
          selectedOptions: serializedOptions,
        }),
      })
        .then(() => navigate(form.getAttribute("action")))
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

  return (
    show && (
      <div className="fixed left-0 top-0 min-w-full min-h-full bg-gray-100 overflow-scroll">
        <div className="absolute min-w-full">
          <div className="fixed left-4 top-4 m-0">
            <Button
              bgColor="bg-transparent"
              textColor="text-outline"
              classNames="text-4xl"
              onClick={() => setShow(false)}
            >
              &times;
            </Button>
          </div>
          <div className="bg-gray-100">
            <div className="flex flex-col md:flex-row w-full justify-center text-center mx-auto">
              <div
                className="w-full min-h-[20em] max-h-screen md:w-3/5 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url('${camper.photo}'` }}
              >
                {/* <img
                  className=""
                  src={camper.photo}
                  alt={camper.name}
                /> */}
              </div>
              <form
                name="configure"
                method="post"
                action="/"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="w-full md:w-2/5 min-h-screen mt-4"
              >
                {/* {camper.features.map((f) => (
                  <p key={f.name}>{f.name}</p>
                ))}
                {configuration.selectedOptions.map((o) => (
                  <p key={o.name}>{o.name}</p>
                ))} */}
                <input type="hidden" name="form-name" value="configure" />
                {camper.options.map((o) => {
                  return (
                    <p key={o.name} className="text-left">
                      <label className="">
                        <h4 className="mb-1 mt-0 mx-4 text-sm">{o.name}</h4>
                        <div className="flex flex-row justify-between p-4 mx-4 rounded-lg bg-gray-200 text-outline text-sm">
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
                      className="text-outline font-body p-2 w-2/3"
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
                      className="text-outline font-body p-2 w-2/3"
                      type="email"
                      name="customerEmail"
                      required
                      value={configuration.customerEmail}
                      onChange={handleContact}
                    />
                    {validateEmail(configuration.customerEmail) ? null : (
                      <p className="text-sm text-red font-body p-0 m-0">
                        Please enter a valid email
                      </p>
                    )}
                  </label>
                </p>
                <p>
                  <label className="font-title">
                    Message
                    <br />
                    <textarea
                      className="text-outline font-body p-2 w-2/3 h-40"
                      name="customerMessage"
                      value={configuration.customerMessage}
                      onChange={handleContact}
                    />
                  </label>
                </p>
                <div className="fixed flex flex-col md:flex-row justify-between left-0 bottom-0 min-w-full bg-outline text-gray-100 px-4">
                  <div className="flex flex-col mt-4 md:my-auto">
                    <h4 className="my-auto text-xl ">{camper.name}</h4>
                    <h5 className="my-auto text-lg">
                      {formatter.format(configuration.price)}
                    </h5>
                  </div>
                  <div className="flex flex-col mb-2 md:my-auto">
                    <h4 className="my-auto text-md">Est. Weight</h4>
                    <h5 className="my-auto text-xs">configuration.weight</h5>
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

  return (
    <>
      {/* Overlay "Build and Price" button */}
      <div className="fixed left-0 bottom-0">
        <Button
          textColor="text-outline"
          bgColor="bg-gray-100"
          classNames="rounded-lg shadow-lg m-6"
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
