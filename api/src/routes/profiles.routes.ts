import {Router} from 'express'
import {z} from 'zod'
import {profiles} from '../data/mockData.js'

const router = Router()

const profileSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    educationLevel: z.string().min(2),
    gpa: z.number().min(0).max(4),
    testScores: z.string().optional(),
    targetTerm: z.string().min(2)
})

router.post('/', (req, res) => {
    const result = profileSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: result.error.flatten()
        })
    }

    const profile = {
        id: crypto.randomUUID(),
        ...result.data
    }

    profiles.push(profile)

    res.status(201).json(profile)
})

router.patch('/:id', (req, res) => {
    const profile = profiles.find((item) => item.id === req.params.id)

    if (!profile) {
        return res.status(404).json({message: 'Profile not found'})
    }

    const result = profileSchema.partial().safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: result.error.flatten()
        })
    }

    Object.assign(profile, result.data)

    res.json(profile)
})

export default router