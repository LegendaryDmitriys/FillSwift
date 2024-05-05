import React from 'react';
import AdminRefuelingRequests from "./AdminRefuelingRequests";
import AdminPurchaseRequests from "./AdminPurchaseRequests";
import Stats from "./Stats";

function AdminRequests(props) {
    return (
        <div>
            <AdminRefuelingRequests/>
            <AdminPurchaseRequests/>
            <Stats/>
        </div>
    );
}

export default AdminRequests;