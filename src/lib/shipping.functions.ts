import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// In-memory token cache (per worker instance — best-effort)
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getShiprocketToken(): Promise<string> {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) throw new Error("Shiprocket credentials not configured");

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;

  const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Shiprocket auth failed [${res.status}]`);
  const data = (await res.json()) as { token: string };
  // Tokens last ~10 days; cache for 8
  cachedToken = { token: data.token, expiresAt: Date.now() + 8 * 24 * 60 * 60 * 1000 };
  return data.token;
}

const RateInput = z.object({
  pickup_pincode: z.string().regex(/^\d{6}$/).default("110001"),
  delivery_pincode: z.string().regex(/^\d{6}$/),
  weight_kg: z.number().positive().max(50),
  cod: z.boolean().default(false),
});

export const getShippingRates = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RateInput.parse(input))
  .handler(async ({ data }) => {
    try {
      const token = await getShiprocketToken();
      const params = new URLSearchParams({
        pickup_postcode: data.pickup_pincode,
        delivery_postcode: data.delivery_pincode,
        weight: String(data.weight_kg),
        cod: data.cod ? "1" : "0",
      });
      const res = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?${params}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!res.ok) throw new Error(`Serviceability check failed [${res.status}]`);
      const json = (await res.json()) as {
        data?: { available_courier_companies?: Array<{ courier_name: string; rate: number; estimated_delivery_days: string; etd: string }> };
      };
      const couriers = (json.data?.available_courier_companies ?? [])
        .map((c) => ({
          name: c.courier_name,
          rate_inr: Math.round(c.rate),
          eta: c.etd || `${c.estimated_delivery_days} days`,
        }))
        .sort((a, b) => a.rate_inr - b.rate_inr)
        .slice(0, 5);
      return { ok: true as const, couriers };
    } catch (err) {
      return { ok: false as const, error: (err as Error).message };
    }
  });
