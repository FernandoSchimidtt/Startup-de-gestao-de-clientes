const PlansService = require('../services/PlansService');

class PlansController {

    index(req, res) {
        res.render('plans');
    }

    create(req, res) {
        res.render('plans/create');
    }
    async store(req, res) {
        var { title, list, client, value, imports } = req.body;

        var plan = {
            title,
            list,
            client,
            value,
            import: imports
        }

        var result = await PlansService.store(plan);
        if (result == true) {

        } else {
            console.log(result)
        }
    }
}

module.exports = new PlansController();