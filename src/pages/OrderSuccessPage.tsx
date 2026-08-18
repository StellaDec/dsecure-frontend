import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductImage } from '@/components/ProductImage';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '../utils/seo';
import { apiClient as api } from '@/utils/enhancedApiClient';
import { ThemeButton } from '@/components/ui/Theme';
import {
  CheckCircle, XCircle, Package, CreditCard, User, FileText,
  HelpCircle, Download, LayoutDashboard, ArrowLeft, Clock,
  Mail, Headphones, BookOpen
} from 'lucide-react';

// API Response interfaces — backend schema ke according
interface BillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  formatted: string;
}

interface OrderDetails {
  order_id: number;
  order_date: string;
  status: string;
  dodo_payment_id: string;
  dodo_invoice_id: string;
}

interface PaymentInfo {
  status: string;
  method: string;
  amount: number;
  tax_amount: number;
  currency: string;
  transaction_id: string;
  provider: string;
  payment_date: string;
  payment_link: string;
  card_last_four: string;
  card_network: string;
  card_type: string;
}

interface ProductDetails {
  product_id: string;
  name: string;
  summary: string;
  quantity: number;
  duration_years: number;
}

interface CustomerInfo {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  billing_address: BillingAddress;
}

interface InvoiceInfo {
  invoice_id: string;
  invoice_number: string;
  date: string;
  status: string;
  pdf_url: string;
  currency: string;
  total_amount: number;
  tax_amount: number;
}

interface LicenseInfo {
  license_keys: string[];
  license_count: number;
  license_years: number;
  expires_at: string;
}

