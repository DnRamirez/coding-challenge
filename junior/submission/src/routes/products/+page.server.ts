import { db } from '$lib/server/db';
import { products, stores } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const storeId = url.searchParams.get('store_id');
    let productsResult; 

    if (storeId) {
        productsResult = db.select({
            id: products.id,
            name: products.name,
            description: products.description,
            price: products.price,
            store_name: stores.name,
        })
        .from(products)
        .leftJoin(stores, eq(products.store_id, stores.id))
        .where(eq(products.store_id, parseInt(storeId)))
        .all();
    } else {
        productsResult = db.select({
            id: products.id,
            name: products.name,
            description: products.description,
            price: products.price,
            store_name: stores.name,
        })
         .from(products)
         .leftJoin(stores, eq(products.store_id, stores.id))
         .all();
    }
    return {
        products: productsResult,
        // Fetch stores data for dropdown options
        stores: db.select({
            id: stores.id,
            name: stores.name
         }).from(stores).all(),
        selectedStoreId: storeId ? parseInt(storeId) : null
        }
    }; 


export const actions: Actions = {
    add: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const store_id = parseInt(formData.get('store_id') as string);

        try {
            await db.insert(products).values({
                name,
                description,
                price,
                store_id
            });
            return { success: true };
    } catch (error) {
            console.error('Error adding product:', error);
            return { success: false };
        }
    },
    
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = parseInt(formData.get('id') as string);
        
        try {
            await db.delete(products).where(eq(products.id, id));
            return { success: true };
            
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false };
        }
    }
};
