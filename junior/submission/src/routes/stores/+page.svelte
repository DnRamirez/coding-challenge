<script>
    let { data } = $props(); 
</script> 

<h1>Stores</h1>

<section class="form-container">
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

<div class="table-container">
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
                    <td>
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={store.id} />
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

