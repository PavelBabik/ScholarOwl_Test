import type {ChecklistItem, Program, StudentProfile} from '../types/index.js'

export const programs: Program[] = [
    {
        id: 'cs-ms',
        name: 'MS Computer Science',
        degreeType: 'Master',
        applicationDeadline: '2026-03-15',
        requirements: [
            {
                id: 'transcripts',
                type: 'documents',
                title: 'Official transcripts',
                description: 'Upload official academic transcripts.',
                dueOffsetDays: 30,
                required: true,
                evidenceType: 'file'
            },
            {
                id: 'essay',
                type: 'writing',
                title: 'Statement of purpose',
                description: 'Write a 700–1000 word statement of purpose.',
                dueOffsetDays: 21,
                required: true,
                evidenceType: 'text'
            },
            {
                id: 'recommendations',
                type: 'letters',
                title: 'Recommendation letters',
                description: 'Submit two academic or professional recommendation letters.',
                dueOffsetDays: 14,
                required: true,
                evidenceType: 'file'
            },
            {
                id: 'gre',
                type: 'test_scores',
                title: 'GRE score',
                description: 'GRE score is optional but recommended.',
                dueOffsetDays: 10,
                required: false,
                evidenceType: 'score'
            }
        ]
    },
    {
        id: 'mba',
        name: 'MBA Program',
        degreeType: 'MBA',
        applicationDeadline: '2026-04-01',
        requirements: [
            {
                id: 'resume',
                type: 'documents',
                title: 'Resume',
                description: 'Upload a current professional resume.',
                dueOffsetDays: 20,
                required: true,
                evidenceType: 'file'
            },
            {
                id: 'essay',
                type: 'writing',
                title: 'Application essay',
                description: 'Explain your leadership experience and career goals.',
                dueOffsetDays: 15,
                required: true,
                evidenceType: 'text'
            },
            {
                id: 'interview',
                type: 'interview',
                title: 'Admissions interview',
                description: 'Schedule and complete an admissions interview.',
                dueOffsetDays: 7,
                required: true,
                evidenceType: 'meeting'
            }
        ]
    }
]

export const profiles: StudentProfile[] = []

export const checklistItems: ChecklistItem[] = []