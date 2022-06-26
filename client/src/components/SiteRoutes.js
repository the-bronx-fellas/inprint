import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import View from './View'
import Welcome from './Welcome'

const SiteRoutes = () => {

  return (
    <>
      <Routes>
        <Route path="/view" element={<View />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </>
  )
}

export default SiteRoutes;
