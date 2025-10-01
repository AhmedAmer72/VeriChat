
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Protocol from './pages/Protocol';
import Playground from './pages/Playground';
import Admin from './pages/Admin';
import Docs from './pages/Docs';
import Layout from './components/composite/Layout';
import { Toaster } from './components/ui/Toast';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Layout>
      <Toaster />
    </HashRouter>
  );
};

export default App;
