import { getCollectionByProjectID, getDataByCollectionByName } from "@/api/collection";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCollectionByID = createAsyncThunk('collection/getCollection', async (id) => {
    const response = await getCollectionByProjectID(id);
    return response.data
})

export const getDataByCollection = createAsyncThunk('collection/getDataByCollection', async ({collectionID,projectID,page}) => {
    console.log(collectionID,projectID,page)
    const response = await getDataByCollectionByName(collectionID,projectID,page);
    return response.data
})

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collection: null,
        isLoading: false,
        error: null,
        collections: [],
        data:[],
        page:1,
    },
    reducers: {
        setCollection: (state, action) => {
            state.collection = action.payload
        },
        setCollections: (state, action) => {
            state.collections = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionByID.fulfilled, (state, action) => {
            state.collections = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getCollectionByID.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCollectionByID.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })
        builder.addCase(getDataByCollection.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getDataByCollection.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getDataByCollection.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })

    }
})

export default collectionSlice.reducer;
export const { setCollection, setCollections } = collectionSlice.actions;
