function Steps({step}) {

  return (
    <div className="steps">
      <div className={step.startsWith('/tickets') || step == '/passengers' || step == '/payment' || step == '/check' ? 'step active_step' : 'step'}>
        <div className='step-count'>1</div>
        <span>Билеты</span>
        <span className={step.startsWith('/tickets') || step == '/passengers' || step == '/payment' || step == '/check' ? 'step-border active_step-border' : 'step-border'}></span>
      </div>
      <div className={step == '/passengers' || step == '/payment' || step == '/check' ? 'step active_step' : 'step'}>
        <div className='step-count'>2</div>
        <span>Пассажиры</span>
        <span className={step == '/passengers' || step == '/payment' || step == '/check' ? 'step-border active_step-border' : 'step-border'}></span>
      </div>
      <div className={step == '/payment' || step == '/check' ? 'step active_step' : 'step'}>
        <div className='step-count'>3</div>
        <span>Оплата</span>
        <span className={step == '/payment' || step == '/check' ? 'step-border active_step-border' : 'step-border'}></span>
      </div>
      <div className={step == '/check' ? 'step active_step' : 'step'}>
        <div className='step-count'>4</div>
        <span>Проверка</span>
      </div>
    </div>
  )
}

export default Steps;