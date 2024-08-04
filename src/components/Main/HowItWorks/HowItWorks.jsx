function HowItWorks() {
  return (
    <div className='howItWorks' id='howItWorks'>
      <img src="./src/img/howItWorks.png" className="howItWorks_img" alt=""></img>
      <div className='howItWorks-container'>
        <div className='howItWorks-header'>
          <h2>КАК ЭТО РАБОТАЕТ</h2>
          <button className='howItWorks-btn'>Узнать больше</button>
        </div>
        <ul>
            <li>
              <img src='./src/svg/pc.svg'></img>
              <span>Удобный заказ на сайте</span>
            </li>
            <li>
              <img src='./src/svg/office.svg'></img>
              <span>Нет необходимости ехать в офис</span>
            </li>
            <li>
              <img src='./src/svg/world.svg'></img>
              <span>Огромный выбор направлений</span>
            </li>
          </ul>
      </div>
    </div>
  )
}

export default HowItWorks;