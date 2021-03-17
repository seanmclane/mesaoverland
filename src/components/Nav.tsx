import React, { ReactElement, useState } from "react"
import { Link } from "gatsby"

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
        <div className="m-auto max-w-screen-xl flex justify-between p-4">
          <Link
            className="no-underline m-auto lg:m-0 text-center lg:text-left"
            to="/"
          >
            <span
              className="text-xl font-semibold tracking-tight text-gray-500"
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              Mesa
              <br />
              Overland
            </span>
          </Link>
          <div className="hidden lg:block text-gray-700 my-auto">
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
      <nav className="flex flex-wrap items-center justify-items-center p-6 bg-gray-500 max-w-screen-xl mx-auto">
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
