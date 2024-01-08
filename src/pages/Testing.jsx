import React, { useState } from "react";

const Testing = () => {
  const [fileInputValue, setFileInputValue] = useState("");

  const cImage = () => {
    // Your cImage function logic here
    console.log("cImage function called");
  };

  const removeFileInput = () => {
    setFileInputValue("");
  };

  return (
    <div>
      <input
        type="file"
        className="form-control"
        required
        id="file"
        onChange={(e) => {
          setFileInputValue(e.target.value);
          cImage();
        }}
        value={fileInputValue}
      />
      <button onClick={removeFileInput}>Remove</button>
    </div>
  );
};

export default Testing;
