<template>
    <div>
      <h1>Create an Account</h1>
      <p>
        <input type="email" placeholder="Email" v-model="email" required />
      </p>
      <p>
        <input type="password" placeholder="Password" v-model="password" required />
      </p>
      <p>
        <button @click="register">Register</button>
      </p>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { getFirestore, setDoc, doc } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const message = ref('');
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
  
      console.log('Firebase registration successful!');
  
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user'
      });
  
      message.value = 'Registration successful! Redirecting to login...';
      setTimeout(() => router.push('/FireLogin'), 2000);
    } catch (error) {
      message.value = `Error registering: ${error.message}`;
      console.error(error);
    }
  };
  </script>