import { CartItem, CustomerDetails } from '@/types';

// Configurable WhatsApp Business Number (default with Indian country code 91, no + symbol)
export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918861185066';

export interface OrderBreakdown {
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export function calculateOrderSummary(items: CartItem[]): OrderBreakdown {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );
  // Free delivery over ₹499 (Meesho style), else ₹49
  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryCharge;

  return { subtotal, deliveryCharge, total };
}

/**
 * Generates the formatted WhatsApp order text as specified in requirements:
 *
 * NEW ORDER
 *
 * Customer Details:
 * Name: [Customer Name]
 * Phone: [Customer Phone]
 * Address: [Complete Address]
 *
 * Order Details:
 * 1. Product Name
 *    Size: XL
 *    Quantity: 2
 *    Price: ₹999
 *
 * Order Summary:
 * Subtotal: ₹1598
 * Delivery: ₹0
 * Total: ₹1598
 *
 * Please confirm this order.
 */
export function generateWhatsAppOrderMessage(
  customer: CustomerDetails,
  items: CartItem[],
  summary: OrderBreakdown
): string {
  const completeAddress = [
    customer.houseNumber,
    customer.area,
    customer.city,
    `${customer.state} - ${customer.pincode}`,
    customer.instructions ? `(Note: ${customer.instructions})` : '',
  ]
    .filter(Boolean)
    .join(', ');

  const itemsList = items
    .map((item, index) => {
      const itemPrice = item.product.discountedPrice * item.quantity;
      return `${index + 1}. ${item.product.name}\n   Size: ${item.selectedSize}\n   Color: ${item.selectedColor.name}\n   Quantity: ${item.quantity}\n   Price: ₹${itemPrice}`;
    })
    .join('\n\n');

  const deliveryStr =
    summary.deliveryCharge === 0 ? '₹0 (Free)' : `₹${summary.deliveryCharge}`;

  const message = `*NEW ORDER*

*Customer Details:*
Name: ${customer.fullName}
Phone: ${customer.phone}
Address: ${completeAddress}

*Order Details:*
${itemsList}

*Order Summary:*
Subtotal: ₹${summary.subtotal}
Delivery: ${deliveryStr}
Total: ₹${summary.total}

Please confirm this order.`;

  return message;
}

/**
 * Builds the wa.me URL for the order
 */
export function getWhatsAppOrderUrl(
  customer: CustomerDetails,
  items: CartItem[],
  summary: OrderBreakdown,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const message = generateWhatsAppOrderMessage(customer, items, summary);
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Validates checkout form data
 */
export function validateCustomerDetails(customer: CustomerDetails): {
  isValid: boolean;
  errors: Partial<Record<keyof CustomerDetails, string>>;
} {
  const errors: Partial<Record<keyof CustomerDetails, string>> = {};

  if (!customer.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (customer.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  const phoneDigits = customer.phone.replace(/[^0-9]/g, '');
  if (!customer.phone.trim()) {
    errors.phone = 'Mobile number is required';
  } else if (phoneDigits.length < 10) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }

  if (!customer.houseNumber.trim()) {
    errors.houseNumber = 'House / Flat / Street address is required';
  }

  if (!customer.area.trim()) {
    errors.area = 'Area / Colony / Street name is required';
  }

  if (!customer.city.trim()) {
    errors.city = 'City is required';
  }

  if (!customer.state.trim()) {
    errors.state = 'State is required';
  }

  const pincodeDigits = customer.pincode.replace(/[^0-9]/g, '');
  if (!customer.pincode.trim()) {
    errors.pincode = 'PIN code is required';
  } else if (pincodeDigits.length !== 6) {
    errors.pincode = 'PIN code must be exactly 6 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

