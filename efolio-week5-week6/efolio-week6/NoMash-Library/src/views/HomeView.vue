<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const router = useRouter()

// 用户表单数据
const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: ''
})

// 用于显示的已提交信息卡片数据
const submittedCards = ref([])

// 用于表单验证的错误信息
const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null,
    suburb: ''
})

// 验证用户名
const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = 'Name must be at least 3 characters'
    } else {
        errors.value.username = null
    }
}

// 验证密码
const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
        if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
        if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
        if (blur) errors.value.password = 'Password must contain at least one number.'
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = 'Password must contain at least one special character.'
    } else {
        errors.value.password = null
    }
}

// 验证确认密码
const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = 'Passwords do not match.'
    } else {
        errors.value.confirmPassword = null
    }
}

// 验证加入理由
const validateReason = (blur) => {
    if (blur && formData.value.reason.toLowerCase().includes('friend')) {
        errors.value.reason = 'Great to have a friend'
    } else {
        errors.value.reason = null
    }
}

// 提交表单
const submitForm = () => {
    validateName(true)
    validatePassword(true)
    validateConfirmPassword(true)
    validateReason(true)

    if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
        // 保存用户账号信息到 localStorage
        const userAccount = {
            username: formData.value.username,
            password: formData.value.password
        }

        // 将账户信息添加到 localStorage 的数组中
        const accounts = JSON.parse(localStorage.getItem('accounts')) || []
        accounts.push(userAccount)
        localStorage.setItem('accounts', JSON.stringify(accounts))

        // 将用户填写的信息（不包含密码）显示在卡片中
        submittedCards.value.push({
            username: formData.value.username,
            isAustralian: formData.value.isAustralian,
            gender: formData.value.gender,
            reason: formData.value.reason,
            suburb: formData.value.suburb
        })

        clearForm()
    }
}

// 清除表单数据
const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: false,
        reason: '',
        gender: '',
        suburb: ''
    }
}
</script>

<template>
    <!-- 注册表单 -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Library Registration Form</h1>
                <p class="text-center">Please fill in the following details to register.</p>
                <form @submit.prevent="submitForm">
                    <!-- 用户名 -->
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="formData.username"
                            @blur="() => validateName(true)"
                            @input="() => validateName(false)"
                        />
                        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                    </div>

                    <!-- 密码 -->
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="formData.password"
                            @blur="() => validatePassword(true)"
                            @input="() => validatePassword(false)"
                        />
                        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                    </div>

                    <!-- 确认密码 -->
                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirm Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="confirm-password"
                            v-model="formData.confirmPassword"
                            @blur="() => validateConfirmPassword(true)"
                        />
                        <div v-if="errors.confirmPassword" class="text-danger">
                            {{ errors.confirmPassword }}
                        </div>
                    </div>

                    <!-- 性别 -->
                    <div class="mb-3">
                        <label for="gender" class="form-label">Gender</label>
                        <select class="form-select" id="gender" v-model="formData.gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <!-- 是否为澳大利亚居民 -->
                    <div class="mb-3 form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="isAustralian"
                            v-model="formData.isAustralian"
                        />
                        <label class="form-check-label" for="isAustralian"
                            >Australian Resident?</label
                        >
                    </div>

                    <!-- 加入理由 -->
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for Joining</label>
                        <textarea
                            class="form-control"
                            id="reason"
                            rows="3"
                            v-model="formData.reason"
                            @blur="() => validateReason(true)"
                        ></textarea>
                        <div v-if="errors.reason" class="text-success">{{ errors.reason }}</div>
                    </div>

                    <!-- 区域 -->
                    <div class="mb-3">
                        <label for="suburb" class="form-label">Suburb</label>
                        <input
                            type="text"
                            class="form-control"
                            id="suburb"
                            v-model="formData.suburb"
                        />
                    </div>

                    <!-- 提交和清除按钮 -->
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- 显示提交的卡片 -->
    <div class="row mt-5">
        <h4>Registered Users</h4>
        <div class="d-flex flex-wrap justify-content-start">
            <div
                v-for="(card, index) in submittedCards"
                :key="index"
                class="card m-2"
                style="width: 18rem"
            >
                <div class="card-header">User Information</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Username: {{ card.username }}</li>
                    <li class="list-group-item">
                        Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                    </li>
                    <li class="list-group-item">Gender: {{ card.gender }}</li>
                    <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}

.card-header {
    background-color: #275fda;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}
.list-group-item {
    padding: 10px;
}
</style>
