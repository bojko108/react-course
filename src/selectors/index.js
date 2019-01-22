export function formatAuthors(authors) {
  return authors.map(author => {
    return { value: author.id, text: author.firstName + ' ' + author.lastName };
  });
}

export function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course && course.length > 0) return course[0];
  return { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
}

export function sortArrayOfObjects(array, field, alphabetically = true) {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return alphabetically ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return alphabetically ? 1 : -1;
    }
    return 0;
  });
}
