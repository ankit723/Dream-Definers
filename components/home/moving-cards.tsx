'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

const imageList = [
    "/assets/home/moving-cards/1_2.jpeg",
    "/assets/home/moving-cards/2_2.jpeg",
    "/assets/home/moving-cards/3_3.jpeg",
    "/assets/home/moving-cards/4_4.jpeg"
]


export function MovingCards() {
    const [currentCard, setCurrentCard] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setVisible(false)
            setTimeout(() => {
                setCurrentCard(p=>(p+1)%imageList.length);
                setVisible(true);
            }, 100);
        }, 4000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Image
            src={imageList[currentCard]}
            alt="Moving Card"
            width={400}
            height={400}
            quality={100}
            priority
            className={`w-full h-full object-cover rounded-lg ${visible?"opacity-100":"opacity-0"} transition-opacity duration-300`}
        />
    );
}