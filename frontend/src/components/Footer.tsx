export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 Benjamin Okumu Okinyi. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/Benja988" className="hover:text-blue-300">GitHub</a>
          <a href="https://www.linkedin.com/in/benjamin-okumu-b947802b8/" className="hover:text-blue-300">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}