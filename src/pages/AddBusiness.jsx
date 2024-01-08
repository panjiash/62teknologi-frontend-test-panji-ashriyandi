import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBusiness = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [fileInputValue, setFileInputValue] = useState("");
  const [isClosed, setIsClosed] = useState(0);
  const [url, setUrl] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [categories, setCategories] = useState([{ alias: "", title: "" }]);
  const [rating, setRating] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [price, setPrice] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [distance, setDistance] = useState(0);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const cName = (e) => {
    setName(e.target.value);
  };

  const cImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
    setFileInputValue(e.target.value);
  };

  const hImage = (e) => {
    setFile("");
    setPreview("");
    setFileInputValue("");
  };

  const handleAddCategory = () => {
    setCategories([...categories, { alias: "", title: "" }]);
  };
  const handleChangeCategory = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...categories];
    onChangeValue[index][name] = value;
    setCategories(onChangeValue);
  };
  const handleDeleteCategory = (index) => {
    const newArray = [...categories];
    newArray.splice(index, 1);
    setCategories(newArray);
  };

  const handleCheckboxChange = (value) => {
    const updatedCheckboxes = [...transactions];
    if (updatedCheckboxes.includes(value)) {
      updatedCheckboxes.splice(updatedCheckboxes.indexOf(value), 1);
    } else {
      updatedCheckboxes.push(value);
    }
    setTransactions(updatedCheckboxes);
  };

  const save = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("is_closed", isClosed);
    formData.append("url", url);
    formData.append("review_count", reviewCount);
    formData.append("categories", JSON.stringify(categories));
    formData.append("rating", rating);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("transactions", JSON.stringify(transactions));
    formData.append("price", price);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("address3", address3);
    formData.append("city", city);
    formData.append("zip_code", zipCode);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("phone", phone);
    formData.append("display_phone", displayPhone);
    formData.append("distance", distance);
    formData.append("file", file);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/business",
      formData
    );
    if (response?.data?.status === 1) {
      navigate("/");
    } else {
      setMsg(response?.data?.msg);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4 justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <h4 className="card-title col-lg-12">Add Business</h4>
                </div>
              </div>
              <div className="card-body">
                {msg && (
                  <div className="row mb-3">
                    <div className="col-12 text-center text-danger">{msg}</div>
                  </div>
                )}
                <form onSubmit={save} encType="multipart/form-data">
                  <div className="form-group row mb-3">
                    <label className="col-lg-2 col-form-label">Image</label>
                    <div className="col-lg-10 d-grid" id="filess">
                      <input
                        type="file"
                        className="form-control"
                        required
                        id="file"
                        onChange={cImage}
                        value={fileInputValue}
                      />
                    </div>
                  </div>
                  {preview && (
                    <div className="row mb-3">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-2">
                        <img src={preview} className="w-100" alt="" />
                      </div>
                      <div className="col-lg-1">
                        <button
                          onClick={hImage}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="form-group row mb-3">
                    <label className="col-lg-2 col-form-label">Name</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={cName}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-lg-2 col-form-label">Is Closed</label>
                    <div className="col-lg-10">
                      <select
                        name="isClosed"
                        id="isClosed"
                        className="form-select"
                        defaultValue={isClosed}
                        onChange={(e) => setIsClosed(e.target.value)}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="" className="col-lg-2 col-form-label">
                      URL
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-lg-2 col-form-label">
                      Review Count
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setReviewCount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-lg-2 col-form-label">
                      Categories
                    </label>
                    <div className="col-lg-10">
                      <table className="w-100">
                        <tbody>
                          {categories.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  name="alias"
                                  type="text"
                                  className="form-control"
                                  value={item.alias}
                                  onChange={(e) =>
                                    handleChangeCategory(e, index)
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  name="title"
                                  type="text"
                                  className="form-control"
                                  value={item.title}
                                  onChange={(e) =>
                                    handleChangeCategory(e, index)
                                  }
                                />
                              </td>

                              {categories.length > 1 && (
                                <td>
                                  <button
                                    className="btn btn-sm btn-danger me-2"
                                    onClick={() => handleDeleteCategory(index)}
                                  >
                                    -
                                  </button>
                                </td>
                              )}
                              {index === categories.length - 1 && (
                                <td>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleAddCategory()}
                                  >
                                    +
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="" className="col-lg-2 col-form-label">
                      Rating
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="" className="col-lg-2 col-form-label">
                      Latitude
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="" className="col-lg-2 col-form-label">
                      Longitude
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="" className="col-lg-2 col-form-label">
                      Transactions
                    </label>
                    <div className="col-lg-10">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                value="delivery"
                                onChange={() =>
                                  handleCheckboxChange("delivery")
                                }
                              />
                            </td>
                            <td>Delivery</td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                value="restaurant_reservation"
                                onChange={() =>
                                  handleCheckboxChange("restaurant_reservation")
                                }
                              />
                            </td>
                            <td>Restaurant Reservation</td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                value="pickup"
                                onChange={() => handleCheckboxChange("pickup")}
                              />
                            </td>
                            <td>Pickup</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Price</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Address1</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Address2</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Address3</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress3(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">City</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Zip Code</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Country</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">State</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Phone</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">
                      Display Phone
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setDisplayPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-2 col-form-label">Distance</label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setDistance(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBusiness;
