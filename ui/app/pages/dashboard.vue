<script setup lang="ts">
import type {ReadinessResponse} from '../types'

const api = useApi()

const readiness = ref<ReadinessResponse | null>(null)
const loading = ref(true)
const error = ref('')

const loadDashboard = async () => {
  const profileId = localStorage.getItem('profileId')
  const programId = localStorage.getItem('programId')

  if (!profileId || !programId) {
    return navigateTo('/')
  }

  try {
    readiness.value = await api<ReadinessResponse>(
        `/readiness/${profileId}/${programId}`
    )
  } catch {
    error.value = 'Could not load readiness dashboard.'
  } finally {
    loading.value = false
  }
}

const updateItemStatus = async (
    requirementId: string,
    checked: boolean
) => {
  const profileId = localStorage.getItem('profileId')
  const programId = localStorage.getItem('programId')

  if (!profileId || !programId) {
    return navigateTo('/')
  }

  await api(`/checklists/${profileId}/${programId}/${requirementId}`, {
    method: 'PATCH',
    body: {
      status: checked ? 'complete' : 'missing',
      notes: ''
    }
  })

  await loadDashboard()
}

onMounted(loadDashboard)
</script>

<template>
  <main class="page">
    <div v-if="loading">Loading dashboard...</div>

    <p v-else-if="error" class="error">
      {{ error }}
    </p>

    <section v-else-if="readiness" class="layout">
      <header class="header">
        <div>
          <h1>Readiness Dashboard</h1>
          <p>Track your application progress and upcoming milestones.</p>
        </div>

        <div class="score">
          <span>{{ readiness.readinessScore }}%</span>
          <small>ready</small>
        </div>
      </header>

      <section class="card">
        <h2>Missing Requirements</h2>

        <p v-if="readiness.missingRequirements.length === 0">
          All required items are complete.
        </p>

        <ul v-else>
          <li
              v-for="requirement in readiness.missingRequirements"
              :key="requirement.id"
          >
            {{ requirement.title }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h2>Checklist</h2>

        <div
            v-for="item in readiness.checklist"
            :key="item.id"
            class="checklist-item"
        >
          <label>
            <input
                type="checkbox"
                :checked="item.status === 'complete'"
                @change="updateItemStatus(
                item.requirementId,
                ($event.target as HTMLInputElement).checked
              )"
            />
            <span>{{ item.title }}</span>
          </label>

          <small>Due: {{ item.dueDate }}</small>
        </div>
      </section>

      <section class="card">
        <h2>Timeline</h2>

        <ol class="timeline">
          <li
              v-for="event in readiness.nextMilestones"
              :key="event.id"
          >
            <strong>{{ event.date }}</strong>
            <span>{{ event.title }}</span>
            <em>{{ event.status }}</em>
          </li>
        </ol>
      </section>

      <button class="secondary" @click="navigateTo('/programs')">
        Back to programs
      </button>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  background: #f5f7fb;
}

.layout {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
}

.score {
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  background: #111827;
  color: white;
  border-radius: 999px;
}

.score span {
  font-size: 32px;
  font-weight: 800;
}

.score small {
  margin-top: -32px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.checklist-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.checklist-item label {
  display: flex;
  gap: 10px;
  align-items: center;
}

.timeline {
  display: grid;
  gap: 12px;
}

.timeline li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.error {
  color: #b91c1c;
}

.secondary {
  width: fit-content;
  padding: 10px 16px;
}
</style>