import Footer from "./Footer/Footer"
import Header from "./Header/Header"

const Layout = (props) => {
    return (
      <div>
        <main>{props.children}</main>
        <Header />
        <Footer />
      </div>
    );
  };


export default Layout
