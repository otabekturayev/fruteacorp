import { StrictMode } from 'react';
import ReactDOM from 'react-dom'; // Bu yerda `ReactDOM.createRoot` emas, to'g'ri ishlatishingiz kerak
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query";
import router from './routes/AppRoutes.jsx';
import { RouterProvider } from 'react-router-dom';
import "./i18next.jsx"
const queryClient = new QueryClient();
// React 17 uchun to'g'ri ishlatish
ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>,  
  </StrictMode>,
  document.getElementById('root') 
);
