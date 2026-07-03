import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import Concept from './components/Concept.jsx'
import Programs from './components/Programs.jsx'
import ExperienceToObject from './components/ExperienceToObject.jsx'
import Shop from './components/Shop.jsx'
import PrivateSessions from './components/PrivateSessions.jsx'
import ReservationForm from './components/ReservationForm.jsx'
import Visit from './components/Visit.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Concept />
        <Programs />
        <ExperienceToObject />
        <Shop />
        <PrivateSessions />
        <ReservationForm />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
