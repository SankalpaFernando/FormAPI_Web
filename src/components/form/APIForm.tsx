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
import { PlusIcon } from "@radix-ui/react-icons"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react"
import generateAPIKey from "generate-api-key"
import { addProjectAPI, deleteProjectAPI, disableProjectAPI, updateProjectAPI } from "@/api/project"
import { useDispatch, useSelector } from "react-redux"
import { getProjectByID, setProject } from "@/reducer/projectSlice"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog"
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog"
import { toast } from "../ui/use-toast"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"


export default () => {

    const form = useForm()
    const project = useSelector((state: any) => state.project.project);
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    

    const dispatch = useDispatch();

    useEffect(() => {
        form.setValue("api_key", generateAPIKey({}))
        form.setValue("permission", "write")
    }, [])

    const onAPIKeyAdd = () => {
        setIsLoading(true)
        addProjectAPI(project._id, form.getValues("api_key_name"), form.getValues("api_key"), form.getValues("permission")).then((res) => {
            setOpen(false)
            dispatch(setProject(res.data))
            toast({
                title: "API Key Added",
                description: "API Key has been added."

            })
            setIsLoading(false)
            form.setValue("api_key", generateAPIKey({}))
            form.setValue("permission", "write")    
            form.setValue("api_key_name", "")
        })

    }
    


    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">API Keys</h3>
                <p className="text-sm text-muted-foreground">
                    Update your projrct settings. Set your project name, ID, and
                    timezone.
                </p>
            </div>
            <Separator />
            <Button variant="outline" onClick={() => setOpen(true)} > <PlusIcon className="mr-2 h-4 w-4" /> Generate API Keys  </Button>
            <Dialog open={open} >

                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Generate API Keys</DialogTitle>
                        <DialogDescription>
                            Generate API Keys for your project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Form {...form}   >
                            <form className="space-y-8" onSubmit={form.handleSubmit(onAPIKeyAdd)}>
                                <FormField

                                    name="api_key_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>API Key Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="API Key Name" {...field} />
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
                                    name="api_key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>API Key</FormLabel>
                                            <div className="flex gap-3">
                                                <FormControl>
                                                    <Input readOnly placeholder="API Key" {...field} />
                                                </FormControl>
                                                <Button variant="outline" size="icon" onClick={(e) => {
                                                    e.preventDefault()
                                                    navigator.clipboard.writeText(form.getValues("api_key"))
                                                }} >
                                                    <CopyIcon />
                                                </Button>
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
                                    control={form.control}
                                    name="permission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Access Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value} >
                                                <FormControl>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Access Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="write">Write Only</SelectItem>
                                                    <SelectItem value="read">Read Only</SelectItem>
                                                    <SelectItem value="write-read">Write & Read</SelectItem>
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
                                <DialogFooter className="mt-4">
                                    {/* <Button variant="outline" className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }}>Delete API Key</Button> */}
                                    {/* <Button variant="outline" className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }}>Revoke Access</Button> */}
                                    <Button variant="secondary" onClick={(e) => {
                                        e.preventDefault();
                                        setOpen(false)
                                        }} className="font-semibold">Cancel</Button>

                                    <Button disabled={isLoading} type="submit" className="font-semibold">
                                        {
                                            isLoading ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Creating API Key</>): "Create API Key"
                                        }
                                    </Button>
                                </DialogFooter>
                            </form>

                        </Form>
                    </div>
                </DialogContent>
            </Dialog>


            {
                project.apiKeys && project.apiKeys.map((key: any) => {
                    return <APICard key={key._id} disable={key.disable} key_name={key.key_name} _id={key._id} api_key={key.key} permission={key.permission} />
                })
            }

        </div>

    )
}



const APICard = ({ key_name, api_key, permission, _id, disable }) => {


    const dispatch = useDispatch();
    const [copy, setCopy] = useState(false);

    const [isLoading, setIsLoading] = useState({
        delete: false,
        update: false,
        disable: false
    });
 
    const project = useSelector((state: any) => state.project.project);


    const { register, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            key_name,
            api_key,
            permission
        }
    })

    const onDelete = () => {
        setIsLoading({
            ...isLoading,
            delete: true
        })
        deleteProjectAPI(project._id, _id).then((res) => {
            dispatch(setProject(res.data))
            toast({
                title: "API Key Deleted",
                description: "API Key has been deleted."

            })
            setIsLoading({
                ...isLoading,
                delete: false
            })
        })
    }

    const onUpdate = () => {
        setIsLoading({
            ...isLoading,
            update: true
        })
        updateProjectAPI(project._id, _id, getValues("permission")).then((res) => {
            console.log(res)
            dispatch(setProject(res.data))
            toast({
                title: "API Key Updated",
                description: "API Key has been updated."

            })
            setIsLoading({
                ...isLoading,
                update: false
            })
        })
    }

    const onDisable = () => {
        setIsLoading({
            ...isLoading,
            disable: true
        })
        disableProjectAPI(project._id, _id).then((res) => {
            dispatch(setProject(res.data))
            toast({
                title: "API Key Disabled",
                description: "API Key has been disabled."

            })
            setIsLoading({
                ...isLoading,
                disable: false
            })
        })
    }

    return (
        <Card>
            <div className="p-6">
                <div className="grid w-full  items-center gap-1.5">
                    <Label className="mb-2" htmlFor="picture">API Key Name</Label>
                    <Input disabled placeholder="API Key Name" {...register('key_name')} />
                </div>
                <div className="grid mt-4 w-full  items-center gap-1.5">
                    <Label className="mb-2" htmlFor="picture">API Key</Label>
                    <div className="flex gap-3 w-full">
                        <Input disabled placeholder="API Key"  {...register('api_key')} />
                            <Popover open={copy}>
                                <PopoverTrigger>
                                    <Button variant="outline" size="icon" onClick={(e) => {
                                        e.preventDefault();
                                        navigator.clipboard.writeText(getValues("api_key"))
                                        setCopy(true)
                                        setTimeout(() => {
                                            setCopy(false)
                                        }, 2000)
                                    }}>
                                        <CopyIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-max">
                                    <p>Copied</p>
                                </PopoverContent>
                            </Popover>
                    </div>
                </div>
                <div className="grid mt-4 w-full  items-center gap-1.5">
                    <Label className="mb-2" htmlFor="picture">Access Type</Label>
                    <div className="flex gap-3 w-full">
                        <Select defaultValue={getValues("permission")} onValueChange={(e) => setValue("permission", e)} >
                            <SelectTrigger >
                                <SelectValue placeholder="Access Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="read">Read only</SelectItem>
                                <SelectItem value="write">Write only</SelectItem>
                                <SelectItem value="read_write">Read & Write</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" disabled={isLoading.delete} className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }}>{
                                isLoading.delete ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Deleting API Key</>): "Delete API Key"
                            
                            }</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    API Key.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant="outline" onClick={onDisable} disabled={isLoading.disable} className="font-semibold" style={{ borderColor: "#f5365c", color: "#f5365c", borderWidth: ".15rem" }}>
                        {
                            isLoading.disable ? (
                            <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> {disable ? "Enabling API Key" : "Disabling API Key"}
                            </>):(
                                disable ? "Enable API Key" : "Disable API Key"
                            )
                        }
                    </Button>
                    <Button className="font-semibold" disabled={isLoading.update}  onClick={onUpdate}>
                        {
                            isLoading.update ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Saving Changes</>): "Save Changes"
                        }
                        </Button>
                </div>
            </div>
        </Card>
    )
}