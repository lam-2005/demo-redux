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

  // thêm
  const [formData, setFormData] = useState({
    name: "",
  });

  // sửa
  const [formUpdateData, setFormUpdateData] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(null);

  // Chỗ nhập vào input
  const handleAddInput = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  // fetch api
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  // Xử lí thêm
  const handleAddData = () => {
    dispatch(addBrands(formData));
    setFormData({ ...formData, name: "" });
  };

  // Chỗ nhập vào input sửa
  const handleUpdateChange = (e) => {
    setFormUpdateData({
      ...formUpdateData,
      name: e.target.value,
    });
  };

  //xử lí sửa
  const handleUpdate = (id) => {
    dispatch(updateBrands({ id: id, formData: formUpdateData }));
  };

  //xử lí xóa
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
        {brandsStatusApi === "error" && console.log("co loi")}
      </ul>
    </>
  );
}

export default App;
