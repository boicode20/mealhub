import React from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = ({children}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); 
      }, [pathname]);
    
      return <>{children}</>
}

export default ScrollTop
