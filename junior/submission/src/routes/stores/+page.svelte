<script>
    let { data } = $props(); 
</script> 

<h1> Stores Data</h1>

<section>
    <form method="POST" action="?/add"> 
        <input name="name" placeholder="Name" required />  
        <input name="location" placeholder="Location" />
        <select name="customer_id" required>
            <option value="" disabled selected>Select Customer</option>
            {#each data.customers as customer} 
                <option value={customer.id}>{customer.name}</option>
            {/each}
        </select>
        <button type="submit">Add Store</button>
    </form>
</section>

<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Customer Name</th>
            </tr>
        </thead>
        <tbody>
            {#each data.stores as store} 
                <tr> 
                    <td>{store.name}</td>
                    <td>{store.location}</td>
                    <td>{store.customer_name}</td>
                </tr> 
            {/each}
        </tbody>
    </table>
</div>

