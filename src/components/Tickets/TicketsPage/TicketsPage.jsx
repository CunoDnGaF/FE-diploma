import { useState, useEffect  } from 'react';
import TicketCard from './TicketCard/TicketCard';
import { useDispatch, useSelector } from 'react-redux'
import { routesGetOptions } from '../../../redux/slice/routesSlice';
import uuid from 'react-uuid';

function TicketsPage() {
  const [checkedPage, setCheckedPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [offset, setOffset] = useState(0);
  const [sorting, setSorting] = useState('date');
  const [moduleValue, setModuleValue] = useState('времени');
  const [moduleClassName, setModuleClassName] = useState('tickets-page-sorting-modal');

  const {items, totalCount} = useSelector(state => state.routes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(routesGetOptions({pageCount: pageCount, offset: offset, sorting: sorting}))
  }, [pageCount, sorting, offset])

  let pages = [];

  for (let i = 1; i < Math.ceil(totalCount/pageCount) + 1; i++) {
    pages.push(i);
  }

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  const onPageCountClick = (count) => {
    setPageCount(count);
    setPageCount(count);
    setOffset(0);
    setCheckedPage(0);
  };

  const onModuleClick = (value) => {
    setModuleValue(value);
    setModuleClassName('tickets-page-sorting-modal')
    setCheckedPage(0);

    if(value === 'времени') {
      setSorting('date');
    }
    if(value === 'длительности') {
      setSorting('duration');
    }
    if(value === 'стоимости') {
      setSorting('price_min');
    }
  };

  const onPageClick = (page) => {
    setCheckedPage(page);
    setOffset(((page + 1)*pageCount) - pageCount);
    scrollUp();
  };

  let pageBtnCLick = (direction) => {
    if(direction === 'prev' && checkedPage !== 0) {
      setOffset((checkedPage*pageCount) - pageCount);
      setCheckedPage(checkedPage - 1);
      scrollUp();
    }
    if(direction === 'next' && checkedPage !== pages.length - 1) {
      setOffset(((checkedPage + 2)*pageCount) - pageCount);
      setCheckedPage(checkedPage + 1);
      scrollUp();
    }
  }

  return (
    <div className='tickets-page'>
      <div className='tickets-page-header'>
        <span>найдено {totalCount}</span>
        <div className='tickets-page-sorting'>
          <span>сортировать по:
            <a className='tps-active' onClick={() => setModuleClassName('tickets-page-sorting-modal tpsm-active')}>{moduleValue}</a>
            <div className={moduleClassName}>
              <div onClick={() => onModuleClick('времени')}>времени</div>
              <div onClick={() => onModuleClick('стоимости')}>стоимости</div>
              <div onClick={() => onModuleClick('длительности')}>длительности</div>
            </div>
          </span>
          <span>показывать по: 
            <a className={pageCount === 5 ? 'tps-active' : ''} onClick={() => onPageCountClick(5)}>5</a>
            <a className={pageCount === 10 ? 'tps-active' : ''} onClick={() => onPageCountClick(10)}>10</a>
            <a className={pageCount === 20 ? 'tps-active' : ''} onClick={() => onPageCountClick(20)}>20</a>
          </span>
        </div>
      </div>
      <div className='tickets-list'>
         {items.map(ticket => <TicketCard key={uuid()} ticket={ticket}/>)}
      </div>
      <div className={totalCount < 6 ? 'tpf-off' : 'tickets-page-footer'}>
        <button onClick={() => pageBtnCLick('prev')}><img src='./src/svg/pageLeft.svg'></img></button>
        {pages.map((ticket) => {
          if(pages.indexOf(ticket) < 3) return <button key={pages.indexOf(ticket)} className={pages.indexOf(ticket) === checkedPage ? 'tpf-active' : ''} onClick={() => onPageClick(pages.indexOf(ticket))}>{pages.indexOf(ticket) + 1}</button> 
          if(pages.indexOf(ticket) === 3 && pages.indexOf(ticket) !== pages.length - 1) return <button key={pages.indexOf('unactive')} className={checkedPage > 2 && checkedPage < pages.length - 1 ? 'tpf-active' : 'tpf-unactive'}>{checkedPage > 2 && checkedPage < pages.length - 1 ? checkedPage + 1 : '...'}</button> 
          if(pages.indexOf(ticket) === pages.length - 1) return <button key={pages.indexOf(ticket)} className={pages.indexOf(ticket) === checkedPage ? 'tpf-active' : ''} onClick={() => onPageClick(pages.indexOf(ticket))}>{pages.indexOf(ticket) + 1}</button>
          }
        )}
        <button onClick={() => pageBtnCLick('next')}><img src='./src/svg/pageRight.svg'></img></button>
      </div>
    </div>
  )
}

export default TicketsPage;