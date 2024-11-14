import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className="hover:text-gray-400">Start From Here</Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/dashboard" className="hover:text-gray-400">My Contracts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;