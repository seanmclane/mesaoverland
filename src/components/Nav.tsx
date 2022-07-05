import React, { ReactElement, useState } from "react"
import { Link } from "gatsby"
const logo = require("../../static/images/logo.png")
const ig = require("../../static/images/icon-ig.svg")
const fb = require("../../static/images/icon-fb.svg")
const yt = require("../../static/images/icon-yt.svg")

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
        <div className="flex flex-1 flex-col lg:flex-row justify-between px-6 py-2 m-auto max-w-5xl">
          <Link className="w-20 lg:w-40 m-auto lg:m-0" to="/">
            <img
              className="m-auto"
              onClick={() => {
                setMenuOpen(false)
              }}
              src={logo}
              alt="Mesa Overland Logo"
              width="150"
            />
          </Link>
          <div className="text-outline my-4 text-center lg:my-auto text-md lg:text-base">
            <p className="py-0">
              <span className="">Phone: </span>{" "}
              <span className="font-body lowercase">205-613-0330</span>
            </p>
            <p className="py-0">
              <span className="">Email: </span>{" "}
              <span className="font-body lowercase">info@mesaoverland.com</span>
            </p>
            <div className="flex flex-row justify-center mt-2">
              <a href="https://www.instagram.com/mesaoverland/">
                <img src={ig} alt="instagram" className="mx-2" />
              </a>
              <a href="https://www.facebook.com/mesaoverland/">
                <img src={fb} alt="facebook" className="mx-2" />
              </a>
              <a href="https://www.youtube.com/channel/UCD4XzcEwC4fL9UzwMZwC2Hg">
                <img src={yt} alt="youtube" className="mx-2" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <nav className="flex flex-wrap items-center justify-items-center p-6 bg-outline mx-auto">
        <div className="block lg:hidden m-auto">
          <button
            onClick={() => {
              setMenuOpen((isMenuOpen) => !isMenuOpen)
            }}
            className="flex items-center px-4 text-gray-200 rounded hover:text-white"
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
