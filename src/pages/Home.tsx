import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { createProject, getProjects } from "@/api/project"
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "@/reducer/projectSlice"
import { ReloadIcon } from "@radix-ui/react-icons"

export default () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projects = useSelector((state: any) => state.project.projects);
    const isLoading = useSelector((state: any) => state.project.isLoading);
 
    const [projectName, setProjectName] = useState('');
    const [isCreateLoading,setIsCreateLoading] = useState(false);
    const [open,setOpen] = useState(false);

    const fetchProjects = async () => {
        dispatch(getAllProjects())
    }

    const onCreateProject = async () => {
        setIsCreateLoading(true)
        createProject(projectName).then(()=>{
            fetchProjects()
            setOpen(false)
            setIsCreateLoading(false)
        })
    }

    useEffect(() => {
        fetchProjects();
        console.log(projects)
    }, [])



    return (
        <div>
            <Header hideLinks  />
            <div className="w-1/2 m-auto pt-4">
                <div className="search my-4 flex gap-4">
                    <Input placeholder="Search" className="p-5" size={6} />
                    <Dialog open={open} onOpenChange={setOpen}  >
                        <DialogTrigger asChild>
                            <Button onClick={()=>setOpen(true)} className="font-semibold">New Project</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>New Project</DialogTitle>
                                <DialogDescription>
                                    Create a new project to start working on your project.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Label htmlFor="name" className="text-left">
                                    Project Name
                                </Label>
                                <Input onChange={e=>setProjectName(e.target.value)} id="name" className="col-span-3" />

                            </div>
                            <DialogFooter>
                                <Button variant="secondary" onClick={()=>setOpen(false)} className="font-semibold">Cancel</Button>
                                <Button type="submit" disabled={isCreateLoading} onClick={onCreateProject} className="font-semibold">{
                                    isCreateLoading?<><ReloadIcon className="mr-2 h-4 w-4 animate-spin flex justify-center" />Creating Project</>:"Create Project"
                                
                                }</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                {isLoading?<div className="flex justify-center mt-8 align-middle"><ReloadIcon className="mr-2 h-4 w-4 animate-spin flex justify-center" /> Loading...</div> :(<div className="grid grid-cols-4 mt-10 gap-5">

                    {
                      projects?.map(project => (
                            <Card onClick={() => navigate(`/dashboard/${project._id}`)} className="h-[200px] w-[200px] flex justify-center align-middle items-center  hover:opacity-80 hover:cursor-pointer">
                                <h1 className="font-bold">{project.name}</h1>
                            </Card>
                        ))
                    }

                </div>)}
            </div>
        </div>
    )
}