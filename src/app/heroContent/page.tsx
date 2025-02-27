import React from 'react'

const HeroContent = () => {
    return (
        <main>
            <div className='relative top-[10rem]'>
                <div className="flex flex-col items-center justify-center p-6 text-center ">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Contact Management System</h1>
                    <p className="max-w-xl">
                        Manage your contacts effortlessly with role-based access control. Easily create, view, and modify contacts, ensuring only authorized users have access to sensitive details.
                    </p>

                    <div className="mt-6 space-y-2">
                        <p className="text-lg font-semibold text-indigo-600">✔ View and manage your saved contacts</p>
                        <p className="text-lg font-semibold text-green-600">✔ Admins can create and modify contacts</p>
                        <p className="text-lg font-semibold text-red-600">✔ Regular users can edit their own contacts</p>
                    </div>

                    <p className="mt-6">Log in to get started and take control of your contact database!</p>
                </div>
            </div>
        </main>
    )
}

export default HeroContent