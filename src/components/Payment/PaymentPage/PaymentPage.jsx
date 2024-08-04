import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUser } from '../../../redux/slice/passengersSlice';

function PaymentPage() {
  const {userState} = useSelector(state => state.passengers);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(userState.first_name);
  const [lastName, setLastName] = useState(userState.last_name);
  const [patronymic, setPatronymic] = useState(userState.patronymic);
  const [phoneNumber, setPhoneNumber] = useState(userState.phone);
  const [email, setEmail] = useState(userState.email);
  const [checkedPaymentType, setCheckedPaymentType] = useState(userState.payment_method);
  const [errorForms, setErrorForms] = useState('');
  const [errorPayment, setErrorPayment] = useState('');

  function errorCheck() {
    if(firstName === '' || lastName === '' || patronymic === '' || phoneNumber === '' || email === '') {
      setErrorForms('Заполните все поля');
      return false;
    } else if(!/^((\+7|7|8)+([0-9]){10})$/.test(phoneNumber)) {
      setErrorForms('Указан некорректный номер телефона Пример: +79111234567');
      return false;
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email)) {
      setErrorForms('Указан некорректный Email Пример: inbox@gmail.ru');
      return false;
    }
    if(checkedPaymentType === '') {
      setErrorPayment('Выберите тип оплаты');
      return false;
    }
    return true;
  }

  useEffect(() => {
    if(firstName !== '' && lastName !== '' && patronymic !== '' && phoneNumber !== '' && email !== '') {
      setErrorForms('');
    }
    if(checkedPaymentType !== '') {
      setErrorPayment('');
    }
  }, [firstName, lastName, patronymic, phoneNumber, email, checkedPaymentType]);

  function onPaymentButtonClick() {
    if(errorCheck()) {
      navigate('/check');
      dispatch(getUser({
        first_name: firstName,
        last_name: lastName,
        patronymic: patronymic,
        phone: phoneNumber,
        email: email,
        payment_method: checkedPaymentType,
      }))
    }
  }

  return (
      <div className='payment-page'>
        <div className='payment-card'>
          <div className='payment-header'>Персональные данные</div>
          <div className='payment-body'>
            <div className='payment-forms-name'>
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
            <div className='payment-forms-contact'>
              <form>
                  <label>Контактный телефон</label>
                  <input type="text" placeholder='+7 ___ ___ __ __' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}></input>
                </form>
              <form>
                <label>E-mail</label>
                <input type="text" placeholder='inbox@gmail.ru' onChange={(e) => setEmail(e.target.value)} value={email}></input>
              </form>
            </div>
          </div>
          <div className={errorForms == '' ? 'payment-error' : 'payment-error pe-active'}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z" fill="white" fillOpacity="0.81"/>
            </svg>
            <p>{errorForms}</p>
          </div>
          <div className='payment-header'>Способ оплаты</div>
          <div className='payment-payment-type'>
            <div className='payment-payment-type-body'>
              <label className="payment-forms-chekbox">
                <input type="checkbox" checked={checkedPaymentType === 'online'} onClick={() =>checkedPaymentType === 'online' ? setCheckedPaymentType('') : setCheckedPaymentType('online')}></input>
                <span>Онлайн</span>
              </label>
              <div className='payment-payment-types'>
                <div>Банковской <br></br> картой</div>
                <div>PayPal</div>
                <div>Visa QIWI Wallet</div>
              </div>
            </div>
            <div className='payment-payment-type-body'>
              <label className="payment-forms-chekbox">
                <input type="checkbox" checked={checkedPaymentType === 'cash'} onClick={() =>checkedPaymentType === 'cash' ? setCheckedPaymentType('') : setCheckedPaymentType('cash')}></input>
                <span>Наличными</span>
              </label>
            </div>
            <div className={errorPayment == '' ? 'payment-error' : 'payment-error pe-active'}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z" fill="white" fillOpacity="0.81"/>
            </svg>
            <p>{errorPayment}</p>
          </div>
          </div>
        </div>
        <div className='payment-page-button' onClick={() => onPaymentButtonClick()}>КУПИТЬ БИЛЕТЫ</div>
      </div>
  )
}

export default PaymentPage;