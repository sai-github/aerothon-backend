const APImap = {};

class CategoryServicesValidator {
  validate(api, payload) {
    return this[APImap[api]].validateAsync(payload);
  }
}

module.exports = CategoryServicesValidator;
