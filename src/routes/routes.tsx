import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./../pages/Dashbord";
import List from "./../pages/List";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list/:type" element={<List />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
