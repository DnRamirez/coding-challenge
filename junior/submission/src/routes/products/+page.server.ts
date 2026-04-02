import { db } from '$lib/server/db';
import { customers, products, stores } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        // Join products with stores to get store name for each product
        products: db.select({
            id: products.id,
            name: products.name,
            description: products.description,
            price: products.price,
            store_name: stores.name, 
        })
        .from(products)
        .leftJoin(stores, eq(products.store_id, stores.id))
        .all(),
        // Fetch stores data for dropdown options
        stores: db.select().from(stores).all()
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
    } 
}; 
