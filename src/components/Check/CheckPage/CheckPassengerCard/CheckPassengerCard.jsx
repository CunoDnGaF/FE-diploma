function CheckPassengerCard({person}) {

  console.log(person);

  if(person.first_name === '') {
    return (<></>);
  }
  
  return (
    <div className='check-passanger-card'>
      <div className='check-passanger-card-header'>
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 0C15.2492 0 0 15.2492 0 34C0 52.7508 15.2492 68 34 68C52.7508 68 68 52.7508 68 34C68 15.2492 52.7508 0 34 0ZM33.887 16.3787C38.8571 16.3787 42.9236 20.3322 42.9236 25.3023C42.9236 30.2724 38.9701 34.3389 34 34.3389C29.0299 34.3389 24.9635 30.2724 24.9635 25.3023C25.0764 20.4452 29.0299 16.3787 33.887 16.3787ZM51.9601 52.186C39.8738 52.186 28.1262 52.186 16.2658 52.186C15.701 46.5382 15.701 44.392 21.3488 41.6811C29.7076 37.7276 38.2924 37.7276 46.7641 41.6811C47.8937 42.1329 48.9103 42.9236 49.8139 43.6013C51.2824 44.8439 52.0731 46.4252 51.9601 48.3455C51.9601 49.701 51.9601 50.8306 51.9601 52.186Z" fill="#FFA800"/>
        </svg>
        <span>{person.is_adult ? 'Взрослый' : 'Детский'}</span>
      </div>
      <div className='check-passanger-card-body'>
        <span>{`${person.last_name} ${person.first_name} ${person.patronymic}`}</span>
        <p>Пол {person.gender ? 'мужской' : 'женский'}</p>
        <p>Дата рождения {person.birthday.split('-').reverse().join('.')}</p>
        <p>{person.document_type} {person.document_data}</p>
      </div>
    </div>
  )
}

export default CheckPassengerCard;