interface OrderDetailsResponse {
  order_details: OrderDetails;
  payment_info: PaymentInfo;
  product_details: ProductDetails;
  customer_info: CustomerInfo;
  invoice_info: InvoiceInfo;
  license_info: LicenseInfo;
}

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seo = getSEOForPage('order-success');

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 2000; // 2 seconds

    const fetchOrderDetails = async () => {
      const orderId = searchParams.get('order_id') || searchParams.get('orderId');
      const paymentId = searchParams.get('payment_id');
      const identifier = orderId || paymentId || localStorage.getItem('lastOrderId');

      if (!identifier) {
        setError('No order or payment ID found. Redirecting...');
        setTimeout(() => navigate('/pricing-and-plan'), 3000);
        setLoading(false);
        return;
      }

      try {
        console.log(`📦 Fetching order details (Attempt ${retryCount + 1}/${maxRetries})`);
        const response = await api.get<OrderDetailsResponse>(`/api/Payments/orders/${identifier}/details`);
        
        if (response.success && response.data) {
          setOrderData(response.data);
          localStorage.setItem('lastOrderId', identifier);
          setLoading(false);
        } else {
          const error: any = new Error(response.error || 'Failed to load order details');
          error.status = response.status;
          throw error;
        }
      } catch (err: any) {
        console.error(`Attempt ${retryCount + 1} failed:`, err);
        
        // Agar data nahi mila aur retries baaki hain
        if (retryCount < maxRetries && err.status === 404) {
          retryCount++;
          console.log(`⏳ Waiting ${retryDelay}ms before retry...`);
          setTimeout(fetchOrderDetails, retryDelay);
        } else {
          setError(err.message || 'Failed to load order details. Please refresh the page.');
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [navigate, searchParams]);

  // Currency format helper
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Date format helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Status color helper — Theme palette ke according
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'paid' || statusLower === 'success' || statusLower === 'completed') {
      return 'bg-[#d4ede4] text-[#0e7c66]';
    }
    if (statusLower === 'pending') {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (statusLower === 'failed' || statusLower === 'cancelled') {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-[#5a6672]';
  };

  // Product category detect karo naam se
  const getProductCategory = (productName: string): string => {
    if (productName.toLowerCase().includes('drive')) return 'drive-eraser';
    if (productName.toLowerCase().includes('file')) return 'file-eraser';
    return 'drive-eraser';
  };

  // ── Loading State ──
  if (loading) {
    return (
      <>
        <SEOHeadNative seo={seo} />
        <div className="min-h-screen flex items-center justify-center bg-[#f4fbf8]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0e7c66] mx-auto"></div>
            <p className="mt-4 text-[#5a6672] text-lg">Loading order details...</p>
          </div>
        </div>
      </>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <>
        <SEOHeadNative seo={seo} />
        <div className="min-h-screen flex items-center justify-center bg-[#f4fbf8]">
          <div className="text-center max-w-md mx-auto px-4">
            {/* Icon container — rounded-full as per theme */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#0a2e1e] mb-2">Error Loading Order</h2>
            <p className="text-[#5a6672] mb-6">{error}</p>
            <ThemeButton onClick={() => navigate('/pricing-and-plan')} variant="primary">
              Go to Pricing
            </ThemeButton>
          </div>
        </div>
      </>
    );
  }

  if (!orderData) return null;

  const { order_details, payment_info, product_details, customer_info, invoice_info } = orderData;

  return (
    <>
      <SEOHeadNative seo={seo} />
      <div className="min-h-screen bg-[#f4fbf8] py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Success Header ── */}
          <div className="text-center mb-10">
            {/* Icon container — rounded-full (Theme rule: icons circular) */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#d4ede4] mb-6">
              <CheckCircle className="h-12 w-12 text-[#0e7c66]" strokeWidth={2} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0a2e1e] mb-3">
              Order Confirmed!
            </h1>
            <p className="text-lg text-[#5a6672] mb-2">
              Thank you for your purchase,{" "}
              <span className="font-semibold text-[#0a2e1e]">{customer_info.name}</span>!
            </p>
            <p className="text-[#5a6672]">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-[#0a2e1e]">{customer_info.email}</span>
            </p>
          </div>

          {/* ── Main Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Left Column — Order & Product Details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Order Information Card — rounded-none, border-[#d0d5dc] */}
              <div className="bg-white rounded-none border border-[#d0d5dc] overflow-hidden">
                <div className="bg-[#0e7c66] px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-[#5a6672]">Order ID</span>
                      <p className="font-mono font-semibold text-[#0a2e1e]">
                        #{order_details.order_id}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#5a6672]">Order Date</span>
                      <p className="font-medium text-[#0a2e1e]">
                        {formatDate(order_details.order_date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#5a6672]">Status</span>
                      <p>
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-none ${getStatusColor(order_details.status)}`}
                        >
                          {order_details.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#5a6672]">Payment ID</span>
                      <p
                        className="font-mono text-sm text-[#5a6672] truncate"
                        title={order_details.dodo_payment_id}
                      >
                        {order_details.dodo_payment_id || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Card */}
              <div className="bg-white rounded-none border border-[#d0d5dc] overflow-hidden">
                <div className="bg-[#0a2e1e] px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Product Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <ProductImage
                      category={getProductCategory(product_details.name)}
                      productName={product_details.name}
                      version="Professional"
                      size="medium"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#0a2e1e]">
                        {product_details.name}
                      </h3>
                      <p className="text-[#5a6672] text-sm mt-1">
                        {product_details.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <span className="inline-flex items-center px-3 py-1 bg-[#d4ede4] text-[#0e7c66] rounded-none text-sm font-medium">
                          <Clock className="w-4 h-4 mr-1" />
                          {product_details.duration_years} Year
                          {product_details.duration_years > 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-[#d4ede4] text-[#0e7c66] rounded-none text-sm font-medium">
                          <Package className="w-4 h-4 mr-1" />
                          {product_details.quantity} License
                          {product_details.quantity > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Card */}
              <div className="bg-white rounded-none border border-[#d0d5dc] overflow-hidden">
                <div className="bg-[#0a2e1e] px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-[#5a6672]">Name</span>
                      <p className="font-medium text-[#0a2e1e]">
                        {customer_info.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#5a6672]">Email</span>
                      <p className="font-medium text-[#0a2e1e]">
                        {customer_info.email}
                      </p>
                    </div>
                    {customer_info.phone && (
                      <div>
                        <span className="text-sm text-[#5a6672]">Phone</span>
                        <p className="font-medium text-[#0a2e1e]">
                          {customer_info.phone}
                        </p>
                      </div>
                    )}
                    {customer_info.company_name && (
                      <div>
                        <span className="text-sm text-[#5a6672]">Company</span>
                        <p className="font-medium text-[#0a2e1e]">
                          {customer_info.company_name}
                        </p>
                      </div>
                    )}
                    {customer_info.billing_address?.formatted && (
                      <div className="sm:col-span-2">
                        <span className="text-sm text-[#5a6672]">
                          Billing Address
                        </span>
                        <p className="font-medium text-[#0a2e1e]">
                          {customer_info.billing_address.formatted}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Payment & Invoice */}
            <div className="space-y-6">

              {/* Payment Summary Card */}
              <div className="bg-white rounded-none border border-[#d0d5dc] overflow-hidden">
                <div className="bg-[#0e7c66] px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Summary
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#0a2e1e]">
                      {formatCurrency(
                        payment_info.amount,
                        payment_info.currency,
                      )}
                    </div>
                    {payment_info.tax_amount > 0 && (
                      <p className="text-sm text-[#5a6672] mt-1">
                        Includes{" "}
                        {formatCurrency(
                          payment_info.tax_amount,
                          payment_info.currency,
                        )}{" "}
                        tax
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 border-t border-[#d0d5dc] pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5a6672]">Status</span>
                      <span
                        className={`px-2 py-0.5 rounded-none text-xs font-semibold ${getStatusColor(payment_info.status)}`}
                      >
                        {payment_info.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5a6672]">Method</span>
                      <span className="font-medium text-[#0a2e1e] capitalize">
                        {payment_info.method}
                      </span>
                    </div>
                    {payment_info.card_last_four && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5a6672]">Card</span>
                        <span className="font-medium text-[#0a2e1e]">
                          {payment_info.card_network} ••••{" "}
                          {payment_info.card_last_four}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5a6672]">Date</span>
                      <span className="font-medium text-[#0a2e1e]">
                        {formatDate(payment_info.payment_date)}
                      </span>
                    </div>
                    {payment_info.transaction_id && (
                      <div className="text-sm">
                        <span className="text-[#5a6672]">Transaction ID</span>
                        <p className="font-mono text-xs text-[#5a6672] mt-1 break-all">
                          {payment_info.transaction_id}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Invoice Card */}
              {invoice_info && (
                <div className="bg-white rounded-none border border-[#d0d5dc] overflow-hidden">
                  <div className="bg-[#0a2e1e] px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Invoice
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5a6672]">Invoice #</span>
                        <span className="font-mono font-medium text-[#0a2e1e]">
                          {invoice_info.invoice_number}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5a6672]">Date</span>
                        <span className="font-medium text-[#0a2e1e]">
                          {formatDate(invoice_info.date)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#5a6672]">Total</span>
                        <span className="font-bold text-[#0a2e1e]">
                          {formatCurrency(
                            invoice_info.total_amount,
                            invoice_info.currency,
                          )}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://live.dodopayments.com/invoices/payments/${order_details.dodo_payment_id}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#d4ede4] hover:bg-[#0e7c66] text-[#0e7c66] hover:text-white font-semibold py-3 px-4 rounded-none transition-colors duration-150 border border-[#d0d5dc]"
                    >
                      <Download className="w-5 h-5" />
                      Download Invoice PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Next Steps ── */}
          <div className="bg-white rounded-none p-6 mb-8 border border-[#d0d5dc]">
            <h3 className="text-lg font-bold text-[#0a2e1e] mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0e7c66]" />
              What Happens Next?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: 1, icon: Mail, title: 'Email Confirmation', desc: 'Within 5 minutes' },
                { step: 2, icon: Package, title: 'License Delivery', desc: 'Within 24 hours' },
                { step: 3, icon: Headphones, title: 'Support Access', desc: 'Immediate access' },
                { step: 4, icon: BookOpen, title: 'Onboarding', desc: 'Within 48 hours' },
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-3 bg-[#f4fbf8] rounded-none p-4 border border-[#d0d5dc]/40">
                  {/* Step number — rounded-full (Theme rule: icons circular) */}
                  <div className="flex-shrink-0 w-8 h-8 bg-[#d4ede4] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[#0e7c66]">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a2e1e]">{item.title}</p>
                    <p className="text-sm text-[#5a6672]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Action Buttons — ThemeButton component use karo ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <ThemeButton
              onClick={() => navigate('/support')}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Headphones className="w-5 h-5" />
              Contact Support
            </ThemeButton>
            <ThemeButton
              onClick={() => navigate('/admin/downloads')}
              variant="primary"
              className="flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Center
            </ThemeButton>
            <ThemeButton
              onClick={() => navigate('/admin')}
              variant="primary"
              className="flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              Admin Dashboard
            </ThemeButton>
          </div>

          {/* ── Footer Link ── */}
          <div className="text-center">
            <Link
              to="/all-products"
              className="text-[#0e7c66] hover:text-[#0a2e1e] font-medium transition-colors duration-150 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
