import { expect, test } from '@playwright/test'

test('student can open programs catalog and dashboard after profile creation', async ({ page, request }) => {
    const profileResponse = await request.post('http://localhost:3001/profiles', {
        data: {
            name: 'Jane Student',
            email: `jane-${Date.now()}@example.com`,
            educationLevel: 'Bachelor',
            gpa: 3.7,
            testScores: 'GRE 320',
            targetTerm: 'Fall 2026'
        }
    })

    expect(profileResponse.status()).toBe(201)

    const profile = await profileResponse.json()
    const programId = 'cs-ms'

    await request.post('http://localhost:3001/checklists', {
        data: {
            profileId: profile.id,
            programId
        }
    })

    await page.goto('/programs')

    await page.evaluate(
        ({ profileId, programId }) => {
            localStorage.setItem('profileId', profileId)
            localStorage.setItem('programId', programId)
        },
        {
            profileId: profile.id,
            programId
        }
    )

    await page.reload()

    await expect(page.getByText('Programs Catalog')).toBeVisible()

    await page.goto('/dashboard')

    await expect(page.getByText('Readiness Dashboard')).toBeVisible()
    await expect(page.locator('.score')).toContainText('0')

    await page.locator('input[type="checkbox"]').first().check()

    await expect(page.locator('.score')).toContainText('33')
})