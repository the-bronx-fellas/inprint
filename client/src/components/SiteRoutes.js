import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import View from './View'

const SiteRoutes = () => {

  return (
    <>
      <Routes>
        <Route path="/view" element={<View />} />
      </Routes>
    </>
  )
}

export default SiteRoutes;
