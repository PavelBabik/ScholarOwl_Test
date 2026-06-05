<script setup lang="ts">
import type { Program } from '~/types'

const api = useApi()

const programs = ref<Program[]>([])
const loading = ref(true)

const loadPrograms = async () => {
  try {
    programs.value = await api<Program[]>('/programs')
  } finally {
    loading.value = false
  }
}

const selectProgram = async (programId: string) => {
  const profileId = localStorage.getItem('profileId')

  if (!profileId) {
    return navigateTo('/')
  }

  await api('/checklists', {
    method: 'POST',
    body: {
      profileId,
      programId
    }
  })

  localStorage.setItem('programId', programId)

  navigateTo('/dashboard')
}

onMounted(loadPrograms)
</script>

<template>
  <main class="page">
    <h1>Programs Catalog</h1>

    <div v-if="loading">
      Loading...
    </div>

    <div v-else class="grid">
      <article
          v-for="program in programs"
          :key="program.id"
          class="card"
      >
        <h2>{{ program.name }}</h2>

        <p>
          Degree: {{ program.degreeType }}
        </p>

        <p>
          Deadline: {{ program.applicationDeadline }}
        </p>

        <p>
          Requirements: {{ program.requirements.length }}
        </p>

        <button @click="selectProgram(program.id)">
          Select Program
        </button>
      </article>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 40px;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

button {
  margin-top: 16px;
  padding: 10px 16px;
}
</style>