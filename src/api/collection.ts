import api from "./api"

export const getCollectionByProjectID= async (id:string)=>{
    return await api.get(`/collection/${id}/all`)
}

export const createCollection = async (projectID:string,name:string)=>{
    return await api.post(`/collection/${projectID}/create`,{name})
}

export const getDataByCollectionByName = async (collectionID:string,projectID:string,page:string)=>{
    return await api.get(`/collection/${projectID}/${collectionID}/data?page=${page}`)
}

export const getLogsByProjectID = async (projectID:string)=>{
    return await api.get(`/collection/logs/${projectID}`)
}


