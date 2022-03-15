import NavBar from "./nav"
import Footer from "./footer"
import React from "react"

function Layout({ children }:{children:JSX.Element}){
  
    return (
        <div className="flex flex-col h-screen justify-between">
            <NavBar/>
                <main> {children} </main>
            <Footer/>
        </div>
    )
}

export default Layout


