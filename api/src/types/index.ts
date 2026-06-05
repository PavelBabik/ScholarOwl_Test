export type RequirementStatus = 'missing' | 'in_progress' | 'complete'

export interface StudentProfile {
    id: string
    name: string
    email: string
    educationLevel: string
    gpa: number
    testScores?: string
    targetTerm: string
}

export interface Requirement {
    id: string
    type: string
    title: string
    description: string
    dueOffsetDays: number
    required: boolean
    evidenceType: string
}

export interface Program {
    id: string
    name: string
    degreeType: string
    applicationDeadline: string
    requirements: Requirement[]
}

export interface ChecklistItem {
    id: string
    profileId: string
    programId: string
    requirementId: string
    status: RequirementStatus
    dueDate: string
    notes: string
}

export interface TimelineEvent {
    id: string
    title: string
    date: string
    status: RequirementStatus
    relatedRequirementId: string
}