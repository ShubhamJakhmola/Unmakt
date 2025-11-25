export default function Privacy() {
  return (
    <div className="tech-surface min-h-screen pt-24 pb-16 px-4">
      <div className="tech-surface__inner max-w-4xl mx-auto bg-white/90 backdrop-blur rounded-3xl shadow-lg p-10 border border-white/60">
        
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          At Unmakt, we take your privacy seriously. This Privacy Policy explains, in simple terms, what information we collect, how we use it, and how we keep it safe. We do not sell your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-4">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect only the information needed to operate and improve our services. This includes:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Details you share with us directly (such as through contact forms or email)</li>
          <li>Basic technical data like cookies, device info, and usage logs to improve website performance</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your information to:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Respond to your messages or requests</li>
          <li>Maintain, operate, and improve our website and services</li>
          <li>Ensure security and prevent misuse</li>
        </ul>

        <p className="text-gray-700 mb-4">
          We only share information with essential service providers (such as hosting or analytics tools) or when required by law.
        </p>

        <h2 className="text-xl font-semibold mt-4">Your Choices</h2>
        <p className="text-gray-700 mb-4">
          You can disable cookies through your browser settings. If you want your information updated or removed, you can contact us anytime.
        </p>

        <h2 className="text-xl font-semibold mt-4">Contact</h2>
        <p className="text-gray-700">
          If you have questions about this policy, email us at{" "}
          <a href="mailto:unmakt.info@gmail.com" className="text-unmakt-2 underline">
            unmakt.info@gmail.com
          </a>.
        </p>

      </div>
    </div>
  );
}
