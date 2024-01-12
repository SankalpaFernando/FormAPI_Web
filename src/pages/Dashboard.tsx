import Header from "@/components/Header"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getLogsByProject, getProjectByID, getProjectStats } from "@/reducer/projectSlice"
import moment from "moment-timezone"
import { getZone } from "@/lib/zone"

export default () => {


    const dispatch = useDispatch();

    const { id } = useParams();

    const [chartData, setChartData] = useState([])
    const [requestPerHour, setRequestPerHour] = useState(0);


    const project = useSelector((state: any) => state.project.project)

    const stats = useSelector((state: any) => state.project.stats)


    

    useEffect(() => {
        if (!id) return;
        console.log(id)
        dispatch(getProjectByID(id))
        dispatch(getLogsByProject(id))
        dispatch(getProjectStats(id))
    }, [id])

    const data = useSelector((state: any) => state.project.logs)


    useEffect(() => {
        if (data.length == 0) return;
        let tempData = { ...data };

        const timeZone = getZone(project.timeZone)

        console.log(timeZone)

        console.log(moment().tz(timeZone).format('YYYY-MM-DD HH'))

        const diff = moment().tz(timeZone).subtract(24, 'hours').format('YYYY-MM-DD HH');
        const lastHours = Array.from(Array(24).keys()).map((item: any) => moment(diff).tz(timeZone).add(item, 'hours').format('YYYY-MM-DD HH'))

        const dtemp = [];
        console.log(lastHours)

        lastHours.forEach((item: any) => {
            const windex = tempData['writeLogs'].findIndex((i: any) => moment(i._id).tz(timeZone).format('YYYY-MM-DD HH') == moment(item).tz(timeZone).format('YYYY-MM-DD HH'))
            const rindex = tempData['readLogs'].findIndex((i: any) => moment(i._id).tz(timeZone).format('YYYY-MM-DD HH') == item)

            console.log(windex, rindex)

            item = moment(item).tz(timeZone).format('YYYY-MM-DD HH:mm');
            if (windex == -1 && rindex == -1) {
                dtemp.push({
                    _id: item,
                    writeCount: 0,
                    readCount: 0
                })
            } else {
                if (windex == -1) {
                    dtemp.push({
                        _id: item,
                        writeCount: 0,
                        readCount: tempData['readLogs'][rindex].count
                    })
                } else if (rindex == -1) {
                    dtemp.push({
                        _id: item,
                        writeCount: tempData['writeLogs'][windex].count,
                        readCount: 0
                    })
                } else {
                    dtemp.push({
                        _id: item,
                        writeCount: tempData['writeLogs'][windex].count,
                        readCount: tempData['readLogs'][rindex].count
                    })
                }
            }
        })


        setChartData(dtemp.sort((a: any, b: any) => moment(a._id).unix() - moment(b._id).unix()))


        const total = dtemp.reduce((a: any, b: any) => a + b.writeCount + b.readCount, 0)

        setRequestPerHour(total);


    }, [data])





    return (
        <div>
            <Header id={id} />
            <div className="m-6">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Documents Size
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{Math.round(((stats.docSize/1000000) + Number.EPSILON) * 100) / 100} MB</div>
                            <p className="text-xs text-muted-foreground">
                               {5-(Math.round(((stats.docSize/1000000) + Number.EPSILON) * 100) / 100)} MB left of 5 MB
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Document Count
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.docCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {100-((stats.docCount/1000)*100)}% left of 1000 documents
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Collection Count</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.collectionCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {5-stats.collectionCount} left of 5 collections
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Now
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{requestPerHour }</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div>


                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Request in 24 Hours</CardTitle>
                                {/* <Button className="bg-blue-500 text-white">Refresh</Button> */}
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>




                                    <LineChart width={300} height={100} data={chartData}>
                                        <XAxis
                                            dataKey="_id"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => moment(value).format('HH:mm')}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}/s`}
                                        />
                                        <Line type="monotone" dataKey="writeCount" stroke="#8884d8" strokeWidth={2} />
                                        <Line type="monotone" dataKey="readCount" stroke="#82ca9d" strokeWidth={2} />
                                    </LineChart>


                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent</CardTitle>
                                <CardDescription>You made 265 sales this month.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    <div className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                            <AvatarFallback>OM</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                            <p className="text-sm text-muted-foreground">
                                                olivia.martin@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$1,999.00</div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                                            <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                            <AvatarFallback>JL</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                            <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$39.00</div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                            <AvatarFallback>IN</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                            <p className="text-sm text-muted-foreground">
                                                isabella.nguyen@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$299.00</div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                            <AvatarFallback>WK</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">William Kim</p>
                                            <p className="text-sm text-muted-foreground">will@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$99.00</div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                            <AvatarFallback>SD</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                            <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$39.00</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}