import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux';

const Header = ({ loading, authorsCount, coursesCount }) => {
  const formatHeader = (text, count) => {
    if (count > 0) {
      return `${text} (${count})`;
    } else {
      return text;
    }
  };

  return (
    <nav>
      <IndexLink to="/" activeClassName="active">
        Home
      </IndexLink>
      {' | '}
      <Link to="courses" activeClassName="active">
        {formatHeader('Courses', coursesCount)}
      </Link>
      {' | '}
      <Link to="authors" activeClassName="active">
        {formatHeader('Authors', authorsCount)}
      </Link>
      {' | '}
      <Link to="about" activeClassName="active">
        About
      </Link>
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  return {
    authorsCount: state.authors.length,
    coursesCount: state.courses.length
  };
};

export default connect(mapStateToProps)(Header);
