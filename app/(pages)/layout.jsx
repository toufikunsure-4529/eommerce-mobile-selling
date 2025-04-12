
import Header from '../components/header/Header'
import Footer from '../components/Footer'

function layout({ children }) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default layout