import React from 'react';
import Vehicle from '../src/component/Vehicle';
import Layout from '../src/Layout/Layout';
import { Routes, Route } from "react-router-dom"

import Issue from './component/Issue';
import ComponentRegistration from './component/ComponentRegistrtion';
import Payment from './component/Payment';
import ComponetDetailForm from "./component/Forms/ComponetDetailForm";
import VichecalDetailForm from "./component/Forms/VichecalDetailForm";
import IssueDetailForm from './component/Forms/IssueDetailForm';
import PaymentDetailForm from './component/Forms/PaymentDetailForm';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/vichecal" element={<Vehicle />} />
      <Route path="/issue-details" element={<Issue />} />
      <Route path="/component-details" element={<ComponentRegistration />} />
      <Route path="/payment" element={<Payment />} />
      {/* Forms */}
      <Route path="/component-details-form" element={<ComponetDetailForm />} />
      <Route path="/issue-details-form" element={<IssueDetailForm />} />
      <Route path="/vichel-form" element={<VichecalDetailForm />} />
      <Route path="/payment-form" element={<PaymentDetailForm />} />
    </Route>
  </Routes>
  );
}

export default App;

