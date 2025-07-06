import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Benjamin Okumu</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
            <li><Link href="#about" className="hover:text-blue-300">About</Link></li>
            <li><Link href="#projects" className="hover:text-blue-300">Projects</Link></li>
            <li><Link href="#contact" className="hover:text-blue-300">Contact</Link></li>
            {session ? (
              <>
                <li><Link href="/admin" className="hover:text-blue-300">Admin</Link></li>
                <li><button onClick={() => signOut()} className="hover:text-blue-300">Sign Out</button></li>
              </>
            ) : (
              <li><button onClick={() => signIn()} className="hover:text-blue-300">Sign In</button></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}