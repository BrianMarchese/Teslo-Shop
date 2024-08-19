import  prisma  from "../lib/prisma";
import { initialData } from "./seed";


async function main() {
    
    // 1- Borrar datos previos 
    //await Promise.all([
      await  prisma.productImage.deleteMany();
      await  prisma.product.deleteMany();
      await  prisma.category.deleteMany();
    //]);

    const { categories, products } = initialData

    // Categorias
    const categoriesData = categories.map( category => ({ // convierto la category en un objeto
        name: category
    }))

    await prisma.category.createMany({ // la creo en la db
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany()

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[category.name.toLowerCase()] = category.id

        return map
    }, {} as Record<string, string>) //<string=shirt, string=categoryID>

    // Productos
    products.forEach( async(product) => {
        const { type, images, ...rest } = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Imagenes
        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
    })




    console.log('Seed ejecutado correctamente');
    
}


(() =>{
    if(process.env.NODE_ENV === 'production') return;

    
    main();
})();