import React from 'react'
import { GetStaticProps } from 'next'
import style from './index.module.scss'
import Link from 'next/link'
import { it } from 'node:test'
type Props = {
    list: any[]
}

const Homepage: React.FC<Props> = ({ list }) => {
    return (
        <div className={style.container}>
            {list.map((item) => (
              <div className={style.postcontainer}>
                <h2>{item.id}</h2>
               <h3>
            <Link href={`/posts/${item.id}`} className={style.link}>
                {item.title}
            </Link>
          </h3>
                <p>{item.body.split(" ").slice(0, 5).join(" ")}...</p>
              </div>
            ))}
        </div>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const responcedata = await response.json()
    
    return {
        props: {
            list: responcedata,
        },
    }
}

export default Homepage