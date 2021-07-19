import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import gsap from "gsap";
import "./styles/App.scss";
import Header from "./components/header";

//pages
import Home from "./pages/home";
import CaseStudies from "./pages/caseStudies";
import Approach from "./pages/approach";
import About from "./pages/about";
import Services from "./pages/services";
import Navigation from "./components/navigation";

//routes
const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/case-studies", name: "Case Studies", Component: CaseStudies },
  { path: "/approach", name: "Approach", Component: Approach },
  { path: "/services", name: "Services", Component: Services },
  { path: "/about-us", name: "About Us", Component: About },
];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App  () {
  //empêche les flash lors des fast reload
  gsap.to("body", 0, { css: { visibility: "visible" } });
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    // Calcul de la taille des écrans mobiles (sans barres d'outils)
    let vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    //Permet de mettre à jour la taille de l'écran dès qu'elle change.

    const debounceHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debounceHandleResize);

    return () => {
      window.removeEventListener("resize", debounceHandleResize);
    };
  });
  return (
    <>
      <Header dimensions={dimensions} />
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={"path"} exact path={path}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  );
};

export default App;
