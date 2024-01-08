import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const cSearch = (e) => {
    setSearch(e.target.value);
  };

  const cLimit = (e) => {
    setLimit(e.target.value);
    setPage(0);
  };

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:5000/business?search=${search}&page=${page}&limit=${limit}`
    );
    if (response?.data?.businesses) {
      setDatas(response?.data?.businesses);
      setPage(response?.data?.page);
      setLimit(response?.data?.limit);
      setTotalPage(response?.data?.totalPage);
      setTotalRows(response?.data?.totalRows);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const del = async (id) => {
    const ask = window.confirm("Are you sure");
    if (ask) {
      const response = await axios.delete(
        `http://localhost:5000/business/${id}`
      );
      if (response?.data?.status === 1) {
        getData();
      }
    }
  };

  useEffect(() => {
    getData();
  }, [search, page, limit]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <h4 className="d-inline-block col-lg-6">Business Data</h4>
                  <div className="col-lg-6 text-end">
                    <Link to={"/add"} className="btn btn-primary">
                      Add
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-1">
                    <select
                      onChange={cLimit}
                      defaultValue={limit}
                      className="form-select"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="75">75</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div className="col-lg-5"></div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      onChange={cSearch}
                      placeholder="Search: Name, Cartegory, Latitude, Longitude, City"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <div className="content table-responsive">
                      <table className="table table-sm w-100 table-striped table-bordered">
                        <thead className="table-dark">
                          <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Closed</th>
                            <th>Url</th>
                            <th>Review Count</th>
                            <th>Categories</th>
                            <th>Rating</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Transactions</th>
                            <th>Price</th>
                            <th>Display Address</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th>State</th>
                            <th>Display Phone</th>
                            <th>Distance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!datas.length && (
                            <tr>
                              <td colSpan={30}>No data</td>
                            </tr>
                          )}
                          {datas.map((data, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  style={{ width: "200px" }}
                                  src={`${data.image_url}`}
                                  alt={`${data.name}`}
                                />
                              </td>
                              <td>{data.name}</td>
                              <td>{data.is_closed ? "Yes" : "No"}</td>
                              <td>{data.url}</td>
                              <td>{data.review_count}</td>
                              <td>
                                {data.categories
                                  .map((obj) => obj.title)
                                  .join(",")}
                              </td>
                              <td>{data.rating}</td>
                              <td>{data.coordinates.latitude}</td>
                              <td>{data.coordinates.longitude}</td>
                              <td>
                                {data.transactions.map((obj) => obj).join(",")}
                              </td>
                              <td>{data.price}</td>
                              <td>{data.location.display_address}</td>
                              <td>{data.location.country}</td>
                              <td>{data.location.zip_code}</td>
                              <td>{data.location.state}</td>
                              <td>{data.display_phone}</td>
                              <td>{data.distance}</td>
                              <td>
                                <Link
                                  className="btn btn-success btn-sm"
                                  to={`/edit/${data.id}`}
                                >
                                  Edit
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => del(data.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <label className="col-form-label col-lg-6">
                    Total Data: <strong>{totalRows}</strong>
                  </label>
                  <div className="col-lg-6 text-end">
                    <ReactPaginate
                      previousLabel={"< Prev"}
                      nextLabel={"Next >"}
                      pageCount={totalPage}
                      onPageChange={changePage}
                      containerClassName={"pagination justify-content-end"}
                      pageLinkClassName={"page-item page-link"}
                      previousLinkClassName={"page-item page-link"}
                      nextLinkClassName={"page-item page-link"}
                      activeLinkClassName={"active"}
                      disabledLinkClassName={"disabled"}
                      breakLabel={"..."}
                      pageRangeDisplayed={3}
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
