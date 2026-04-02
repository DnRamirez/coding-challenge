import { db } from '$lib/server/db';
import { customers } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return { customers: db.select().from(customers).all() }; 
}; 

export const actions: Actions = { 
    add: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
        
        try {
            await db.insert(customers).values({
			name,
			email,
			phone 
		}); 
            return { success: true };
        
        } catch (error) {
            console.error('Error adding customer:', error);
            return { success: false };
        }
	},

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = parseInt(formData.get('id') as string);

        try {
            await db.delete(customers).where(eq(customers.id, id));
            return { success: true };

        } catch (error) {
            console.error('Error deleting customer:', error);
            return { success: false };
        }
    }
}; 