import { Resend } from "resend";

// resend instant
export const resend = new Resend(process.env.RESEND_API_KEY);
