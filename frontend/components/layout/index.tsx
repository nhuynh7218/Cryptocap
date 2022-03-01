import NavBar from "./nav"
import Footer from "./footer"
function Layout({ children }:{children:JSX.Element}){
    return (
        <div>
            <NavBar/>
            <main> {children} </main>
            <Footer/>
        </div>
    )
}

export default Layout