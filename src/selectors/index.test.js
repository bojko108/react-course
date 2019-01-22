import expect from 'expect';
import { formatAuthors, getCourseById, sortArrayOfObjects } from './';

describe('Selectors tests', () => {
  describe('formatAuthors', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const authors = [
        {
          id: 'cory-house',
          firstName: 'Cory',
          lastName: 'House'
        },
        {
          id: 'scott-allen',
          firstName: 'Scott',
          lastName: 'Allen'
        }
      ];

      const expected = [
        {
          value: 'cory-house',
          text: 'Cory House'
        },
        {
          value: 'scott-allen',
          text: 'Scott Allen'
        }
      ];

      expect(formatAuthors(authors)).toEqual(expected);
    });
  });
  describe('getCourseById', () => {
    const courses = [
      {
        id: 'react-flux-building-applications',
        title: 'Building Applications in React and Flux',
        watchHref: 'http://www.pluralsight.com/courses/react-flux-building-applications',
        authorId: 'cory-house',
        length: '5:08',
        category: 'JavaScript'
      },
      {
        id: 'clean-code',
        title: 'Clean Code: Writing Code for Humans',
        watchHref: 'http://www.pluralsight.com/courses/writing-clean-code-humans',
        authorId: 'cory-house',
        length: '3:10',
        category: 'Software Practices'
      },
      {
        id: 'architecture',
        title: 'Architecting Applications for the Real World',
        watchHref: 'http://www.pluralsight.com/courses/architecting-applications-dotnet',
        authorId: 'cory-house',
        length: '2:52',
        category: 'Software Architecture'
      },
      {
        id: 'career-reboot-for-developer-mind',
        title: 'Becoming an Outlier: Reprogramming the Developer Mind',
        watchHref: 'http://www.pluralsight.com/courses/career-reboot-for-developer-mind',
        authorId: 'cory-house',
        length: '2:30',
        category: 'Career'
      },
      {
        id: 'web-components-shadow-dom',
        title: 'Web Component Fundamentals',
        watchHref: 'http://www.pluralsight.com/courses/web-components-shadow-dom',
        authorId: 'cory-house',
        length: '5:10',
        category: 'HTML5'
      }
    ];

    it('should return course with specific id', () => {
      const expected = getCourseById(courses, 'web-components-shadow-dom');
      expect(expected.id).toEqual('web-components-shadow-dom');
    });

    it('should return empty course when id is not present', () => {
      const expected = getCourseById(courses, 'not existing course id');
      expect(expected.id).toEqual('');
    });
  });
});
