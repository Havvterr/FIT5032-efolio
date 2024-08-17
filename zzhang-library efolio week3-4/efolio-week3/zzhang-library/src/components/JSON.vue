<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 6: Render a list containing author names and their birth years. Hint: Make use of the v-for directive to iterate through the array of authors. -->
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{ highlight: author.name === 'George Orwell' }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <!-- Activity 7: Render a list containing authors born after 1850. Hint: Make use of the v-for directive to iterate through the array of authors that you have filtered out. -->
      <p>Authors born after 1850:</p>
      <ul>
        <li
          v-for="author in modernAuthors"
          :key="author.id"
          :class="{ highlight: author.name === 'George Orwell' }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 8: Render a list of all famous works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9: Render a list of Austen's works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
      <ul>
        <li v-for="work in austen?.famousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        <!-- Activity 9a: Get the company name from the bookstores object. -->
        Company: {{ bookstores.name }}
      </p>

      <p>
        <!-- Activity 9b: Get the total number of stores from the bookstores object. -->
        Total Stores: {{ bookstores.totalStores }}
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <ul>
        <li v-for="(count, type) in bookstores.storeTypes" :key="type">{{ type }}: {{ count }}</li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <ul>
        <li>
          Weekdays: {{ bookstores.openingHours.weekdays.open }} -
          {{ bookstores.openingHours.weekdays.close }}
        </li>
        <li>
          Weekends: {{ bookstores.openingHours.weekends.open }} -
          {{ bookstores.openingHours.weekends.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <p>Top Sellers:</p>
      <ul>
        <li v-for="seller in bookstores.topSellers" :key="seller">
          {{ seller }}
        </li>
      </ul>
      <p>We operate in:</p>
      <ul>
        <li v-for="country in bookstores.countries" :key="country">
          {{ country }}
        </li>
      </ul>
      <p>Our #1 seller: {{ bookstores.topSellers[0] }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
import authors from '../assets/authors.json'
import bookstores from '../assets/bookstores.json'

const showMessage = ref(false)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => authors.filter((author) => author.birthYear > 1850))

// Activity 3: Get all famous works
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title))
)

// Activity 4: Find author by name
const orwell = computed(() => authors.find((author) => author.name === 'George Orwell'))

// Activity 5: Find author by ID
const austen = computed(() => authors.find((author) => author.id === 1)) // Jane Austen
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #a7cdb5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(12, 13, 15, 0.1);
}

h1,
h2 {
  color: #190e0e;
  margin: 0.5em 0;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: rgb(122, 200, 109);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #b1d5c5;
  color: #916fa4;
  border: 1px solid #1d915d;
}

.highlight {
  background-color: #d5d81f;
  color: #110b0b;
  font-weight: bold;
}

code {
  background-color: #bfd59c;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #000000;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #b08fcc;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>
