import api from './api';

export const getProjects=async()=>{
    return await api.get('/project/all');
}

export const createProject=async(name:string)=>{
    return await api.post('/project/create',{name})
}

export const getProject=async(id:string)=>{
    return await api.get(`/project/${id}`)
}

export const addProjectAPI=async(projectID:string,key_name:string,key:string,permission:string)=>{
    return await api.post(`/project/${projectID}/apikey`,{key_name,key,permission})
}

export const deleteProjectAPI=async(projectID:string,keyID:string)=>{
    return await api.delete(`/project/${projectID}/apikey/${keyID}`)
}

export const updateProjectAPI=async(projectID:string,keyID:string,permission:string)=>{
    return await api.put(`/project/${projectID}/apikey/${keyID}/update`,{permission})
}

export const disableProjectAPI=async(projectID:string,keyID:string)=>{
    return await api.put(`/project/${projectID}/apikey/${keyID}/disable`)
}

export const updateProject = async (id:string,name:string,timeZone:string)=>{
    return await api.put(`/project/${id}/update`,{name,timeZone})
}

export const archiveProject = async (id:string)=>{
    return await api.put(`/project/${id}/archive`)
}

export const deleteProject = async (id:string)=>{
    return await api.delete(`/project/${id}`)
}

export const getProjectStatsByProjectID = async (projectID:string)=>{
    return await api.get(`/project/${projectID}/stats`)
}

