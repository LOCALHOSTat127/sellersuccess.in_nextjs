import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen : false,
  isCallBackDiloagBoxOpen : false,
  isShareDiloagOpen : false,
  isBlogSearchResultsShown : false,
  isSearchBlogsResults : null
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    
    setCallBackDiloagBox : (state,action) => {
      state.isCallBackDiloagBoxOpen = action.payload
    },
    setShareDiloag : (state,action) =>{
      state.isShareDiloagOpen = action.payload;
    },
    setBlogsSearchResultsShow : (state,action) => {
      state.isBlogSearchResultsShown = action.payload;
    },
    setBlogResults : (state,action) =>{
      state.isSearchBlogsResults = action.payload
    }
},
});

export const { setMobileMenuOpen,setCallBackDiloagBox,setShareDiloag,setBlogsSearchResultsShow,setBlogResults } = configSlice.actions;
export default configSlice.reducer;
