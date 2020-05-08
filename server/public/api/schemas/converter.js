fs   = require('fs');
const SwaggerParser = require("@apidevtools/swagger-parser");

async function getSchema() {
    return await SwaggerParser.dereference('public/api/schemas/schema.yaml');
}

module.exports = function () {
    return getSchema();
};





