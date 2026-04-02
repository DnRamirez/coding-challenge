<script>
let { data } = $props();
</script>
<h1>Products</h1>

<section class="form-container">
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


<div class="table-container">
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
                    <td>
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={product.id} />
                            <button class="btn-danger" type="submit">Delete</button>
                        </form>
                    </td>
                </tr> 
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        margin-top: 20px;
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-family: sans-serif;
    }

    th {
        text-align: left;
        padding: 12px;
    }

    td {
        padding: 12px;
        border-top: 1px solid #ddd;
    }


    .form-container {
        background: #fafafa;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
    }

    input {
        padding: 8px;
        margin-right: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    select {
    padding: 8px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }  

    .btn-danger {
        background-color: #dc3545;
    }
</style>