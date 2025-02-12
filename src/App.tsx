import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlignCenterVertical as Certificate } from 'lucide-react';

interface CertificateDetails {
  courseTitle: string;
  completionDate: string;
  issuer: string;
}

interface VerificationResult {
  status: 'verified' | 'unverified' | null;
  message: string;
  details?: CertificateDetails;
}

interface CertificateData {
  email: string;
  code: string;
  details: CertificateDetails;
}

// Store all valid certificates here
const VALID_CERTIFICATES: CertificateData[] = [
  {
    email: 'Pardeshinakshatra@gmail.com',
    code: 'IXG672',
    details: {
      courseTitle: 'AI Fluency Bootcamp',
      completionDate: 'February 14, 2025',
      issuer: 'Virtual Intern'
    }
  },
];

function App() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching certificate
    const certificate = VALID_CERTIFICATES.find(
      cert => cert.email === email && cert.code === code
    );

    if (certificate) {
      setResult({
        status: 'verified',
        message: 'Certificate successfully verified!',
        details: certificate.details
      });
    } else {
      setResult({
        status: 'unverified',
        message: 'Invalid certificate code or email.'
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <Certificate className="w-12 h-12 text-indigo-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            CertifyVerify
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Instant verification for your certificates
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter certificate code"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </form>

          {result && (
            <div className={`mt-6 rounded-lg overflow-hidden ${
              result.status === 'verified' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
            }`}>
              <div className="p-4 flex items-center space-x-3">
                {result.status === 'verified' ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                <p className={`text-sm ${
                  result.status === 'verified' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
              </div>

              {result.status === 'verified' && result.details && (
                <div className="border-t border-green-100 bg-white p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Certificate Details</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Course Title</dt>
                      <dd className="text-sm text-gray-800">{result.details.courseTitle}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                      <dd className="text-sm text-gray-800">{result.details.completionDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Issued By</dt>
                      <dd className="text-sm text-gray-800">{result.details.issuer}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;