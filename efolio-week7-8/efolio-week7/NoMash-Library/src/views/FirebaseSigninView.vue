<template>
    <div>
      <h1>Sign In</h1>
      <p>
        <input type="email" placeholder="Email" v-model="email" required />
      </p>
      <p>
        <input type="password" placeholder="Password" v-model="password" required />
      </p>
      <p>
        <button @click="signin">Sign in via Firebase</button>
      </p>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const message = ref('');
  const router = useRouter();
  const auth = getAuth();
  
  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
  
      console.log('Firebase sign-in successful!');
  
      if (user.uid === 'e757Gk3U5VM2sjdwQ8f65f0Xdag1') {
        router.push('/admin-dashboard');
      } else {
        router.push('/home');
      }
    } catch (error) {
      message.value = `Error signing in: ${error.message}`;
      console.error(error);
    }
  };
  </script>