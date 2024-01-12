import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Card } from "../ui/card"
import { Separator } from "../ui/separator"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import timeZones from "timezones-list";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { archiveProject, deleteProject, updateProject } from "@/api/project"
import { setProject } from "@/reducer/projectSlice"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useNavigate } from "react-router-dom"
import { getZone, getZones } from "@/lib/zone"


export default () => {

    const form = useForm()
    const navigation = useNavigate();
    const project = useSelector((state: any) => state.project.project);
    const [copy,setCopy] = useState(false)
    const [isLoading,setIsLoading] = useState({
        archive:false,
        update:false,
        delete:false
    })
    const [open,setOpen]= useState({
        archive:false,
        delete:false
    
    });

    const dispatch = useDispatch()



    useEffect(() => {
        console.log(project)
        form.setValue("project_id", project._id)
        form.setValue("project_name", project.name)
        console.log(project.timeZone)
        form.setValue("timezone", project.timeZone)
    }, [])

    const onSubmit = async () =>{
        setIsLoading({...isLoading,update:true})
        updateProject(form.getValues("project_id"),form.getValues("project_name"),form.getValues("timezone")).then((res)=>{
            dispatch(setProject(res.data))
            setIsLoading({...isLoading,update:false})
            toast({
                title: "Project Updated",
                description: "Your project has been updated.",
            })
        })
    }

    const onArchive = () => {
        setIsLoading({...isLoading,archive:true})
        archiveProject(form.getValues("project_id")).then((res)=>{
            dispatch(setProject(res.data))
            setIsLoading({...isLoading,archive:false})
            setOpen({...open,archive:false})
            toast({
                title: res.data.archived ? "Project Archived" : "Project Unarchived",
                description: res.data.archived ? "Your project has been archived." : "Your project has been unarchived."
            })
        })
    }


    const onDelete = () => {
        setIsLoading({...isLoading,delete:true})
        deleteProject(form.getValues("project_id")).then((res)=>{
            dispatch(setProject(res.data))
            setIsLoading({...isLoading,delete:false})
            setOpen({...open,delete:false})
            toast({
                title: "Project Deleted",
                description: "Your project has been deleted."
            })
            navigation("/")
        })
    }




    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Project</h3>
                <p className="text-sm text-muted-foreground">
                    Update your projrct settings. Set your project name, ID, and
                    timezone.
                </p>
            </div>
            <Separator />
            <Form {...form} >
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="project_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project ID</FormLabel>
                                <div className="flex gap-3">
                                    <FormControl>
                                        <Input readOnly placeholder="Project ID" {...field} />
                                    </FormControl>

                                    <Popover open={copy}>
                                        <PopoverTrigger>
                                            <Button variant="outline" size="icon" onClick={(e) => {
                                                e.preventDefault();
                                               
                                                navigator.clipboard.writeText(form.getValues("project_id"))
                                                setCopy(true)
                                                setTimeout(()=>{
                                                    setCopy(false)
                                                },2000)
                                            }}>
                                                <CopyIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-max">
                                            <p>Copied</p>
                                        </PopoverContent>
                                    </Popover>

                                </div>
                                <FormDescription>
                                    This is the name that will be displayed on your profile and in
                                    emails.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        name="project_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the name that will be displayed on your profile and in
                                    emails.
                                </FormDescription>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Timezone</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}  >
                                    <FormControl>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Project Timezone" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {
                                                getZones().map((zone)=>{
                                                    return (
                                                        <SelectItem key={zone.abbr} value={zone.abbr} >
                                                            {zone.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is the name that will be displayed on your profile and in
                                    emails.
                                </FormDescription>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button disabled={isLoading.update} className="font-semibold" >{
                            isLoading.update ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Saving Changes</> : "Save Changes"
                        
                        }</Button>
                    </div>
                </form>
                <h2 className="text-lg font-medium">Danger Zone</h2>
                <Card>
                    <div className="flex p-6">
                        <div className="flex-1">
                            <h2 className="text-sm font-medium">Delete Project</h2>
                            <p className="text-sm text-muted-foreground">
                                Once you delete your account, there is no going back. Please be
                                certain.
                            </p>
                        </div>
                        <div className="flex flex-col ">
                            <Dialog open={open.delete} onOpenChange={()=>setOpen({...open,delete:!open.delete})}>
                                <DialogTrigger asChild>
                                <Button variant="outline" className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }} >Delete Project</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-lg font-medium">
                                            Delete Project
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Once you delete your account, there is no going back.
                                            Please be certain.
                                        </p>
                                        <div className="flex justify-end">
                                            <Button variant="outline" disabled={isLoading.delete} className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }} onClick={onDelete} >{
                                                isLoading.delete ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Deleting Project</> : "Delete Project"
                                            }</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="flex p-6">
                        <div className="flex-1">
                            <h2 className="text-sm font-medium">{
                                project.archived ? "Unarchive Project" : "Archive Project"
                            
                            }</h2>
                            <p className="text-sm text-muted-foreground">
                               {
                                      project.archived ? "This will allow you to start tracking time again." : "This will prevent you from tracking time on this project."
                               }
                            </p>
                        </div>
                        <div className="flex flex-col ">
                            <Dialog open={open.archive} onOpenChange={()=>setOpen({...open,archive:!open.archive})}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }}>{
                                        project.archived ? "Unarchive Project" : "Archive Project"
                                    }</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-lg font-medium">{
                                            project.archived ? "Unarchive Project" : "Archive Project"
                                        
                                        }</h2>
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                project.archived ? "Are you sure you want to unarchive this project? This will allow you to start tracking time again." : "Are you sure you want to archive this project? This will prevent you from tracking time on this project."
                                            }
                                        </p>
                                        <div className="flex justify-end">
                                            <Button variant="outline" disabled={isLoading.archive} className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }} onClick={onArchive} >{
                                                isLoading.archive ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> {
                                                    project.archived ? "Unarchiving Project" : "Archiving Project"
                                                }</> : project.archived ? "Unarchive Project" : "Archive Project"
                                            }</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </Card>
            </Form>
        </div>

    )
}