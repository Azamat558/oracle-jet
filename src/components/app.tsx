/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
// import React from 'react';
import { registerCustomElement } from "ojs/ojvcomponent";

import { h } from "preact";
import { useEffect } from "preact/hooks";
import Context from "ojs/ojcontext";
import { Footer } from "./footer";
import { Header } from "./header";
import { Content } from "./content/index";

type Props = Readonly<{
  appName?: string;
  userLogin?: string;
}>;
export const App = registerCustomElement(
  "app-root",
  ({ appName = "App Name", userLogin = "john.hancock@oracle.com" }: Props) => {
    useEffect(() => {
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    }, []);

    return (
      <div id="appContainer" className="oj-web-applayout-page">
        <Header appName={appName} userLogin={userLogin} />
        <Content />
        <Footer />
      </div>
    );
  }
);
