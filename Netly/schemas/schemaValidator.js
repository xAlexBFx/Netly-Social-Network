
export const validateSchema = (schema, data) => {
    try {
        schema.parse(data);
    } catch (err) {
        if(err.errors[0].message) throw err.errors[0].message;
    };
};