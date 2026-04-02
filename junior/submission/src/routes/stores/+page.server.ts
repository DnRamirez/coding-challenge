import { db } from '$lib/server/db';
import { customers, stores } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return { 
        // Join stores with customers to get customer name for each store
        stores: db.select({
            id: stores.id,
            name: stores.name,
            location: stores.location,
            customer_name: customers.name, 
        })
        .from(stores)
        .leftJoin(customers, eq(stores.customer_id, customers.id)) 
        .all(),
        // Fetch customers data for dropdown options
        customers: db.select({
            id: customers.id,
            name: customers.name
         }).from(customers).all()
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
    }
} 