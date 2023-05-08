import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CsvContext } from "./providers/CSVContextProvider";

function UploadForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const { updateParsedRows } = useContext(CsvContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Add file to upload");
      return;
    }

    const getBatch = async function (page) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("page", page);

      const response = await fetch(
        `https://arcane-escarpment-76931.herokuapp.com/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      return response.json();
    };

    let page = 1;
    let endFile = false;
    let rows = [];
    while (!endFile) {
      try {
        let res = await getBatch(page);
        endFile = res.endFile;
        page++;
        rows = rows.concat(res.rows);
        // console.log(rows);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    updateParsedRows(rows);
    navigate("/table");
  };

  return (
    <div className='formWrapper'>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default UploadForm;
