import CreateMovieForm from "@/components/createMovieForm";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateMovie() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if(!session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        })
    }, [router]);

    if(isLoading) {
        return <p>Loading...</p>;
    }
    
    return <CreateMovieForm />;
}