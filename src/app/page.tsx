import Link from "next/link"

export default function Home(){
  return(
    <div className="text-center mt-20">
        <Link href="/login" className="link text-[25px]">login</Link>
    </div>
  )
}