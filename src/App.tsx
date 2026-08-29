import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Careers from './pages/Careers'
import ContactUs from './pages/ContactUs'
import GetQuote from './pages/GetQuote'
import RegionalReach from './pages/RegionalReach'
import WhyAstraNova from './pages/WhyAstraNova'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/get-a-quote" element={<GetQuote />} />
        <Route path="/regional-reach" element={<RegionalReach />} />
        <Route path="/why-astra-nova" element={<WhyAstraNova />} />
      </Route>
    </Routes>
  )
}
