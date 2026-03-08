import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r p-6 hidden md:block shadow-sm">
            <h2 className="text-2xl font-bold mb-8 text-indigo-600">PROYECTO CRUD</h2>
            <nav className="space-y-2">
                <a href="/personas" className="block p-3 rounded-lg bg-indigo-50 text-indigo-600 font-bold">
                    Estudiantes
                </a>
            </nav>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
            {children}
        </main>
        </body>
        </html>
    );
}