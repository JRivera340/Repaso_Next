import { redirect } from 'next/navigation'


//para redirigir de una a dashboard en vez de solo /
export default function Home() {
    redirect('/dashboard')
}
