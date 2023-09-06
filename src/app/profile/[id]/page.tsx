
export default function UserProfile({params} : any){
    return(
        <div className="mt-[200px] m-auto max-w-[500px] flexCenter flex-col gap-y-4">
            <h1>Profile</h1>
            <p>profile page <span className="bg-pink-400 font-bold text-black p-2 rounded-sm">{params.id}</span></p>
        </div>
    )
}