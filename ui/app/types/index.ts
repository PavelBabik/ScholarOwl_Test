export interface Program {
    id: string
    name: string
    degreeType: string
    applicationDeadline: string
    requirements: Requirement[]
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

export interface StudentProfile {
    id: string
    name: string
    email: string
    educationLevel: string
    gpa: number
    testScores?: string
    targetTerm: string
}

export interface ChecklistItem {
    id: string
    profileId: string
    programId: string
    title: string
    requirementId: string
    status: 'missing' | 'in_progress' | 'complete'
    dueDate: string
    notes: string
}

export interface ReadinessResponse {
    profileId: string
    programId: string
    readinessScore: number
    title: string
    missingRequirements: Requirement[]
    nextMilestones: TimelineEvent[]
    checklist: ChecklistItem[]
}

export interface TimelineEvent {
    id: string
    title: string
    date: string
    status: 'missing' | 'in_progress' | 'complete'
    relatedRequirementId: string
}