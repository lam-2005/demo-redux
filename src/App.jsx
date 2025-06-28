import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrands,
  deleteBrands,
  fetchBrands,
  updateBrands,
} from "./redux/slices/brandSlice";
import {
  brandDataSelector,
  brandErrorSelector,
  brandStatusSelector,
} from "./redux/selectors/selectorBrand";

function App() {
  const dispatch = useDispatch();
  const brandData = useSelector(brandDataSelector);
  const brandsStatusApi = useSelector(brandStatusSelector);
  const brandErrorApi = useSelector(brandErrorSelector);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formUpdateData, setFormUpdateData] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(null);
  const handleAddInput = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);
  const handleAddData = () => {
    dispatch(addBrands(formData));
    setFormData({ ...formData, name: "" });
  };
  const handleUpdateChange = (e) => {
    setFormUpdateData({
      ...formUpdateData,
      name: e.target.value,
    });
  };
  const handleUpdate = (id) => {
    dispatch(updateBrands({ id: id, formData: formUpdateData }));
  };
  const hanldeDelete = (id) => {
    dispatch(deleteBrands(id));
  };
  return (
    <>
      <div>Brand</div>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Thêm"
          value={formData.name}
          onChange={handleAddInput}
        />
        <button onClick={handleAddData}>Thêm</button>
      </div>
      <ul>
        {brandsStatusApi === "loading" && <p>Loading..</p>}
        {brandsStatusApi === "success" &&
          brandData.map((brand) => {
            return isEdit === brand.id ? (
              <>
                <input
                  type="text"
                  name=""
                  id=""
                  value={formUpdateData.name}
                  onChange={handleUpdateChange}
                />
                <button
                  onClick={() => {
                    handleUpdate(brand.id);
                    setIsEdit(null);
                  }}
                >
                  Luu
                </button>
              </>
            ) : (
              <li key={brand.id}>
                {brand.name}{" "}
                <button
                  onClick={() => {
                    setIsEdit(brand.id);
                    setFormUpdateData({ ...formUpdateData, name: brand.name });
                  }}
                >
                  Sửa
                </button>{" "}
                <button onClick={() => hanldeDelete(brand.id)}>Xóa</button>
              </li>
            );
          })}
        {brandErrorApi === "error" && console.log("co loi")}
      </ul>
    </>
  );
}

export default App;
