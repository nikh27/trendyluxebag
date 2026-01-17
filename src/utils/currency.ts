// Currency utility for Pakistan Rupees (PKR)

/**
 * Format amount in Pakistani Rupees
 * @param amount - The amount to format
 * @param showSymbol - Whether to show the currency symbol (default: true)
 * @returns Formatted currency string
 */
export const formatPKR = (amount: number, showSymbol: boolean = true): string => {
    const formatted = amount.toLocaleString('en-PK', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return showSymbol ? `Rs ${formatted}` : formatted;
};

/**
 * Calculate discounted price
 * @param originalPrice - Original price
 * @param discountPercent - Discount percentage (0-100)
 * @returns Discounted price
 */
export const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercent: number
): number => {
    return originalPrice - (originalPrice * discountPercent) / 100;
};

/**
 * Format price with discount
 * @param price - Current price
 * @param originalPrice - Original price (optional)
 * @returns Object with formatted prices
 */
export const formatPriceWithDiscount = (
    price: number,
    originalPrice?: number
) => {
    const current = formatPKR(price);
    const original = originalPrice ? formatPKR(originalPrice) : null;
    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return {
        current,
        original,
        discount,
        hasDiscount: discount > 0,
    };
};
