import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CsvContext } from "./providers/CSVContextProvider";

function UploadForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        `https://radiant-reaches-85216.herokuapp.com/upload`,
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
    try {
      setIsLoading(true);
      while (!endFile) {
        let res = await getBatch(page);
        endFile = res.endFile;
        page++;
        rows = rows.concat(res.rows);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
    updateParsedRows(rows);
    navigate("/table");
  };

  return isLoading ? (
    <h1 className='message-wrapper'>Loading table...</h1>
  ) : (
    <div className='formWrapper'>
      <h1>CVS file parsing form</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default UploadForm;
