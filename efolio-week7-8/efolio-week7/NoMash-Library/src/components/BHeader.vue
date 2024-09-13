<template>
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active">About</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link to="/FireRegister" class="nav-link" active-class="active"
                        >Register</router-link
                    >
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link to="/FireLogin" class="nav-link" active-class="active"
                        >Sign In</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated && !isAdmin">
                    <router-link to="/home" class="nav-link" active-class="active"
                        >Home</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated && isAdmin">
                    <router-link to="/home" class="nav-link" active-class="active"
                        >Home</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated && isAdmin">
                    <router-link to="/admin-dashboard" class="nav-link" active-class="active"
                        >Admin Dashboard</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <button @click="logout" class="btn btn-link nav-link">Logout</button>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()
const isAuthenticated = ref(false)
const isAdmin = ref(false)

onMounted(() => {
    auth.onAuthStateChanged(async (user) => {
        isAuthenticated.value = !!user
        if (user) {
            isAdmin.value = user.uid === 'e757Gk3U5VM2sjdwQ8f65f0Xdag1'
        }
    })
})

const logout = () => {
    auth.signOut()
        .then(() => {
            console.log('User logged out successfully')
            router.push('/FireLogin')
        })
        .catch((error) => {
            console.log('Error logging out:', error)
        })
}
</script>

<style scoped>
.nav-item {
    margin-right: 15px;
}

.nav-link.active {
    font-weight: bold;
}
</style>
