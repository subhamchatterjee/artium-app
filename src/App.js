import { Routes, Route } from "react-router-dom";

import Dashboard from './components/Dashboard';
import TitleDetails from './components/TitleDetails';

const App = () => {
  return (
    <div className="artium-app">
      <Routes>
        <Route path="/" element={<Dashboard defaultTitles={[]} />} />
        <Route path="/title/:id" element={<TitleDetails defaultTitleDetails={null} />} />
      </Routes>
    </div>
  );
}

export default App;
