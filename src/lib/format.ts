/** Strip a display phone number down to a tel: href. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^0-9]/g, "")}`;

/** USD with thousands separators, no decimals. */
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
