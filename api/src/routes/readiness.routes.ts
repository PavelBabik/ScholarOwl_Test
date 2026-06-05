import { Router } from 'express'
import { getReadiness, getTimeline } from '../services/readiness.service.js'

const router = Router()

router.get('/:profileId/:programId', (req, res) => {
    try {
        const readiness = getReadiness(req.params.profileId, req.params.programId)
        res.json(readiness)
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
    }
})

router.get('/:profileId/:programId/timeline', (req, res) => {
    try {
        const timeline = getTimeline(req.params.profileId, req.params.programId)
        res.json(timeline)
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
    }
})

export default router