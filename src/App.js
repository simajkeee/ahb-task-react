import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadForm from "./components/UploadForm";
import CSVTable from "./components/CSVTable";

import { CsvProvider } from "./components/providers/CSVContextProvider";

const Form = () => <UploadForm />;
const Table = () => <CSVTable />;

function App() {
  return (
    <BrowserRouter>
      <CsvProvider>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </CsvProvider>
    </BrowserRouter>
  );
}

export default App;
