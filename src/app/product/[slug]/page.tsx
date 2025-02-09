
import { IProduct } from '../../../../types/products-types'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ShoppingCart } from 'lucide-react'
import { groq } from 'next-sanity'
import Image from 'next/image'



interface IParams {
    params: Promise <{ slug: string }>
}

 async function FetchProducts (slug: string) : Promise<IProduct> {
    
    return client.fetch(

        groq `*[_type == "product" && slug.current == $slug][0] {
            _id,
            productName,
            price,
            image,
            _type,
            description
        
        } ` , {slug}
    )
}


export default async function DynamicProduct({ params }: IParams) {

    const { slug } = await params;
    const product = await FetchProducts(slug);
    // console.log(product);
    
return (
    <div className='flex justify-center  flex-wrap mt-28 mb-80'> {/*Parent div  */}

        <div className='px-20 xl:px-24'> {/*child  div for image */}
            {product.image && (
                <Image
                    src={urlFor(product.image).url()}
                    alt=""
                    height={440}
                    width={490} />
            )}
        </div>



        <div className='w-96 my-16 lg:my-0'> {/*child div for content */}
            <span className='text-3xl md:text-5xl  '>{product.productName}</span> <br />

           <div className='py-7'>
             <span className='text-base md:text-lg text-gray-600'> {product.description} </span>
           </div>

           <div>
                <span className='text-2xl md:text-3xl font-semibold'>${product.price}</span>
           </div>

           <div className='relative'>
           <ShoppingCart  className='cart' />
                <button className='btn cart-btn bg-black text-white'>Add to Cart</button>
           </div>
        </div>
    </div>
)

}