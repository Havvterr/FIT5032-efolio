<template>
    <div class="access-rejected">
        <h2>Access Denied</h2>
        <p>You must be logged in to view this page.</p>
        <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
    </div>
</template>

<style scoped>
.access-rejected {
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
}
</style>
