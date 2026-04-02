<script> 
    let { data } = $props(); 
</script> 

<h1>Customers Data</h1>

<section>
    <form method="POST" action="?/add"> 
        <input name="name" placeholder="Name" required /> 
        <input name="email" type="email" placeholder="Email" />
        <input name="phone" type="tel" placeholder="Phone Number" />
        <button type="submit">Add Customer</button>
    </form>
</section>

<div>
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
                </tr> 
            {/each}
        </tbody>
    </table>
</div>

