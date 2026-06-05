import request from 'supertest'
import { describe, expect, it } from 'vitest'

import app from '../app.js'

describe('Readiness flow', () => {
    it('creates profile, checklist, updates item and recalculates readiness score', async () => {
        const profileResponse = await request(app)
            .post('/profiles')
            .send({
                name: 'Jane Student',
                email: 'jane@example.com',
                educationLevel: 'Bachelor',
                gpa: 3.7,
                testScores: 'GRE 320',
                targetTerm: 'Fall 2026'
            })

        expect(profileResponse.status).toBe(201)

        const profileId = profileResponse.body.id
        const programId = 'cs-ms'

        const checklistResponse = await request(app)
            .post('/checklists')
            .send({
                profileId,
                programId
            })

        expect(checklistResponse.status).toBe(201)
        expect(checklistResponse.body.length).toBeGreaterThan(0)

        const readinessBefore = await request(app).get(
            `/readiness/${profileId}/${programId}`
        )

        expect(readinessBefore.status).toBe(200)
        expect(readinessBefore.body.readinessScore).toBe(0)

        const updateResponse = await request(app)
            .patch(`/checklists/${profileId}/${programId}/transcripts`)
            .send({
                status: 'complete',
                notes: 'Uploaded official transcript'
            })

        expect(updateResponse.status).toBe(200)
        expect(updateResponse.body.status).toBe('complete')

        const readinessAfter = await request(app).get(
            `/readiness/${profileId}/${programId}`
        )

        expect(readinessAfter.status).toBe(200)
        expect(readinessAfter.body.readinessScore).toBe(33)

        const missingIds = readinessAfter.body.missingRequirements.map(
            (item: { id: string }) => item.id
        )

        expect(missingIds).not.toContain('transcripts')
        expect(missingIds).toContain('essay')
        expect(missingIds).toContain('recommendations')

        const timelineResponse = await request(app).get(
            `/readiness/${profileId}/${programId}/timeline`
        )

        expect(timelineResponse.status).toBe(200)

        const dates = timelineResponse.body.map((item: { date: string }) => item.date)
        const sortedDates = [...dates].sort()

        expect(dates).toEqual(sortedDates)
    })
})