export default function About() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-6">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">About Us</h1>
            <p className="text-lg text-center text-gray-700 max-w-3xl leading-relaxed">
                ReactWrite is a powerful and user-friendly platform built with React and Django, 
                allowing users to express themselves through posts, connect with others, and manage their profiles with ease. 
                The project leverages modern web technologies and is deployed across Vercel and Render, with Supabase as the database.
            </p>
        </div>
    )
}
