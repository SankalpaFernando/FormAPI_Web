import Header from "@/components/Header"
import { SidebarNav } from "@/components/SideBar"
import APIForm from "@/components/form/APIForm"
import ProjectForm from "@/components/form/ProjectForm"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useParams } from "react-router-dom"




const sidebarNavItems = [
    {
        title: "Project",
        component: <ProjectForm/>,
    },
    {
        title: "API Keys",
        component: <APIForm/>,
    }
   
]


export default () => {

    const [route, setRoute] = useState("Project");

    const {id} = useParams();

    return (
        <div>
            <Header id={id} />
            <div className="m-6">
                <div className="hidden space-y-6 p-10 pb-16 md:block">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                        <p className="text-muted-foreground">
                            Manage your account settings and set e-mail preferences.
                        </p>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-1/5">
                            <SidebarNav items={sidebarNavItems} selectedRoute={route} setRoute={setRoute} />
                        </aside>
                        <div className="flex-1 lg:max-w-2xl">
                            
                            {
                                sidebarNavItems.map((item) => (
                                    <div key={item.title} className={cn(route === item.title ? "block" : "hidden")}>
                                        {item.component}
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}