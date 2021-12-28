export default function CategoryDetail({category}){
    return(
        <>
        <p>Dettaglio categoria {category.title}</p>
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
    const res = await fetch('https://lit-gorge-46422.herokuapp.com/categories/' +params.id);
    const category = await res.json();

    console.log(category);
    return {props: {category}}
}