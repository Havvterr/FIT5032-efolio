<template>
    <div class="container">
        <header class="d-flex justify-content-between align-items-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                        >Home</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <router-link to="/about" class="nav-link" active-class="active"
                        >About</router-link
                    >
                </li>
            </ul>
            <button class="btn btn-secondary" @click="handleAuthAction">
                {{ isAuthenticated ? 'Logout' : 'Login' }}
            </button>
        </header>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = computed(() => localStorage.getItem('isAuthenticated') === 'true')

const handleAuthAction = () => {
    if (isAuthenticated.value) {
        localStorage.removeItem('isAuthenticated')
        router.push('/login')
    } else {
        router.push('/login')
    }
}
</script>
