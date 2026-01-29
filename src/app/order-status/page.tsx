import OrderStatusClient from './status-client';

export const metadata = {
  title: 'Order Status • Spirit Numeral',
  description: 'Check your report status or resend your personalized PDF.',
};

export default function OrderStatusPage() {
  return <OrderStatusClient />;
}
