const brandDataSelector = (state) => state.brandCrud.data;
const brandStatusSelector = (state) => state.brandCrud.status;
const brandErrorSelector = (state) => state.brandCrud.error;
export { brandErrorSelector, brandDataSelector, brandStatusSelector };
