<template>
    <div class="profile-container">
        <h2>Welcome, {{ user.username }}</h2>
        <p>This is your profile page. You are successfully logged in!</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义用户信息和路由
const router = useRouter()
const user = ref(null)

// 检查用户是否已登录
const checkAuthentication = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
        router.push('/access-rejected')
    } else {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            user.value = currentUser
        } else {
            router.push('/access-rejected')
        }
    }
}

checkAuthentication()
</script>

<style scoped>
.profile-container {
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
}
</style>
