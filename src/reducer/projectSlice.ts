import { getLogsByProjectID } from "@/api/collection";
import { getProject, getProjectStatsByProjectID, getProjects } from "@/api/project";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProjectByID = createAsyncThunk('project/getProject', async (id ) => {
    const response = await getProject(id);
    return response.data
})

export const getAllProjects = createAsyncThunk('project/getProjects', async () => {
    const response = await getProjects();
    return response.data
})

export const getLogsByProject = createAsyncThunk('project/getLogs', async (projectID) => {
    const response = await getLogsByProjectID(projectID);
    return response.data
})

export const getProjectStats = createAsyncThunk('project/getStats', async (projectID) => {
    const response = await getProjectStatsByProjectID(projectID);
    return response.data
})





const projectSlice = createSlice({
    name: 'project',
    initialState: {
        project: null,
        isLoading: false,
        error: null,
        projects: [],
        logs: [],
        stats:{
            docSize:0,
            docCount:0,
            collectionCount:0,
        }
    },
    reducers: {
        setProject: (state, action) => {
            state.project = action.payload
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getProjectByID.fulfilled, (state, action) => {
            state.project = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getProjectByID.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProjectByID.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })

        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getAllProjects.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllProjects.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })
        builder.addCase(getLogsByProject.fulfilled, (state, action) => {
            state.logs = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getLogsByProject.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getLogsByProject.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })
        builder.addCase(getProjectStats.fulfilled, (state, action) => {
            state.stats = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getProjectStats.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProjectStats.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.isLoading = false
        })

    },
})

export default projectSlice.reducer;
export const { setProject, setProjects } = projectSlice.actions;
