'use client'

export default function PaymentRequired() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Required 💳</h1>
      <p className="text-gray-600 mb-6">
        You need to complete payment before accessing your courses.
      </p>
      <a
        href="/pricing" // redirect to your payment page
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Pay Now
      </a>
    </div>
  );
}
