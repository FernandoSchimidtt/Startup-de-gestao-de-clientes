var Database = require('../models/index');

class PlansService {
    constructor() {
        this.Plan = Database['Plan'];
    }

    //Metodo que salva na base
    async store(plans) {

        var errors = {};

        if (plans.import != undefined) {
            plans.import = true;
        } else {
            plans.import = false;
        }
        var isValid = this.validate(plans, errors);

        if (isValid) {
            try {
                await this.Plan.create(plans);
                return true;

            } catch (err) {
                errors.system_msg('Não foi possivel salvar o plano');
                return errors;
            }
        } else {
            return errors;
        }
    }

    validate(plan, errors) {

        var erroCount = 0;

        if (plan.title == undefined || plan.title.length < 3) {
            errors.title_msg = 'O titulo é invalido';
            erroCount++;
        }
        if (plan.list == undefined || plan.list < 1) {
            errors.list_msg = 'A quantidade de listas é invalida';
            erroCount++;
        }
        if (plan.client == undefined || plan.client < 1) {
            errors.client_msg = 'A quantidade de clientes é invalida';
            erroCount++;
        }
        if (plan.value == undefined || plan.value < 1) {
            errors.value_msg = 'O valor é invalido';
            erroCount++;
        }

        if (erroCount == 0) {
            return true;
        } else {
            return false;
        }

    }
}

module.exports = new PlansService();