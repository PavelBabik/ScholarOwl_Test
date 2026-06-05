import {checklistItems, programs} from '../data/mockData.js'
import type {ChecklistItem, Program, Requirement, TimelineEvent} from '../types/index.js'

export function findProgramOrThrow(programId: string): Program {
    const program = programs.find((item) => item.id === programId)

    if (!program) {
        throw new Error('Program not found')
    }

    return program
}

export function computeDueDate(applicationDeadline: string, dueOffsetDays: number): string {
    const date = new Date(applicationDeadline)
    date.setDate(date.getDate() - dueOffsetDays)

    return date.toISOString().slice(0, 10)
}

export function createChecklist(profileId: string, programId: string): ChecklistItem[] {
    const program = findProgramOrThrow(programId)

    const existingItems = checklistItems.filter(
        (item) => item.profileId === profileId && item.programId === programId
    )

    if (existingItems.length > 0) {
        return existingItems
    }

    const newItems = program.requirements.map((requirement) => ({
        id: `${profileId}-${programId}-${requirement.id}`,
        profileId,
        programId,
        title: requirement.title,
        requirementId: requirement.id,
        status: 'missing' as const,
        dueDate: computeDueDate(program.applicationDeadline, requirement.dueOffsetDays),
        notes: ''
    }))

    checklistItems.push(...newItems)

    return newItems
}

export function updateChecklistItem(
    profileId: string,
    programId: string,
    requirementId: string,
    status: ChecklistItem['status'],
    notes: string
): ChecklistItem {
    const item = checklistItems.find(
        (checklistItem) =>
            checklistItem.profileId === profileId &&
            checklistItem.programId === programId &&
            checklistItem.requirementId === requirementId
    )

    if (!item) {
        throw new Error('Checklist item not found')
    }

    item.status = status
    item.notes = notes

    return item
}

export function getReadiness(profileId: string, programId: string) {
    const program = findProgramOrThrow(programId)
    const items = createChecklist(profileId, programId)

    const requiredRequirements = program.requirements.filter((requirement) => requirement.required)

    const completedRequired = requiredRequirements.filter((requirement) => {
        const item = items.find((checklistItem) => checklistItem.requirementId === requirement.id)
        return item?.status === 'complete'
    })

    const missingRequirements: Requirement[] = requiredRequirements.filter((requirement) => {
        const item = items.find((checklistItem) => checklistItem.requirementId === requirement.id)
        return !item || item.status !== 'complete'
    })

    const readinessScore =
        requiredRequirements.length === 0
            ? 100
            : Math.round((completedRequired.length / requiredRequirements.length) * 100)

    const nextMilestones = getTimeline(profileId, programId)
        .filter((event) => event.status !== 'complete')
        .slice(0, 5)

    return {
        profileId,
        programId,
        readinessScore,
        missingRequirements,
        nextMilestones,
        checklist: items
    }
}

export function getTimeline(profileId: string, programId: string): TimelineEvent[] {
    const program = findProgramOrThrow(programId)
    const items = createChecklist(profileId, programId)

    return items
        .map((item) => {
            const requirement = program.requirements.find(
                (requirement) => requirement.id === item.requirementId
            )

            return {
                id: `timeline-${item.id}`,
                title: requirement?.title || 'Unknown requirement',
                date: item.dueDate,
                status: item.status,
                relatedRequirementId: item.requirementId
            }
        })
        .sort((a, b) => a.date.localeCompare(b.date))
}