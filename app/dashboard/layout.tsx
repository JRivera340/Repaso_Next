//este layout es para esta url de dashboard

export default function DashboardLayout({ children }: Readonly<{children : React.ReactNode}>) {

    return(

        <div>
            <aside>

            </aside>
            {children}
        </div>
        
    );

}
   
