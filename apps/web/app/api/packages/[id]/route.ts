'use server'
import prisma from "@repo/db/client";

export const GET = async (req: Request) => {
    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 

    // Validate the ID
    if (!id || isNaN(Number(id))) {
        return Response.json({ error: "Invalid package ID" }, { status: 400 });
    }

    try {
        // Fetch the package by ID
        const packageData = await prisma.packages.findUnique({
            where: {
                id: Number(id),
            },
        });

        // If no package is found, return 404
        if (!packageData) {
            return Response.json({ error: "Package not found" }, { status: 404 });
        }

        // Return the package data
        return Response.json({ package: packageData }, { status: 200 });
    } catch (e: any) {
        console.error(e);
        return Response.json({ error: e.message }, { status: 500 });
    }
};
