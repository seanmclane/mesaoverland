import React from "react"
import SEO from "../../components/SEO"
import LinkButton from "../../components/LinkButton"

import MidSizeData from "../../content/campers/midsize.json"
import Configurator from "../../components/Configurator"

function MidSize() {
  // Create the number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return (
    <>
      <SEO
        title={MidSizeData.name}
        description={MidSizeData.name}
        image={MidSizeData.photo}
        article
      />
      <Configurator {...MidSizeData} />
      <div className="bg-mesa text-gray-100 py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          <div className="">
            <h2 className="text-3xl font-title uppercase">
              {MidSizeData.name}
            </h2>
            <img
              className="max-w-3xl mx-auto my-8"
              src={MidSizeData.photo}
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
                <li key={o.name}>{o.name}</li>
              ))}
            </ul>
          </div>
          <p>
            *Listed features, options, and pricing subject to change and vehicle
            approval. Contact us for a quote.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-20 px-2">
        <div className="flex w-full flex-wrap justify-center text-center">
          GALLERY OR MORE TEXT HERE
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
      <form name="configure" data-netlify="true">
        <input type="hidden" name="form-name" value="configure" />
        <input type="hidden" name="camper" value="" />
        <input type="hidden" name="selectedOptions" value="" />
        <input type="hidden" name="price" value="" />
        <input type="hidden" name="customerName" value="" />
        <input type="hidden" name="customerEmail" value="" />
        <input type="hidden" name="customerMessage" value="" />
      </form>
    </>
  )
}

export default MidSize
