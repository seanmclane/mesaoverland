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
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...configuration,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error))
  }

  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

  return (
    show && (
      <div className="fixed left-0 top-0 min-w-full min-h-full bg-gray-100 overflow-scroll">
        <div className="absolute min-w-full">
          <div className="fixed right-4 top-4">
            <Button
              bgColor="bg-transparent"
              textColor="text-outline"
              classNames="text-4xl"
              onClick={() => setShow(false)}
            >
              &times;
            </Button>
          </div>
          <div className="bg-gray-100 my-20 mx-2">
            <div className="flex flex-col w-full justify-center text-center">
              <img
                className="max-w-lg mx-auto"
                src={camper.photo}
                alt={camper.name}
              />
              <h2 className="mb-0 text-2xl">{camper.name}</h2>
              <h3 className="">{formatter.format(configuration.price)}</h3>
              <form
                name="configure"
                method="post"
                action="/"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="mx-auto"
              >
                <input type="hidden" name="form-name" value="configure" />
                {camper.options.map((o) => {
                  return (
                    <p key={o.name} className="text-left">
                      <label className="">
                        <input
                          className="text-black mx-4"
                          type="checkbox"
                          name={o.name}
                          value={o.price}
                          checked={optionState[o.name]}
                          onChange={handleChange}
                        />
                        <span>
                          {o.name} - {formatter.format(o.price)}
                        </span>
                      </label>
                    </p>
                  )
                })}
                <p>
                  <label>
                    Name:
                    <br />
                    <input
                      className="text-black p-2 w-2/3"
                      type="text"
                      name="customerName"
                      value={configuration.customerName}
                      onChange={handleContact}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Email:
                    <br />
                    <input
                      className="text-black p-2 w-2/3"
                      type="email"
                      name="customerEmail"
                      value={configuration.customerEmail}
                      onChange={handleContact}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Message:
                    <br />
                    <textarea
                      className="text-black p-2 w-2/3 h-40"
                      name="customerMessage"
                      value={configuration.customerMessage}
                      onChange={handleContact}
                    />
                  </label>
                </p>
                <h4 className="mb-0 text-xl">{camper.name}</h4>
                {camper.features.map((f) => (
                  <p key={f.name}>{f.name}</p>
                ))}
                {configuration.selectedOptions.map((o) => (
                  <p key={o.name}>{o.name}</p>
                ))}
                <h5 className="">{formatter.format(configuration.price)}</h5>
                <Button onClick={handleSubmit}>Submit</Button>
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
      <div className="fixed left-0 bottom-6 min-w-full text-center">
        <Button
          textColor="text-outline"
          bgColor="bg-gray-100"
          classNames="rounded-lg shadow-lg"
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
