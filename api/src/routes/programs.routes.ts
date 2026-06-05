import {Router} from 'express'
import {programs} from '../data/mockData.js'

const router = Router()

router.get('/', (req, res) => {
    const degreeType = req.query.degreeType?.toString()

    const result = degreeType
        ? programs.filter((program) => program.degreeType === degreeType)
        : programs

    res.json(result)
})

router.get('/:id', (req, res) => {
    const program = programs.find((item) => item.id === req.params.id)

    if (!program) {
        return res.status(404).json({message: 'Program not found'})
    }

    res.json(program)
})

export default router