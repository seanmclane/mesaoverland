import React, { ChangeEventHandler, useState } from "react"
import Img from "gatsby-image"
const infoicon = require("../../static/images/icon-info.svg")

interface Props {
  handleChange: ChangeEventHandler
  checked: boolean
  fullWidth: boolean
  option: {
    name: string
    category: string
    price: number
    description: string
    image?: {
      childImageSharp?: {
        fixed: any
      }
    }
  }
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function FormOption({ handleChange, option, checked, fullWidth }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div
      key={option.name}
      className={`text-left w-full ${fullWidth ? "" : "md:w-1/2"} flex-row`}
    >
      <h4 className="mb-1 mt-1 mx-4 text-sm flex flex-row justify-between">
        {option.name}{" "}
        {!option.description ? null : (
          <div className="relative">
            <img
              src={infoicon}
              alt="info"
              className="mx-2 cursor-pointer"
              onClick={() => setShow(!show)}
            />
            <div
              className={`${
                show ? "block" : "hidden"
              } bg-white border-2 border-outline border-solid absolute right-0 p-2 rounded-lg font-body max-w-md z-10`}
            >
              <div className="">
                {option.description}
                <br />
                {option.image && (
                  <Img fixed={option.image.childImageSharp?.fixed} />
                )}
              </div>
            </div>
          </div>
        )}
      </h4>
      <label className="">
        <div
          className={`flex flex-row justify-between p-4 mx-4 rounded-lg text-sm ${
            checked ? "bg-mesa text-gray-100" : "bg-gray-100 text-outline"
          } `}
        >
          <div className="flex flex-row align-middle">
            {option.category === "color" && option.image ? (
              <Img
                fixed={option.image.childImageSharp?.fixed}
                style={{
                  width: "3em",
                  height: "3em",
                }}
                className="border-2 border-solid border-gray-800 rounded-lg"
              />
            ) : null}
            <input
              className="text-black hidden"
              type="checkbox"
              name={option.name}
              value={option.price}
              checked={checked}
              onChange={handleChange}
            />
            {checked ? (
              <span className="px-4 font-bold">Remove</span>
            ) : (
              <span className="text-mesa font-bold px-4">Add</span>
            )}
          </div>
          <span className="font-bold">{formatter.format(option.price)}</span>
        </div>
      </label>
    </div>
  )
}

export default FormOption
