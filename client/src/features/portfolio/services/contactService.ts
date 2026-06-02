import type { ContactPayload } from "@/types";
import { portfolioApi } from "../api/portfolioApi";

export function sendContactMessage(payload: ContactPayload) {
  return portfolioApi.sendMessage(payload);
}
