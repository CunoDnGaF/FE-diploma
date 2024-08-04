import About from './About/About';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';

function Main() {
  return (
    <div className='main-page'>
      <About />
      <HowItWorks />
      <Reviews />
    </div>
  )
}

export default Main;