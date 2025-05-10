import ControllerCard from "@/controllers/post";
import { NextRequest, NextResponse } from "next/server";

const postController = ControllerCard.getInstance();

export async function POST(req) {
    try {
        const formData = await req.json();
        const result = await postController.add(formData);
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ msg: error.message }, { status: 500 });
    }
}

