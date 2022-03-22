const router = require('express').Router();

router.get('/users', function(req, res) {

      const users = [
        'Belcalis',
        'Hennessy'
      ];
    return res.json({users});

});


module.exports = router;
