
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Type definition jeno TypeScript bujhte pare form-er data ki
interface FormState {
    name: string;
    email: string;
    password: string;
}

export default function SignupPage() {
    // Hooks
    const router = useRouter();
    const [form, setForm] = useState<FormState>({ name: '', email: '', password: '' });
    const [msg, setMsg] = useState('');
    const [isError, setIsError] = useState(false); // Error hole style change korar jonyo
    const [isLoading, setIsLoading] = useState(false); // Loading state jeno button disable thake

    // Form input-er change handle kora
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(''); // Purono msg clear kora
        setIsError(false);
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                // Registration fail hole
                setIsError(true);
                setMsg(data?.error || 'নিবন্ধন ব্যর্থ হয়েছে। ডেটা যাচাই করুন।');
                return;
            }
            
            // Registration সফল হলে
            setMsg('নিবন্ধন সফল হয়েছে। এখন লগইন করুন।');
            setIsError(false);
            
            // 2 second pore login page-e redirect
            setTimeout(() => {
                router.push('/login');
            }, 2000);
            
        } catch (error) {
            setIsError(true);
            setMsg('যোগাযোগ ত্রুটি: সার্ভারের সাথে সংযোগ করা যায়নি।');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                    নতুন ব্যবহারকারী নিবন্ধন
                </h2>
                
                {/* Message Display Area */}
                {msg && (
                    <p className={`p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                        {msg}
                    </p>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">নাম</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="আপনার পুরো নাম"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                        />
                    </div>
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">ইমেল ঠিকানা</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">গোপন সংকেত</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            placeholder="কমপক্ষে ৮ অক্ষরের গোপন সংকেত"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out 
                            ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            // Loading Spinner Design (Tailwind utility classes used for simple spinner)
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'নিবন্ধন করুন'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    ইতিমধ্যে অ্যাকাউন্ট আছে? 
                    <button onClick={() => router.push('/login')} className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                        লগইন করুন
                    </button>
                </p>
            </div>
        </div>
    );
}