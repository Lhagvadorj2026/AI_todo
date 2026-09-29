

export const POST = async (req: Request) => {
    const body = await req.json()
    const { todo } = body
    console.log("todo:", todo)
    return Response.json({
        todo

    })

}

