import React from "react";
import ReactDOMServer from "react-dom/server";

function renderEmail(component: React.ReactElement) {
  return "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(component);
}

export default renderEmail;
