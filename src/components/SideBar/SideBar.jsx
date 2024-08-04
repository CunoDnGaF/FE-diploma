import SideMenu from './SideMenu/SideMenu';
import SideInfo from './SideInfo/SideInfo';
import LastTickets from './LastTickets/LastTickets';

function SideBar({step, handles}) {

  if(step.startsWith('/tickets')) {
    return (
      <div className='sidebar'>
        <SideMenu handles={handles}/>
        <LastTickets />
      </div>
    )
  }

  return (
    <div className='sidebar'>
      <SideInfo />
    </div>
  )
}

export default SideBar;