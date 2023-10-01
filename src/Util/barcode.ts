export function ParseBarcodeString(code: string): IOrderItem
{
    let codeTokens = code.split("$");
    return {
        item: codeTokens[0],
        price: parseInt(codeTokens[1]) * 100
    }
}

export function Tally(scans: IOrderItem[]): number
{
    let total = 0;
    for(let i = 0; i < scans.length; ++i)
    {
        total += scans[i].price
    }
    return total;
}

export function FormatPrice(price: number)
{
    return "$" + (price/100).toFixed(2);
}

export interface IOrderItem {
    item: string,
    price: number
}

export interface IOrder {
    scans: IOrderItem[],
    total: number
}

export interface IOrderHistoryItem {
    total: number,
    time: string
}