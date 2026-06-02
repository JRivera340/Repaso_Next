'use client'
//este layout es para esta url de dashboard
import Sidebar from '@/app/components/sidebar'
import { useAuthStore } from '@/app/_store/auth.store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'



export default function DashboardLayout({ children }: Readonly<{children : React.ReactNode}>) {

     // guard — verificar si está autenticado
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
        router.push('/login')
    }
}, [])

    return(

        <div className='flex'>
            <aside >
            <Sidebar />
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
        
    );

}
   
