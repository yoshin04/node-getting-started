const Course = require('../models/course'),
  getCoursesParams = body => {
    return {
      title: body.title,
      description: body.description,
      cost: body.cost,
    };
  };

module.exports = {
  index: (req, res, next) => {
    Course.find()
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render('courses/index');
  },
  new: (req, res) => {
    res.render('courses/new');
  },

  create: (req, res, next) => {
    let courseParams = getCoursesParams(req.body);
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = '/courses';
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },

  show: (req, res, next) => {
    var courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render('courses/show');
  },

  edit: (req, res, next) => {
    var courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render('courses/edit', {
          course: course,
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = getCoursesParams(req.body);

    Course.findByIdAndUpdate(CourseId, {
      $set: courseParams,
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.course.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = '/course';
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },
};
