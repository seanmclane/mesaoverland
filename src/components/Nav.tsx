import React, { ReactElement, useState } from "react"
import { Link } from "gatsby"
const logo = require("../../static/images/logo.png")

interface Props {
  links: Array<{
    title: string
    href: string
  }>
}

function Nav(props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <header>
        <div className="mx-auto text-center p-4">
          <Link className="" to="/">
            <img
              className="m-auto"
              onClick={() => {
                setMenuOpen(false)
              }}
              src={logo}
              alt="Mesa Overland"
              width="300"
            />
          </Link>
          <div className="text-gray-700">
            <p className="py-0">
              <span className="">Phone: </span>{" "}
              <span className="font-body lowercase">970-688-8068</span>
            </p>
            <p className="py-0">
              <span className="">Email: </span>{" "}
              <span className="font-body lowercase">info@mesaoverland.com</span>
            </p>
          </div>
        </div>
      </header>
      <nav className="flex flex-wrap items-center justify-items-center p-6 bg-sky mx-auto">
        <div className="block lg:hidden m-auto">
          <button
            onClick={() => {
              setMenuOpen((isMenuOpen) => !isMenuOpen)
            }}
            className="flex items-center px-3 py-2 text-gray-200 rounded hover:text-white"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${
            isMenuOpen ? "block" : "hidden"
          } flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-md text-center lg:flex-grow lg:text-center">
            {props.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                activeClassName="font-bold"
                onClick={() => {
                  setMenuOpen(false)
                }}
                className="block mt-4 px-4 text-gray-200 lg:inline-block lg:mt-0 hover:text-white no-underline"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
