'use strict'
exports.config = {
  app_name: ['war'],
  distributed_tracing: {
    enabled: false
  },
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  attributes: {
    exclude: []
  }
}
