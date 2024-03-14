import Heading from "@/ui/heading/Heading";
import Link from "next/link";

export default function NotFound(){
    return (
        <>
            <Heading>Такой страницы нет</Heading>
            <Link href="/">Вернуться на главную страницу</Link>
        </>
    )
}