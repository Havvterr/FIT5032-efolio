<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" v-model="username" class="form-control" id="username" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

// 登录处理逻辑
const handleLogin = () => {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || []
    const validAccount = accounts.find(
        (account) => account.username === username.value && account.password === password.value
    )

    if (validAccount) {
        // 设置用户认证状态
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(validAccount))
        router.push('/profile') // 重定向到 profile 页面
    } else {
        errorMessage.value = 'Invalid username or password'
        router.push('/access-rejected') // 登录失败重定向
    }
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
