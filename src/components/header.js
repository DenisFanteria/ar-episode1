import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ReactComponent as UpArrow } from "../assets/up-arrow-circle.svg";
import gsap from "gsap";

let tl = gsap.timeline();

const Header = ({ history, dimensions }) => {
  const [menuState, setMenuState] = useState({ menuOpened: false });

  useEffect(() => {
    history.listen(() => {
      setMenuState({ menuOpened: false });
    });

    if (menuState.menuOpened === true) {
      //Run open menu animation
      tl.to("nav", 0, {
        css: { display: "block" },
      })
        .to("body", 0, { css: { overflow: "hidden" } })
        .to(".App", 1, {
          y: dimensions.width <= 654 ? "70vh" : dimensions.height / 2,
          ease: "expo.inOut",
        })
        .to(".hamburger-menu span", 0.6, {
          delay: -1,
          scaleX: 0,
          transformOrigin: "50% 0%",
          ease: "expo.inOut",
        })
        .to("#Path_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 5,
          },
        })
        .to("#Path_2", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 20,
          },
        })
        .to("#Line_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 40,
            strokeDasharray: 18,
          },
        })
        .to("#circle", 0.6, {
          delay: -0.8,
          css: {
            strokeDashoffset: -193,
            strokeDasharray: 227,
          },
        })
        .to(".hamburger-menu-close", 0.6, {
          delay: -0.8,
          css: { display: "block" },
        });
    } else {
      //Run close menu animation
      tl.to(".App", 1, {
        y: 0,
        ease: "expo.inOut",
      })
        .to("#circle", 0.6, {
          delay: -0.6,
          css: {
            strokeDashoffset: 0,
          },
          ease: "expo.inOut",
        })
        .to("#Path_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 10,
          },
        })
        .to("#Path_2", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 10,
          },
        })
        .to("#Line_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 40,
            strokeDasharray: 40,
          },
        })
        .to(".hamburger-menu span", 0.6, {
          delay: -0.6,
          scaleX: 1,
          transformOrigin: "50% 0%",
          ease: "expo.inOut",
        })
        .to(".hamburger-menu-close", 0, {
          delay: -0.1,
          css: { display: "none" },
        })
        .to("body", 0, { css: { overflow: "auto" } })
        .to("nav", 0, {
          css: { display: "none" },
        });
    }
  }, [menuState.menuOpened]);
  return (
    <div className="header">
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <NavLink to="/" exact>
              AGENCY.
            </NavLink>
          </div>
          <div className="nav-toggle">
            <div
              onClick={() => setMenuState({ menuOpened: true })}
              className="hamburger-menu"
            >
              <span></span>
              <span></span>
            </div>
            <div
              onClick={() => setMenuState({ menuOpened: false })}
              className="hamburger-menu-close"
            >
              <UpArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
