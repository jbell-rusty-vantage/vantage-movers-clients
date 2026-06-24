export const telHref = (phone: string) => `tel:${phone.replace(/[^0-9]/g, "")}`;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
