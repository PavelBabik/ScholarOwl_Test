<script setup lang="ts">
import type {StudentProfile} from '~/types'

const api = useApi()

const form = reactive({
  name: '',
  email: '',
  educationLevel: '',
  gpa: 3,
  testScores: '',
  targetTerm: 'Fall 2026'
})

const error = ref('')
const loading = ref(false)

const submitProfile = async () => {
  error.value = ''
  loading.value = true

  try {
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      educationLevel: form.educationLevel.trim(),
      gpa: Number(form.gpa),
      testScores: form.testScores.trim(),
      targetTerm: form.targetTerm.trim()
    }

    const profile = await api<StudentProfile>('/profiles', {
      method: 'POST',
      body: payload
    })

    localStorage.setItem('profileId', profile.id)

    await navigateTo('/programs', { replace: true })
  } catch(e) {
    console.error('PROFILE ERROR', e)
    error.value = 'Please check the form fields and try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>Admissions Readiness Dashboard</h1>
      <p>Create your student profile to get a personalized application checklist.</p>

      <div class="form">
        <label>
          Name
          <input data-testid="name" name="name" v-model="form.name" required minlength="2" />
        </label>

        <label>
          Email
          <input data-testid="email" name="email" v-model="form.email" required />
        </label>

        <label>
          Education Level
          <input data-testid="educationLevel" name="educationLevel" v-model="form.educationLevel" required placeholder="Bachelor" />
        </label>

        <label>
          GPA
          <input data-testid="gpa" name="gpa" v-model.number="form.gpa" required type="number" min="0" max="4" step="0.1" />
        </label>

        <label>
          Test Scores
          <input data-testid="testScores" name="testScores" v-model="form.testScores" placeholder="GRE 320" />
        </label>

        <label>
          Target Term
          <input data-testid="targetTerm" name="targetTerm" v-model="form.targetTerm" required />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="button" :disabled="loading" @click="submitProfile">
          {{ loading ? 'Saving...' : 'Create profile' }}
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: #f5f7fb;
}

.card {
  width: 100%;
  max-width: 560px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

input {
  padding: 10px 12px;
  border: 1px solid #d7dce5;
  border-radius: 8px;
}

button {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: #111827;
  color: white;
  cursor: pointer;
}

.error {
  color: #b91c1c;
}
</style>