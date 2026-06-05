import express from 'express'
import cors from 'cors'

import programsRoutes from './routes/programs.routes.js'
import profilesRoutes from './routes/profiles.routes.js'
import checklistsRoutes from './routes/checklists.routes.js'
import readinessRoutes from './routes/readiness.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
})

app.use('/programs', programsRoutes)
app.use('/profiles', profilesRoutes)
app.use('/checklists', checklistsRoutes)
app.use('/readiness', readinessRoutes)

export default app