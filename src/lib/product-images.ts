// Maps product slugs/image_url paths from the DB to bundled assets.
// DB stores symbolic paths like "/src/assets/product-bat.jpg"; we resolve them here.
import bat from "@/assets/product-bat.jpg";
import pads from "@/assets/product-pads.jpg";
import gloves from "@/assets/product-gloves.jpg";
import ball from "@/assets/product-ball.jpg";
import helmet from "@/assets/product-helmet.jpg";
import shoes from "@/assets/product-shoes.jpg";
import placeholder from "@/assets/hero-shop.jpg";

const MAP: Record<string, string> = {
  "pro-willow-match-bat": bat,
  "crease-guard-batting-pads": pads,
  "cover-drive-batting-gloves": gloves,
  "test-series-leather-ball": ball,
  "sixth-stump-helmet": helmet,
  "spike-stride-cricket-shoes": shoes,
  "/src/assets/product-bat.jpg": bat,
  "/src/assets/product-pads.jpg": pads,
  "/src/assets/product-gloves.jpg": gloves,
  "/src/assets/product-ball.jpg": ball,
  "/src/assets/product-helmet.jpg": helmet,
  "/src/assets/product-shoes.jpg": shoes,
};

export function resolveProductImage(slugOrPath?: string | null): string {
  if (!slugOrPath) return placeholder;
  // Real http(s) URLs pass through
  if (/^https?:\/\//i.test(slugOrPath)) return slugOrPath;
  return MAP[slugOrPath] ?? placeholder;
}

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
