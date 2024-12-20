export function currencyFormat(num: number) {
    return "Rs. " + String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "/";
}
