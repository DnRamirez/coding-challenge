import { db } from '$lib/server/db';
import { customers, stores } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const customerId = url.searchParams.get('customer_id')
    let storesResult; 

    if (customerId) {
        storesResult = db.select({
            id: stores.id,
            name: stores.name,
            location: stores.location,
            customer_name: customers.name,
        })
        .from(stores)
        .leftJoin(customers, eq(stores.customer_id, customers.id))
        .where(eq(stores.customer_id, parseInt(customerId)))
        .all();
    } else {
        storesResult = db.select({
            id: stores.id,
            name: stores.name,
            location: stores.location,
            customer_name: customers.name,
        })
         .from(stores)
        .leftJoin(customers, eq(stores.customer_id, customers.id))
        .all();
    }
    return { 
        stores: storesResult,
        // Fetch customers data for dropdown options
        customers: db.select({
            id: customers.id,
            name: customers.name
         }).from(customers).all(), 
         selectedCustomerId: customerId ? parseInt(customerId) : null
        }
     };

export const actions: Actions = {
    add: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const location = formData.get('location') as string;
        const customer_id = parseInt(formData.get('customer_id') as string);

        try {
            await db.insert(stores).values({
                name,
                location,
                customer_id
            }); 
            return { success: true };

        } catch (error) {
            console.error('Error adding store:', error);
            return { success: false };
        }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = parseInt(formData.get('id') as string);

        try {
            await db.delete(stores).where(eq(stores.id, id));
            return { success: true };
            
        } catch (error) {
            console.error('Error deleting store:', error);
            return { success: false };
        }
    }
}; 