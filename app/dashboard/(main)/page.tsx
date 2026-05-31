import Image from "next/image";

export default async function Dashboard(){


    const res = await fetch(`https://randomuser.me/api/?results=5`)
    const data = await res.json()

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">API</h1>
            <p>Bienvenido</p>
            <ul>
                {data.results.map((user: any)=>(

                    <li key={user.login.uuid}>
                        <Image src={user.picture.large}
                        alt={user.name.first}
                        width={50}
                        height={50} />
                        <p>{user.name.first} {user.name.last}</p>
                                    
                    </li>
                ))}
            </ul>

        </div>
    )

}