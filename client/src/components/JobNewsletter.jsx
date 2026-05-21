export default function JobNewsletter() {
  return (
    <section className="py-14 sm:py-16 bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 text-center">
          
          {/* HEADING */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 leading-tight">
              Get Job Alerts in Your Inbox
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Subscribe to receive the latest job opportunities, hiring updates,
              and career tips every week.
            </p>
          </div>

          {/* FORM */}
          <form className="mt-8 flex flex-col lg:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
            
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full flex-1 px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base shadow-sm"
            />

            <button
              type="submit"
              className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-md transition duration-300"
            >
              Subscribe Now
            </button>
          </form>

          {/* SMALL TEXT */}
          <p className="mt-5 text-xs sm:text-sm text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}