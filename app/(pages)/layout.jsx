
import Header from '../components/Header'
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