export default function ItemDetail({item}){
    return(
        <>
        <p>Dettaglio item {item.title}</p>
        </>
    )
}

export async function getStaticPaths(){
    const res= await fetch('https://lit-gorge-46422.herokuapp.com/items');
    const items = await res.json();

    const ids= items.map(item =>{
        return{
            params: {itemId: item.id, id: item.categories.id}
        }
    })

    return{
        paths: ids,
        fallback:false
    }
}


export async function getStaticProps({params}){
    const res = await fetch('https://lit-gorge-46422.herokuapp.com/items/' +params.itemId);
    const item = await res.json();

    console.log(item);
    return {props: {item}}
}