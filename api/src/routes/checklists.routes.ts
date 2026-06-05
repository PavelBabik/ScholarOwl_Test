import { Router } from 'express'
import { z } from 'zod'
import { createChecklist, updateChecklistItem } from '../services/readiness.service.js'

const router = Router()

router.post('/', (req, res) => {
    const schema = z.object({
        profileId: z.string().min(1),
        programId: z.string().min(1)
    })

    const result = schema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: result.error.flatten()
        })
    }

    try {
        const checklist = createChecklist(result.data.profileId, result.data.programId)
        res.status(201).json(checklist)
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
    }
})

router.patch('/:profileId/:programId/:requirementId', (req, res) => {
    const schema = z.object({
        status: z.enum(['missing', 'in_progress', 'complete']),
        notes: z.string().optional().default('')
    })

    const result = schema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: result.error.flatten()
        })
    }

    try {
        const item = updateChecklistItem(
            req.params.profileId,
            req.params.programId,
            req.params.requirementId,
            result.data.status,
            result.data.notes
        )

        res.json(item)
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
    }
})

export default router