export const academicSemesterSearchableFields = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

type IAcademicSemesterTitleMapper = {
  [key: string]: string;
};

export const academicSemesterTitleCodeMapper: IAcademicSemesterTitleMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const EVENT_ACADEMICSEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMICSEMESTER_UPDATED = 'academic-semester.updated';
export const EVENT_ACADEMICSEMESTER_DELETED = 'academic-semester.deleted';
