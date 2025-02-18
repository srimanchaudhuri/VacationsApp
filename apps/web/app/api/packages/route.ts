import prisma from "@repo/db/client";
import { packageModel } from "../../model/package";

export const GET = async (req: Request) => {

    const url = new URL(req.url)
    console.log(parseInt(url.searchParams.get("userId")!));
    const userId = url.searchParams.get("userId")
    try {
        let packages: packageModel[] = []
        if(userId != null) {
             packages = await prisma.packages.findMany({
                where: {
                    userId: parseInt(userId)
                }
            })
        }
        else {
            packages = await prisma.packages.findMany()
        }
        return Response.json({packages}, {status: 200})
    }
    catch(e: any) {
        console.error(e) 
        return Response.json({error: e.message}, {status: 411})
    }
}