/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import React from "react";
import { useRef, useState, useEffect } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojoption";
import "ojs/ojbutton";

type Props = Readonly<{
  appName: string;
  userLogin: string;
}>;

export function Header({ appName, userLogin }: Props) {
  const mediaQueryRef = useRef<MediaQueryList>(
    window.matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")!)
  );

  const [isSmallWidth, setIsSmallWidth] = useState(
    mediaQueryRef.current.matches
  );

  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQueryRef.current.removeEventListener(
        "change",
        handleMediaQueryChange
      );
  }, [mediaQueryRef]);

  function handleMediaQueryChange(e: MediaQueryListEvent) {
    setIsSmallWidth(e.matches);
  }

  function getDisplayType() {
    return isSmallWidth ? "icons" : "all";
  }

  function getEndIconClass() {
    return isSmallWidth
      ? "oj-icon demo-appheader-avatar"
      : "oj-component-icon oj-button-menu-dropdown-icon";
  }

  return (
    <header role="banner" className="oj-web-applayout-header">
      <div className="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
        <div className="oj-flex-bar-middle oj-sm-align-items-baseline">
          <span
            role="img"
            className="oj-icon demo-oracle-icon"
            title="Oracle Logo"
            alt="Oracle Logo"
          ></span>
          <h1
            className="oj-sm-only-hide oj-web-applayout-header-title"
            title="Application Name"
          >
            {appName}
          </h1>
        </div>
        <div className="oj-flex-bar-end">
          <oj-toolbar>
            <oj-menu-button
              id="userMenu"
              display={getDisplayType()}
              chroming="borderless"
            >
              <span>{userLogin}</span>
              <span slot="endIcon" className={getEndIconClass()}></span>
              <oj-menu id="menu1" slot="menu">
                <oj-option id="pref" value="pref">
                  Preferences
                </oj-option>
                <oj-option id="help" value="help">
                  Help
                </oj-option>
                <oj-option id="about" value="about">
                  About
                </oj-option>
                <oj-option id="out" value="out">
                  Sign Out
                </oj-option>
              </oj-menu>
            </oj-menu-button>
          </oj-toolbar>
        </div>
      </div>
    </header>
  );
}
