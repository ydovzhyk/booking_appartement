import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "headerHeight.ts");

// * POST: Оновлює висоту хедера
export async function POST(req: Request) {
  try {
    const { height } = await req.json();

    if (typeof height !== "number" || height <= 0) {
      return NextResponse.json({ error: "Invalid height value" }, { status: 400 });
    }

    const fileContent = `export const HEADER_HEIGHT = ${height};`;
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true, height });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// * GET: Отримує висоту хедера
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ headerHeight: 370 });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const heightMatch = fileContent.match(/export const HEADER_HEIGHT = (\d+);/);

    if (heightMatch && heightMatch[1]) {
      const headerHeight = parseInt(heightMatch[1], 10);
      return NextResponse.json({ headerHeight });
    } else {
      return NextResponse.json({ headerHeight: 394 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}


