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
    <nav className="flex flex-wrap items-center justify-between p-6 bg-gray-500">
      <div className="flex items-center flex-shrink-0 mr-8 text-white">
        <Link className="no-underline" to="/">
          <span
            className="text-xl font-semibold tracking-tight text-white"
            onClick={() => {
              setMenuOpen(false)
            }}
          >
            Mesa
            <br />
            Overland
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => {
            setMenuOpen((isMenuOpen) => !isMenuOpen)
          }}
          className="flex items-center px-3 py-2 text-gray-200 border border-gray-400 rounded hover:text-white hover:border-white"
        >
          <svg
            className="w-3 h-3 fill-current"
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
        <div className="text-md text-center lg:flex-grow lg:text-right">
          {props.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              activeClassName="font-bold"
              onClick={() => {
                setMenuOpen(false)
              }}
              className="block mt-4 mr-4 px-4 text-gray-200 lg:inline-block lg:mt-0 hover:text-white no-underline"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav
