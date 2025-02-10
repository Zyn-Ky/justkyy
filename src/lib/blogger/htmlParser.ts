import * as cheerio from "cheerio";

export function getFirstImageAsUrl(contentHtml: string) {
    const $ = cheerio.load(contentHtml)
    const firstImage = $("img").first().attr("src");
    return firstImage || null;
}