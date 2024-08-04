import { createBrowserRouter } from 'react-router-dom';
import Body from '../components/Body';
import Main from '../components/Main/Main';
import Tickets from '../components/Tickets/Tickets';
import TicketsPage from '../components/Tickets/TicketsPage/TicketsPage';
import ChoosingSeats from '../components/Tickets/ChoosingSeats/ChoosingSeats';
import Passengers from '../components/Passengers/Passengers';
import Payment from '../components/Payment/Payment';
import Check from '../components/Check/Check';
import Success from '../components/Success/Success';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: '/tickets',
        element: <Tickets />,
        children: [
          {
            index: true,
            element: <TicketsPage />
          },
          {
            path: '/tickets/choosing_seats',
            element: <ChoosingSeats />
          },
        ]
      },
      {
        path: '/passengers',
        element: <Passengers />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/check',
        element: <Check />,
      },
      {
        path: '/success',
        element: <Success />,
      },
    ]
  }
], 
{basename: '/FE-diploma'}
)