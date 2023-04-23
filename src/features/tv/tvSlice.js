import { createAsyncThunk, createSlice, isAsyncThunkAction } from "@reduxjs/toolkit"
import axios from '../../helper/axios';
import { requests } from "../../helper/requests";
const initialState = {
    nfOriginals:{
        status: "idle",
        error: null,
        data: null
    },
    popularTv: {
        status: "idle",
        error: null,
        data: null
    }

}

export const fetchNetflixOriginals = createAsyncThunk(
    'tv/fetchNetflixOriginals',
    async () => {
        const response = await axios.get(requests.netflixOriginals)
        return response.data;
    })

    export const fetchPopularTv = createAsyncThunk(
        "tv/fetchPopularTv",
        async (type) => {
          const response = await axios.get(requests.getPopular(type));
          return response.data;
        }
      );



export const tvSlice = createSlice({
    name: 'tv',
    initialState: initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNetflixOriginals.pending, (state) => {
            state.nfOriginals.status = 'loading';
        })
        .addCase(fetchNetflixOriginals.fulfilled, (state, action)=>{
            state.nfOriginals.status = "success";
            state.nfOriginals.data = action.payload;
        })
        .addCase(fetchNetflixOriginals.rejected, (state, action)=>{
            state.nfOriginals.status = "failed";
            state.nfOriginals.error = action.error.message;
        })
        .addCase(fetchPopularTv.pending, (state) => {
            state.popularTv.status = 'loading';
        })
        .addCase(fetchPopularTv.fulfilled, (state, action)=>{
            state.popularTv.status = "success";
            state.popularTv.data = action.payload;
        })
        .addCase(fetchPopularTv.rejected, (state, action)=>{
            state.popularTv.status = "failed";
            state.popularTv.error = action.error.message;
        })
        
    }
})

export const selectNfOriginals = (state) => state.tv.nfOriginals;
export const selectPopularTv = (state) => state.tv.popularTv;

export default tvSlice.reducer;