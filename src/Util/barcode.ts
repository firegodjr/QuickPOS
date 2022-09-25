export function ParseBarcodeString(code: string): IBarcodeScan
{
    let codeTokens = code.split("$");
    return {
        item: codeTokens[0],
        price: parseInt(codeTokens[1]) * 100
    }
}

export function TallyCents(scans: IBarcodeScan[]): number
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

export interface IBarcodeScan {
    item: string,
    price: number
}

export interface IRecord {
    scans: IBarcodeScan[],
    total: number
}