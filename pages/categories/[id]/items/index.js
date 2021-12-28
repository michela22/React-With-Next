import Link from 'next/link' ;

export default function Items({items,category}){
    return(
        <>
        <table>
            <tbody>
                {items.map(item =>{
                    return(
                        <tr key={item.id}>
                            <td>
                                <Link href= {'/categories/'+category+'/items/' + item.id}>
                                    <a>{item.title}</a>
                                </Link>
                                </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}


export async function getStaticPaths(){
    const res= await fetch('https://lit-gorge-46422.herokuapp.com/categories');
    const categories = await res.json();

    const ids= categories.map(category =>{
        return{
            params: {id: category.id}
        }
    })

    return{
        paths: ids,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const res = await fetch('https://lit-gorge-46422.herokuapp.com/items?categories=' + params.id);
    const items = await res.json();

    
    return {props: {items, category:params.id}}
}