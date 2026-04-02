<script>
let { data } = $props();
</script>
<h1> Products Data </h1>

<section>
    <form method="POST" action="?/add"> 
        <input name="name" placeholder="Name" required />  
        <input name="description" placeholder="Description" />
        <input name="price" type="number" step="0.01" placeholder="Price" /> 
         <select name="store_id" required>
            <option value="" disabled selected>Select Store</option>
            {#each data.stores as store} 
                <option value={store.id}>{store.name}</option>
            {/each}
        </select>
       
        <button type="submit">Add Product</button>
    </form>
</section>


<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Store Name</th>
            </tr>
        </thead>
        <tbody>
            {#each data.products as product} 
                <tr> 
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.store_name}</td>
                </tr> 
            {/each}
        </tbody>
    </table>
</div>