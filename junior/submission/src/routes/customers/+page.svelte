<script> 
    let { data } = $props(); 
</script> 

<h1>Customers Data</h1>

<section class="form-container">
    <form method="POST" action="?/add"> 
        <input name="name" placeholder="Name" required /> 
        <input name="email" type="email" placeholder="Email" />
        <input name="phone" type="tel" placeholder="Phone Number" />
        <button type="submit">Add Customer</button>
    </form>
</section>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {#each data.customers as customer} 
                <tr>
                    <td>{customer.id}</td> 
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={customer.id} />
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

    .btn-danger {
        background-color: #dc3545;
    }


</style>

