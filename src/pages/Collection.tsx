import CollectionCombox from "@/components/CollectionCombox"
import DataTable from "@/components/DataTable"
import Header from "@/components/Header"

import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getCollectionByID, getDataByCollection } from "@/reducer/collectionSlice"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Label } from "recharts"
import { createCollection } from "@/api/collection"
import { getZone } from "@/lib/zone"
import moment from "moment-timezone";



export default () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [isCreateLoading, setIsCreateLoading] = useState(false)

    const project = useSelector((state: any) => state.project.project);

    const collectionID = useSelector((state: any) => state.collection.collection)

    const data = useSelector((state: any) => state.collection.data);

    const [timeZone, setTimeZone] = useState('gmt');

    async function fetchCollection() {
        dispatch(getCollectionByID(id))
    }

    useEffect(() => {
        fetchCollection()
    }, [id])
    
    useMemo(()=>{
        if(project){
            console.log(project)
            setTimeZone(getZone(project.timeZone))
        }
    },[project])
    
    useEffect(()=>{
        onRefresh()
    },[collectionID])

    async function onRefresh() {
        if(collectionID){
            console.log(collectionID)
            console.log(id)
            dispatch(getDataByCollection({collectionID,id,page:1}))
        }
    }


    async function onCreateCollection() {
        setIsCreateLoading(true)
        createCollection(id,collectionName).then(() => {
            fetchCollection()
            setOpen(false)
            setIsCreateLoading(false)
        })
    }

    return (
        <div>
            <Header id={id} />
            <div className="m-6">
                <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Collections
                            </h2>
                            <p className="text-muted-foreground">
                                Here&apos;s the collections you have created.
                            </p>
                            <div className="my-6">
                                <CollectionCombox />
                               
                                <Dialog open={open} onOpenChange={setOpen}  >
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setOpen(true)} className="ml-4">
                                            <span className="text-sm">Create Collection</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>New Collection</DialogTitle>
                                            <DialogDescription>
                                                Create a new collection to start working on your project.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Label htmlFor="name" className="text-left">
                                                Collection Name
                                            </Label>
                                            <Input onChange={e => setCollectionName(e.target.value)} id="name" className="col-span-3" />

                                        </div>
                                        <DialogFooter>
                                            <Button variant="secondary" onClick={() => setOpen(false)} className="font-semibold">Cancel</Button>
                                            <Button type="submit" disabled={isCreateLoading} onClick={onCreateCollection} className="font-semibold">{
                                                isCreateLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin flex justify-center" />Creating Collection</> : "Create Collection"

                                            }</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">

                        </div>

                    </div>


                    <DataTable 
                    data={data.docs?data.docs.map(
                        (item)=>({
                            ...item,
                            createdAt: moment(item.createdAt).tz(timeZone).format('YYYY-MM-DD HH:mm:ss') ,
                            // updatedAt:new Date(item.updatedAt).toLocaleString(timeZone),
                        })
                    ):[]} 
                    onRefresh={onRefresh} 
                    canPreviousPage={data.hasPrevPage}
                    canNextPage={data.hasNextPage}
                    previousPage={()=>dispatch(getDataByCollection({collectionID,id,page:data.prevPage}))}
                    nextPage={()=>dispatch(getDataByCollection({collectionID,id,page:data.nextPage}))}

                    />

                </div>
            </div>
        </div>
    )
}