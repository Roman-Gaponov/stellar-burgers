import { Routes, Route } from 'react-router-dom';
import {
  ConstructorPage,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, FeedInfo, IngredientDetails, Modal } from '@components';
import { OrderInfo } from '../order-info/order-info';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<FeedInfo />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={() => { }}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={() => { }}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='' onClose={() => { }}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
