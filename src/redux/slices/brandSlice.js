import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brand",
  initialState: { data: [], status: "idle", error: "" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      .addCase(addBrands.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addBrands.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      .addCase(updateBrands.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (brand) => brand.id === action.payload.id
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateBrands.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.data = state.data.filter((brand) => brand.id !== action.payload);
      })
      .addCase(deleteBrands.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      });
  },
});

export default brandSlice.reducer;

export const fetchBrands = createAsyncThunk("brand/fetchBrands", async () => {
  try {
    const res = await fetch("http://localhost:3000/brand");
    const data = await res.json();
    return data;
  } catch (error) {
    if (error.respose)
      // Loi 400/500
      return rejectWithValue(error.respose.data.message);
    else if (error.request)
      // k ket noi dc toi server
      return rejectWithValue("Loi ket noi sevrer");
    else rejectWithValue(error.message);
  }
});

export const addBrands = createAsyncThunk(
  "brand/addBrands",
  async (formData) => {
    const res = fetch("http://localhost:3000/brand", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = (await res).json();
    return data;
  }
);
export const updateBrands = createAsyncThunk(
  "brand/updateBrands",
  async ({ id, formData }) => {
    const res = await fetch(`http://localhost:3000/brand/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  }
);
export const deleteBrands = createAsyncThunk(
  "brand/deleteBrands",
  async (id) => {
    await fetch(`http://localhost:3000/brand/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);
