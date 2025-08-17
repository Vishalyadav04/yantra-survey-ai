export type QuestionTemplate = {
  type: 'multiple-choice' | 'text-input' | 'rating-scale' | 'checkbox' | 'dropdown';
  title: string;
  description?: string;
  required?: boolean;
  options?: string[];
  maxRating?: number;
  placeholder?: string;
  category?: string;
  tags?: string[];
  source?: 'NSS' | 'AI' | 'Custom';
};

export const NSSLIBRARY: QuestionTemplate[] = [
  {
    category: 'Health',
    tags: ['health', 'wellbeing', 'access'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'In the last 30 days, have you or any household member consulted a healthcare provider?',
    options: ['Yes', 'No'],
  },
  {
    category: 'Health',
    tags: ['health', 'facility', 'distance'],
    source: 'NSS',
    type: 'dropdown',
    title: 'What is the nearest type of healthcare facility available to your household?',
    options: ['Sub-centre', 'PHC', 'CHC', 'District Hospital', 'Private Clinic', 'Other'],
  },
  {
    category: 'Education',
    tags: ['education', 'schooling', 'attendance'],
    source: 'NSS',
    type: 'checkbox',
    title: 'Which of the following learning resources are available to the student at home?',
    options: ['Smartphone', 'Computer/Laptop', 'Internet', 'TV/Radio', 'Books'],
  },
  {
    category: 'Employment',
    tags: ['labour', 'work', 'status'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'What was your principal activity status during the last 7 days?',
    options: ['Employed', 'Unemployed', 'Student', 'Homemaker', 'Retired', 'Other'],
  },
  {
    category: 'Sanitation',
    tags: ['sanitation', 'toilet', 'water'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'What is the main source of drinking water for your household?',
    options: ['Piped into dwelling', 'Public tap', 'Tube well/Borehole', 'Protected well', 'Unprotected source', 'Other'],
  },
  {
    category: 'Assets',
    tags: ['assets', 'ownership', 'household'],
    source: 'NSS',
    type: 'checkbox',
    title: 'Which of the following assets are owned by your household?',
    options: ['Bicycle', 'Motorcycle', 'Car', 'Refrigerator', 'Washing Machine', 'Computer'],
  },
  {
    category: 'Health',
    tags: ['health', 'insurance'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'Are you covered under any health insurance scheme?',
    options: ['Yes', 'No', 'Don’t know'],
  },
  {
    category: 'Education',
    tags: ['education', 'digital'],
    source: 'NSS',
    type: 'rating-scale',
    title: 'Rate the availability of digital learning resources in your school/college',
    maxRating: 5,
  },
  {
    category: 'Employment',
    tags: ['work', 'hours'],
    source: 'NSS',
    type: 'text-input',
    title: 'Please specify the usual number of hours you work per week',
    placeholder: 'e.g., 40',
  },
  {
    category: 'Sanitation',
    tags: ['sanitation', 'toilet'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'What type of toilet facility is used by your household?',
    options: ['Own flush toilet', 'Shared flush toilet', 'Pit latrine', 'No facility', 'Other'],
  },
  {
    category: 'Finance',
    tags: ['banking', 'financial inclusion'],
    source: 'NSS',
    type: 'multiple-choice',
    title: 'Do you have access to a bank account?',
    options: ['Yes', 'No'],
  },
];
