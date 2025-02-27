"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isClose, setIsClose] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            })

            const data = await response.json()

            if (response.ok) {
                setError(data.message)
                router.push("/")
            } else {
                setError(data.message || "registration failed")
            }

        } catch (err) {
            console.error("something went wrong", err)
        }
    }
    return (
        <main>
            {
                !isClose && error && (
                    <div className="relative inset-0 flex items-center justify-center bg-black bg-opacity-50 top-[7rem]">
                        <div className="bg-white p-[3rem] rounded-lg shadow-lg absolute">
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                onClick={() => setIsClose(true)}
                            >
                                X
                            </button>
                            <div className="text-center text-red-600 font-semibold">{error}</div>
                        </div>
                    </div>
                )
            }
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                onChange={e => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Register