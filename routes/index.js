const router = require('express').Router(),
  userRoutes = require('./userRoutes'),
  subscriberRoutes = require('./subscriberRoutes'),
  courseRoutes = require('./courseRoutes'),
  errorRoutes = require('./errorRoutes');

router.use('/users', userRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/courses', courseRoutes);
router.use('/', errorRoutes);

module.exports = router;
  