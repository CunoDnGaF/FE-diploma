import LastTicketsCard from './LastTicketsCard/LastTicketsCard';
import { useDispatch, useSelector } from 'react-redux';
import {  useEffect  } from 'react';
import { lastTicketsLoading } from '../../../redux/slice/lastTicketsSlice';
import uuid from 'react-uuid';

function LastTickets() {

  const dispatch = useDispatch();
  const path = `routes/last`

  useEffect(() => {
    dispatch(lastTicketsLoading(path))
  }, [])

  const {items} = useSelector(state => state.lastTickets);
  
  return (
  <div className='last-tickets'>
    <h1 className='last-tickets-header'>ПОСЛЕДНИЕ БИЛЕТЫ</h1>
    {items.map(ticket => <LastTicketsCard  key={uuid()} ticket={ticket}/>)}
  </div>
  )
}

export default LastTickets;