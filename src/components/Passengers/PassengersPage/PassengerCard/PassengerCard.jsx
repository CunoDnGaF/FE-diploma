import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Dropdown from 'react-dropdown';
import { getPassengers, removePassenger } from '../../../../redux/slice/passengersSlice';
import {removeSeat} from '../../../../redux/slice/seatsSlice';

function PassengerCard({coach_id, isLastPassenger, passengerNumber, seatNumber, isChecked, direction}) {
  
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(isChecked);
  const [checkedAgeOption, setCheckedAgeOption] = useState('Взрослый');
  const [checkedDocumentsOption, setCheckedDocumentsOption] = useState('Паспорт РФ');
  const [checkedGender, setCheckedGender] = useState(true);
  const [isAdult, setIsAdult] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [birthday, setBirthday] = useState('');
  const [documentSeries, setDocumentSeries] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  
  let dateDevider = birthday[2];

  useEffect(() => {
    let documentData = '';
    if(checkedDocumentsOption === 'Паспорт РФ') {
      documentData = documentSeries + ' ' + documentNumber;
    } else {
      documentData = documentNumber;
    }

    dispatch(getPassengers({
        coach_id: coach_id,
        person_info: {
          is_adult: isAdult,
          first_name: firstName,
          last_name: lastName,
          patronymic: patronymic,
          gender: checkedGender,
          birthday: birthday.split(dateDevider).reverse().join('-'),
          document_type: checkedDocumentsOption,
          document_data: documentData,
        },
        seat_number: seatNumber,
        is_child: !isAdult,
        include_children_seat: true,
        direction: direction,
        passengerNumber: passengerNumber,
      }))
  }, [isAdult, firstName, lastName, patronymic, checkedGender, birthday, checkedDocumentsOption, documentSeries, documentNumber]);

  let AgeOptions = [
    'Взрослый', 'Детский'
  ];

  let DocumentsOptions = [
    'Паспорт РФ', 'Свидетельство о рождении'
  ];

  function chengeCheckbox() {
    setChecked(!checked);
  }

  function onAgeChange(e) {
    setCheckedAgeOption(e.value);
    if(e.value === 'Взрослый') {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  }

  function onDocumentChange(e) {
    setCheckedDocumentsOption(e.value);
  }

  function errorCheck() {
    if(checkedDocumentsOption === 'Паспорт РФ') {
      if(firstName === '' || lastName === '' || patronymic === '' || birthday === '' || documentSeries === '' || documentNumber === '') {
        setFormError('Пожалуйста, заполните все поля')
        setIsSuccess(false);
      } else if(!/^\d{2}-\d{2}-\d{4}$/.test(birthday)) {
        setFormError('Напишите дату в формате ДД-ММ-ГГГГ Пример: 21-08-1998');
        setIsSuccess(false);
      } else if(!/^\d+$/.test(documentSeries) || documentSeries.length != 4) {
        setFormError('Указана некорректная серия паспорта Пример: 1234');
        setIsSuccess(false);
      } else if(!/^\d+$/.test(documentNumber) || documentNumber.length != 6) {
        setFormError('Указан некорректный номер паспорта Пример: 123456');
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        // setTimeout(() => isCheckedHandle(passengerNumber+1), 1000);
      }
    }
    if(checkedDocumentsOption === 'Свидетельство о рождении') {
      if(firstName === '' || lastName === '' || patronymic === '' || birthday === '' || documentNumber === '') {
        setFormError('Пожалуйста, заполните все поля')
      } else if(!/^\d{2}-\d{2}-\d{4}$/.test(birthday)) {
        setFormError('Напишите дату в формате ДД-ММ-ГГГГ Пример: 21-08-1998');
        setIsSuccess(false);
      } else if(!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}$/.test(documentNumber)) {
        setFormError('Указан некорректный номер свидетельства о рождении Пример: VII-ЫП-123456');
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        // isCheckedHandle(passengerNumber+1);
      }
    } 
  }

  function onPassengerCardButtonClick() {
    errorCheck();
  }

  useEffect(() => {
    if(checkedDocumentsOption === 'Паспорт РФ') {
      if(firstName !== '' && lastName !== '' && patronymic !== '' && birthday !== '' && documentSeries !== '' && documentNumber !== '') {
        setFormError(null);
      }
    }
    if(checkedDocumentsOption === 'Свидетельство о рождении') {
      if(firstName !== '' && lastName !== '' && patronymic !== '' && birthday !== '' && documentNumber !== '') {
        setFormError(null);
      }
    }
    if(isSuccess === true) {
      setIsSuccess(false);
      // errorCheck();
    }
  }, [firstName, lastName, patronymic, birthday, documentSeries, documentNumber, checkedDocumentsOption]);

  // useEffect(() => {
  //   setChecked(isChecked);
  // }, [isChecked]);

  function removeClick() {
    dispatch(removeSeat({
      coach_id: coach_id,
      seatNumber: seatNumber,
      isAdult: isAdult,
    }));
    dispatch(removePassenger({
      coach_id: coach_id,
      seatNumber: seatNumber,
      direction: direction,
    }))
  }

  return (
    <div className='passenger-card'>
      <div className='passenger-card-header'>
        <label className="passenger-card-toggle">
          <input checked={checked} onChange={() => chengeCheckbox()} type="checkbox"></input>
          <span></span>
        </label>
        <h2>Пассажир {passengerNumber}</h2>
        <button onClick={() => removeClick()}></button>
      </div>
      <div className={checked ? 'passenger-card-body pcb_active' : 'passenger-card-body'}>
        <div className='passenger-card-forms'>
          <Dropdown arrowClassName='passenger-card-age-arrow' menuClassName='passenger-card-age-list' controlClassName='passenger-card-age' options={AgeOptions[0] == checkedAgeOption ? AgeOptions : AgeOptions.reverse()} value={checkedAgeOption} onChange={onAgeChange}/>
          <div className='passenger-card-name-forms'>
            <form>
              <label>Фамилия</label>
              <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}></input>
            </form>
            <form>
              <label>Имя</label>
              <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName}></input>
            </form>
            <form>
              <label>Отчество</label>
              <input type="text" onChange={(e) => setPatronymic(e.target.value)} value={patronymic}></input>
            </form>
          </div>
          <div className='passenger-card-details-forms'>
            <form>
              <label>Пол</label>
              <div className='passenger-card-gender-form'>
                <div onClick={() => setCheckedGender(true)} className={checkedGender? 'pcgf_active' : ''}>М</div>
                <div onClick={() => setCheckedGender(false)} className={!checkedGender? 'pcgf_active' : ''}>Ж</div>
              </div>
            </form>
            <form>
              <label>Дата рождения</label>
              <input type="text" onChange={(e) => setBirthday(e.target.value)} value={birthday} placeholder='ДД/ММ/ГГ'></input>
            </form>
          </div>
          <label className="passenger-card-forms-chekbox">
            <input type="checkbox"></input>
            <span>ограниченная подвижность</span>
          </label>
        </div>
        {
          checkedDocumentsOption === 'Паспорт РФ'
          ? <div className="passenger-card-documents">
              <form>
                <label>Тип документа</label>
                <Dropdown arrowClassName='passenger-card-age-arrow' menuClassName='passenger-card-documents-list' controlClassName='passenger-card-documents-type' options={DocumentsOptions[0] == checkedDocumentsOption ? DocumentsOptions : DocumentsOptions.reverse()} value={checkedDocumentsOption} onChange={onDocumentChange}/>
              </form>
              <form>
                <label>Серия</label>
                <input type="text" placeholder='_ _ _ _' onChange={(e) => setDocumentSeries(e.target.value)} value={documentSeries}></input>
              </form>
              <form>
                <label>Номер</label>
                <input type="text" placeholder='_ _ _ _ _ _' onChange={(e) => setDocumentNumber(e.target.value)} value={documentNumber}></input>
              </form>
            </div>
          : <div className="passenger-card-documents">
              <form>
                <label>Тип документа</label>
                <Dropdown arrowClassName='passenger-card-age-arrow' menuClassName='passenger-card-documents-list pcdl_certificate' controlClassName='passenger-card-documents-type pcdt_certificate' options={DocumentsOptions[0] == checkedDocumentsOption ? DocumentsOptions : DocumentsOptions.reverse()} value={checkedDocumentsOption} onChange={onDocumentChange}/>
              </form>
              <form>
                <label>Номер</label>
                <input className='pcd_certificate' type="text" placeholder='12 символов' onChange={(e) => setDocumentNumber(e.target.value)} value={documentNumber}></input>
              </form>
            </div>
        }
        <div className={isSuccess ? 'passenger-card-footer pcf-success' : formError ? 'passenger-card-footer pcf-error' : 'passenger-card-footer'}>
          {formError 
          ? <div className='passenger-card-footer-message'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z" fill="white" fillOpacity="0.81"/>
              </svg>
              <span>{formError}</span>
            </div>
          : isSuccess
          ? <div className='passenger-card-footer-message pcf-success'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM10.2168 15.8293L10.207 15.8401C9.93262 16.1293 9.93262 16.6112 10.1973 16.9111C10.8311 17.5991 11.4551 18.2819 12.0703 18.9553C12.6914 19.6343 13.3037 20.3038 13.9092 20.9598C13.958 21.0134 14.0361 21.0134 14.085 20.9598L22.8018 11.4272C23.0664 11.1381 23.0664 10.6667 22.8018 10.3776L22.665 10.2169C22.4004 9.92773 21.959 9.92773 21.6953 10.2169L13.9189 18.7213C13.8799 18.7642 13.8311 18.7642 13.791 18.7213C12.9297 17.7681 12.0479 16.7933 11.1768 15.8401C10.9121 15.5509 10.4814 15.5509 10.2168 15.8293Z" fill="#F9FEF7"/>
              </svg>
              <span>Готово</span>
            </div>
          : <></>
          }
          {formError ? <></> : <div className='passenger-card-footer-button' onClick={() => onPassengerCardButtonClick()}>{isLastPassenger ? 'Проверить заполнение' : 'Следующий пассажир'}</div>}
        </div>
      </div>
    </div>
  )
}

export default PassengerCard;