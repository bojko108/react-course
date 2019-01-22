import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux';

const Header = ({ loading, count }) => {
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
        {formatHeader('Courses', count)}
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
    count: state.courses.length
  };
};

export default connect(mapStateToProps)(Header);

// import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';
// import LoadingDots from './LoadingDots';
// import { connect } from 'react-redux';

// export class Header extends React.Component {
//   constructor(props, context) {
//     super(props, context);

//     this.formatHeader = this.formatHeader.bind(this);
//   }

//   formatHeader(text) {
//     if (this.props.count > 0) {
//       return `${text} (${this.props.count})`;
//     } else {
//       return text;
//     }
//   }

//   render() {
//     return (
//       <nav>
//         <IndexLink to="/" activeClassName="active">
//           Home
//         </IndexLink>
//         {' | '}
//         <Link to="courses" activeClassName="active">
//           {this.formatHeader('Courses')}
//         </Link>
//         {' | '}
//         <Link to="about" activeClassName="active">
//           About
//         </Link>
//         {this.props.loading && <LoadingDots interval={100} dots={20} />}
//       </nav>
//     );
//   }
// }

// Header.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   count: PropTypes.number
// };

// const mapStateToProps = (state, ownProps) => {
//   return {
//     count: state.courses.length
//   };
// };

// export default connect(mapStateToProps)(Header);
