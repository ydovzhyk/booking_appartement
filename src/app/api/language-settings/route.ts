import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "languageIndex.ts");

// * POST: Оновлює індекс мови
export async function POST(req: Request) {
  try {
    const { language } = await req.json();
    console.log(language)

    if (typeof language !== "number") {
      return NextResponse.json({ error: "Invalid language value" }, { status: 400 });
    }

    const fileContent = `export const lANGUAGE_INDEX = ${language};`;
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true, language });
  } catch (error) {
    console.error("Error writing language file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// * GET: Отримує індекс мови
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ languageIndex: 0 });
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    return NextResponse.json({ languageIndex: parsedData.languageIndex || 0 });
  } catch (error) {
    console.error("Error reading language file:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}


